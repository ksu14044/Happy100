package com.Happy100BE.Happy100.repository;

import com.Happy100BE.Happy100.entity.User;
import com.Happy100BE.Happy100.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserRepository {
    private final UserMapper userMapper;

    public boolean existsByUsername(String username) {
        return userMapper.existsByUsername(username);
    }

    public User findByUsername(String username) {
        return userMapper.findByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userMapper.existsByEmail(email);
    }

    public int save(User user) {
        try {
            return userMapper.insertUser(user);
        } catch (DuplicateKeyException e) {
            throw e;
        }
    }
}
