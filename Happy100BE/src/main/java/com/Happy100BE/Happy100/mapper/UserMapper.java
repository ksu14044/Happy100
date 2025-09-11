package com.Happy100BE.Happy100.mapper;

import com.Happy100BE.Happy100.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    int insertUser(User user);

    boolean existsByUsername(@Param("username") String username);

    boolean existsByEmail(@Param("email") String email);

    User findByUsername(@Param("username") String username);
}