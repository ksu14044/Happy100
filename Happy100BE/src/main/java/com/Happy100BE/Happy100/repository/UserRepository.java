package com.Happy100BE.Happy100.repository;

import com.Happy100BE.Happy100.entity.User;
import com.Happy100BE.Happy100.mapper.UserMapper;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

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

    public int updatePasswordByUsername(String username, String encodedPassword) {
        return userMapper.updatePasswordByUsername(username, encodedPassword);
    }


    public int updateEmailByUsername(String username, String email) {
        return userMapper.updateEmailByUsername(username, email);
    }

    
    public int updateNameByUsername(String username, String name) {
        return userMapper.updateNameByUsername(username, name);
    }

    
    public int disableAccountByUsername(String username) {
        return userMapper.disableAccountByUsername(username);
    }

    
    public int disableAccountByTargetUsername(String targetUsername) {
        return userMapper.disableAccountByTargetUsername(targetUsername);
    }

    public Optional<String> findUsernameByEmail(String email) {
        return Optional.ofNullable(userMapper.findUsernameByEmail(email));
    }
}
