package com.Happy100BE.Happy100.security;

import lombok.experimental.UtilityClass; import org.springframework.security.core.Authentication;

@UtilityClass
public class AuthUtil {
    public boolean isAdmin(Authentication auth) {
    if (auth == null) return false;
    return auth.getAuthorities().stream()
            .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
}

    public String getCurrentUsername(Authentication auth) {
    if (auth == null) return null;

    Object principal = auth.getPrincipal();
    if (principal instanceof org.springframework.security.core.userdetails.UserDetails ud) {
        return ud.getUsername();
    }
    if (principal instanceof String s && !s.isBlank()) {
        return s;
    }

    Object details = auth.getDetails();
    if (details instanceof java.util.Map<?, ?> map) {
        Object v = map.get("username"); // details에 넣는 경우
        if (v instanceof String sv && !sv.isBlank()) return sv;
        // sub로 담긴 경우
        v = map.get("sub");
        if (v instanceof String sv2 && !sv2.isBlank()) return sv2;
    }

    return null;
}

}
