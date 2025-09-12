package com.Happy100BE.Happy100.service;

import com.Happy100BE.Happy100.dto.request.SignUpRequestDto;
import com.Happy100BE.Happy100.dto.response.UserInfoResponse;
import com.Happy100BE.Happy100.dto.response.UserResponseDto;
import com.Happy100BE.Happy100.entity.User;
import com.Happy100BE.Happy100.mapper.UserMapper;
import com.Happy100BE.Happy100.repository.UserRepository;
import com.Happy100BE.Happy100.security.principal.CustomUserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
