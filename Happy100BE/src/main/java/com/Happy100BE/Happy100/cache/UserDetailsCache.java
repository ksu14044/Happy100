package com.Happy100BE.Happy100.cache;

import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.Happy100BE.Happy100.config.CacheConfig;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserDetailsCache {

    private final CacheManager cacheManager;

    public void evict(String username) {
        if (!StringUtils.hasText(username)) {
            return;
        }
        Cache cache = cacheManager.getCache(CacheConfig.USER_DETAILS_CACHE);
        if (cache != null) {
            cache.evict(username);
        }
    }

    public void evictAll() {
        Cache cache = cacheManager.getCache(CacheConfig.USER_DETAILS_CACHE);
        if (cache != null) {
            cache.clear();
        }
    }
}
