package com.Happy100BE.Happy100.service;

import com.Happy100BE.Happy100.dto.request.SignUpRequestDto;
import com.Happy100BE.Happy100.dto.response.UserInfoResponse;
import com.Happy100BE.Happy100.dto.response.UserResponseDto;
import com.Happy100BE.Happy100.entity.User;
import com.Happy100BE.Happy100.mapper.UserMapper;
import com.Happy100BE.Happy100.repository.UserRepository;
import com.Happy100BE.Happy100.security.principal.CustomUserPrincipal;

import lombok.RequiredArgsConstructor;
import lombok.Value;

import java.lang.StackWalker.Option;
import java.util.Optional;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserMapper userMapper;


    @Transactional
    public UserResponseDto signUp(SignUpRequestDto req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new IllegalArgumentException("이미 사용 중인 사용자명입니다.");
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        String hashed = passwordEncoder.encode(req.getPassword());

        User user = User.builder()
                .username(req.getUsername())
                .password(hashed)
                .name(req.getName())
                .email(req.getEmail())
                .roleId(1)
                .accountEnabled(0)
                .build();

        try {
            userRepository.save(user);
        } catch (DuplicateKeyException e) {
            throw new IllegalArgumentException("이미 등록된 사용자입니다.");
        }

        return UserResponseDto.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .name(user.getName())
                .email(user.getEmail())
                .accountEnabled(user.getAccountEnabled() == 0)
                .build();
    }



    public boolean isUsernameDuplicate(String username){
        return userRepository.existsByUsername(username);
    }

    public boolean isEmailDuplicate(String email){
        return userRepository.existsByEmail(email);
    }

    public UserInfoResponse getMyInfo(String username) {
        User user = userRepository.findByUsername(username);

        return UserInfoResponse.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRoleName())
                .build();
    }

    @Transactional
    public void putPasswordByUsername(String username, String rawPassword) {
        if (!StringUtils.hasText(username)) {
            throw new IllegalArgumentException("인증 정보가 없습니다.");
        }
        if (!StringUtils.hasText(rawPassword)) {
            throw new IllegalArgumentException("비밀번호가 비어 있습니다.");
        }
        String encoded = passwordEncoder.encode(rawPassword);
        int rows = userRepository.updatePasswordByUsername(username, encoded);
        if (rows == 0) {
            throw new IllegalArgumentException("대상 사용자를 찾을 수 없거나 비활성화된 계정입니다.");
        }
    }

    @Transactional
    public void putEmailByUsername(String username, String email) {
        if (!StringUtils.hasText(username)) {
            throw new IllegalArgumentException("인증 정보가 없습니다.");
        }
        if (!StringUtils.hasText(email)) {
            throw new IllegalArgumentException("이메일이 비어 있습니다.");
        }
        int rows = userRepository.updateEmailByUsername(username, email);
        if (rows == 0) {
            throw new IllegalArgumentException("대상 사용자를 찾을 수 없거나 비활성화된 계정입니다.");
        }
    }

    @Transactional
    public void putNameByUsername(String username, String name) {
        if (!StringUtils.hasText(username)) {
            throw new IllegalArgumentException("인증 정보가 없습니다.");
        }
        if (!StringUtils.hasText(name)) {
            throw new IllegalArgumentException("이름이 비어 있습니다.");
        }
        int rows = userRepository.updateNameByUsername(username, name);
        if (rows == 0) {
            throw new IllegalArgumentException("대상 사용자를 찾을 수 없거나 비활성화된 계정입니다.");
        }
    }

    public void disableMyAccount(String myUsername) {
        if (!StringUtils.hasText(myUsername)) {
            throw new IllegalArgumentException("인증 정보가 없습니다.");
        }
        int rows = userRepository.disableAccountByUsername(myUsername);
        if (rows == 0) {
            throw new IllegalArgumentException("대상 사용자를 찾을 수 없거나 이미 비활성화되었습니다.");
        }
    }

    @Transactional
    public void adminDisableAccount(String targetUsername) {
        if (!StringUtils.hasText(targetUsername)) {
            throw new IllegalArgumentException("대상 사용자 이름이 비어 있습니다.");
        }
        int rows = userRepository.disableAccountByTargetUsername(targetUsername);
        if (rows == 0) {
            throw new IllegalArgumentException("대상 사용자를 찾을 수 없거나 이미 비활성화되었습니다.");
        }
    }

    public Optional<String> findUsername(String email) {
        if (!StringUtils.hasText(email)) {
            throw new IllegalArgumentException("이메일이 비어 있습니다.");
        }
        return userRepository.findUsernameByEmail(email);
    }

    // UserService 내: 역할 조회 메서드 교체용
    @Transactional(readOnly = true)
    public String findRoleByUsername(String username) {
        if (!org.springframework.util.StringUtils.hasText(username)) {
            throw new IllegalArgumentException("사용자명이 비어 있습니다.");
        }
        com.Happy100BE.Happy100.entity.User u = userRepository.findByUsername(username);
        if (u == null) {
            return "ROLE_USER";
        }
        // 우선 role_id 기준으로 결정
        Integer roleId = u.getRoleId();
        if (roleId != null) {
            if (roleId == 2) return "ROLE_ADMIN";
            return "ROLE_USER"; // 기본값(1 포함)
        }
        // role_name 조인 컬럼이 있을 경우 보조적으로 활용
        String roleName = u.getRoleName();
        if (org.springframework.util.StringUtils.hasText(roleName)) {
            return roleName.startsWith("ROLE_") ? roleName : ("ROLE_" + roleName.toUpperCase());
        }
        return "ROLE_USER";
    }

    // UserService 내: 소셜 업서트 신규 생성 부분만 수정(기본 role_id = 1)
    private String createSocialUser(String email, String name) {
        String username = generateUsername("social", String.valueOf(System.nanoTime()), email);
        if (userRepository.existsByUsername(username)) {
            username = username + "_" + (int)(Math.random() * 10000);
        }
        User user = User.builder()
                .username(username)
                .password(null)
                .name(StringUtils.hasText(name) ? name : username)
                .email(email)
                .roleId(1)          // 1 = ROLE_USER
                .accountEnabled(0)  // 0 = 활성
                .build();
        int rows = userRepository.save(user);
        if (rows == 0) throw new IllegalStateException("소셜 사용자 생성에 실패했습니다.");
        return username;
    }

    // 내부 유틸: username 생성 규칙
    private String generateUsername(String provider, String providerUserId, String email) {
        if (StringUtils.hasText(email)) {
            String local = email.split("@")[0].replaceAll("[^a-zA-Z0-9._-]", "");
            if (StringUtils.hasText(local)) return local;
        }
        String base = provider + "_" + providerUserId;
        return base.length() > 30 ? base.substring(0, 30) : base;
    }

    // UserService 내: 이메일 없이 신규 생성되는 분기에서도 role_id = 1로 설정
    @Transactional
    public String upsertSocialUser(String provider, String providerUserId, String email, String name) {
        if (!StringUtils.hasText(provider) || !StringUtils.hasText(providerUserId)) {
            throw new IllegalArgumentException("소셜 로그인 식별자가 올바르지 않습니다.");
        }

        if (org.springframework.util.StringUtils.hasText(email)) {
            return userRepository.findUsernameByEmail(email)
                    .map(existingUsername -> {
                        if (StringUtils.hasText(name)) {
                            userRepository.updateNameByUsername(existingUsername, name);
                        }
                        return existingUsername;
                    })
                    .orElseGet(() -> createSocialUser(email, name)); // 위에서 role_id=1로 생성
        }

        String generatedUsername = generateUsername(provider, providerUserId, null);
        if (userRepository.existsByUsername(generatedUsername)) {
            generatedUsername = generatedUsername + "_" + Math.abs(providerUserId.hashCode() % 10000);
        }
        

        User user = User.builder()
                .username(generatedUsername)
                .password(null)
                .name(org.springframework.util.StringUtils.hasText(name) ? name : generatedUsername)
                .email(null)
                .roleId(1)          // 1 = ROLE_USER
                .accountEnabled(0)  // 0 = 활성
                .build();
        int rows = userRepository.save(user);
        if (rows == 0) throw new IllegalStateException("소셜 사용자 생성에 실패했습니다.");
        return user.getUsername();
    }
}