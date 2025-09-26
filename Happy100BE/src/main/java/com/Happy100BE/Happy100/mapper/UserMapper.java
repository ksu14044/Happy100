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

    int updatePasswordByUsername(@Param("username") String username,
                                @Param("passwordHash") String passwordHash);

    int updateEmailByUsername(@Param("username") String username,
                                @Param("email") String email);

    int updateNameByUsername(@Param("username") String username,
                                @Param("name") String name);

    int disableAccountByUsername(@Param("username") String username);

    // 관리자가 특정 사용자를 비활성화할 때(식별 기준: username)
    int disableAccountByTargetUsername(@Param("targetUsername") String targetUsername);

    String findUsernameByEmail(@Param("email") String email);

    int countByUsernameAndEmail(@Param("username") String username, @Param("email") String email);
    int updatePasswordByUsernameAndEmail(@Param("username") String username, @Param("email") String email, @Param("encodedPassword") String encodedPassword);

    // 관리자 기능용 쿼리
    long countAll(@Param("searchType") String searchType,
                  @Param("keyword") String keyword);

    java.util.List<com.Happy100BE.Happy100.entity.User> selectAll(@Param("offset") int offset,
                                                                 @Param("limit") int limit,
                                                                 @Param("orderBy") String orderBy,
                                                                 @Param("searchType") String searchType,
                                                                 @Param("keyword") String keyword);
    com.Happy100BE.Happy100.entity.User findById(@Param("userId") Integer userId);
    int updateById(@Param("userId") Integer userId,
                   @Param("name") String name,
                   @Param("email") String email,
                   @Param("roleId") Integer roleId,
                   @Param("accountEnabled") Integer accountEnabled);
    int disableAccountByUserId(@Param("userId") Integer userId);
}
