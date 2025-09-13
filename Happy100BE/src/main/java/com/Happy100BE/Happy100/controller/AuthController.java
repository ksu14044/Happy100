package com.Happy100BE.Happy100.controller;

import com.Happy100BE.Happy100.dto.request.LoginRequest;
import com.Happy100BE.Happy100.dto.request.SignUpRequestDto;
import com.Happy100BE.Happy100.dto.response.DuplicateCheckResponseDto;
import com.Happy100BE.Happy100.dto.response.LoginResponse;
import com.Happy100BE.Happy100.dto.response.UserInfoResponse;
import com.Happy100BE.Happy100.dto.response.UserResponseDto;
import com.Happy100BE.Happy100.security.jwt.JwtService;
import com.Happy100BE.Happy100.security.principal.CustomUserPrincipal;
import com.Happy100BE.Happy100.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

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

    @Operation(summary = "로그인", description = "로그인 성공 시 액세스 토큰을 발급합니다.")
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        CustomUserPrincipal principal = (CustomUserPrincipal) authentication.getPrincipal();

        // JwtService 시그니처: generateToken(String username, String role)
        String accessToken = jwtService.generateToken(principal.getUsername(), principal.getAuthorities()
                .iterator().next().getAuthority());

        // 만료시간은 application-secret.yml의 access-token-validity-seconds(=3600)와 일치하도록 반환
        return ResponseEntity.ok(new LoginResponse(accessToken, "Bearer", 3600));
    }

    

}
