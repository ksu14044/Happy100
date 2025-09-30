// src/main/java/com/Happy100BE/Happy100/service/CustomUserDetailsService.java
package com.Happy100BE.Happy100.service;

import com.Happy100BE.Happy100.config.CacheConfig;
import com.Happy100BE.Happy100.entity.User;
import com.Happy100BE.Happy100.mapper.UserMapper;
import com.Happy100BE.Happy100.security.principal.CustomUserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserMapper userMapper;

    @Override
    @Cacheable(cacheNames = CacheConfig.USER_DETAILS_CACHE, key = "#username")
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = userMapper.findByUsername(username);
        if (u == null) throw new UsernameNotFoundException("User not found: " + username);

        boolean enabled = u.getAccountEnabled() != null && u.getAccountEnabled() == 0;

        return new CustomUserPrincipal(
                u.getUserId(),
                u.getUsername(),
                u.getPassword(),
                u.getRoleName(), // ROLE_USER / ROLE_ADMIN
                enabled
        );
    }
}
