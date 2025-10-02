package com.Happy100BE.Happy100.controller;

import com.Happy100BE.Happy100.dto.request.LoginRequest;
import com.Happy100BE.Happy100.dto.request.PasswordFindConfirmRequest;
import com.Happy100BE.Happy100.dto.request.PasswordFindRequest;
import com.Happy100BE.Happy100.dto.request.PasswordFindVerifyRequest;
import com.Happy100BE.Happy100.dto.request.SignUpRequestDto;
import com.Happy100BE.Happy100.dto.response.DuplicateCheckResponseDto;
import com.Happy100BE.Happy100.dto.response.ErrorResponse;
import com.Happy100BE.Happy100.dto.response.LoginResponse;
import com.Happy100BE.Happy100.dto.response.PasswordResetVerifyResponse;
import com.Happy100BE.Happy100.dto.response.SimpleOkResponse;
import com.Happy100BE.Happy100.dto.response.UserResponseDto;
import com.Happy100BE.Happy100.security.jwt.JwtService;
import com.Happy100BE.Happy100.security.jwt.JwtProperties;
import com.Happy100BE.Happy100.security.jwt.TokenCookieUtil;
import com.Happy100BE.Happy100.security.principal.CustomUserPrincipal;
import com.Happy100BE.Happy100.service.PasswordFindService;
import com.Happy100BE.Happy100.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;


@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final JwtProperties jwtProperties;
    private final TokenCookieUtil tokenCookieUtil;
    private final PasswordFindService passwordFindService;

    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> signUp(@Valid @RequestBody SignUpRequestDto req) {
        UserResponseDto res = userService.signUp(req);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/check-username")
    public ResponseEntity<DuplicateCheckResponseDto> checkUsername(@RequestParam String username) {
        boolean dup = userService.isUsernameDuplicate(username);
        return ResponseEntity.ok(
                DuplicateCheckResponseDto.builder()
                        .field("username")
                        .value(username)
                        .duplicate(dup)
                        .build()
        );
    }

    @GetMapping("/check-email")
    public ResponseEntity<DuplicateCheckResponseDto> checkEmail(@RequestParam String email) {
        boolean dup = userService.isEmailDuplicate(email);
        return ResponseEntity.ok(
                DuplicateCheckResponseDto.builder()
                        .field("email")
                        .value(email)
                        .duplicate(dup)
                        .build()
        );
    }

    @Operation(summary = "로그인", description = "로그인 성공 시 액세스 토큰을 HttpOnly 쿠키로 설정합니다.")
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            CustomUserPrincipal principal = (CustomUserPrincipal) authentication.getPrincipal();

            // JwtService 시그니처: generateToken(String username, String role)
            String accessToken = jwtService.generateToken(principal.getUsername(), principal.getAuthorities()
                    .iterator().next().getAuthority());

            long expiresIn = jwtProperties.accessTokenValiditySeconds();

            // 액세스 토큰을 HttpOnly 쿠키로 설정
            var cookie = tokenCookieUtil.buildAccessTokenCookie(accessToken, expiresIn);

            String name = userService.getMyInfo(principal.getUsername()).getName();

            // 호환성을 위해 기존 응답 포맷은 유지하되
            // 프론트에서는 더 이상 localStorage를 사용하지 않고 쿠키 기반 인증을 사용하도록 전환한다.
            return ResponseEntity.ok()
                    .header("Set-Cookie", cookie.toString())
                    .body(new LoginResponse(accessToken, "Bearer", expiresIn, name));
        } catch (DisabledException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ErrorResponse.of(HttpStatus.FORBIDDEN, "탈퇴한 회원입니다."));
        } catch (BadCredentialsException | UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ErrorResponse.of(HttpStatus.UNAUTHORIZED, "계정 정보를 확인해 주세요."));
        }
    }

    @GetMapping("/find-username")
    public ResponseEntity<String> findUsernameByEmail(
            @RequestParam @NotBlank @Email String email) {

        return userService.findUsername(email)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping("/request")
    public ResponseEntity<SimpleOkResponse> requestCode(@RequestBody @Valid PasswordFindRequest req) {
        passwordFindService.requestVerificationCode(req);
        return ResponseEntity.ok(new SimpleOkResponse("OK"));
    }

    @PostMapping("/verify")
    public ResponseEntity<PasswordResetVerifyResponse> verify(@RequestBody @Valid PasswordFindVerifyRequest req) {
        String resetToken = passwordFindService.verifyCodeAndIssueToken(req);
        return ResponseEntity.ok(new PasswordResetVerifyResponse(resetToken));
    }

    @PostMapping("/confirm")
    public ResponseEntity<Void> confirm(@RequestBody @Valid PasswordFindConfirmRequest req) {
        passwordFindService.resetPassword(req);
        return ResponseEntity.noContent().build();
    }
    

}
