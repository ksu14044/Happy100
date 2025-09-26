package com.Happy100BE.Happy100.service;

import java.util.List;
import java.util.Locale;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import com.Happy100BE.Happy100.dto.response.AdminPostResponse;
import com.Happy100BE.Happy100.dto.response.PageResponse;
import com.Happy100BE.Happy100.dto.response.UserResponse;
import com.Happy100BE.Happy100.entity.BoardPost;
import com.Happy100BE.Happy100.entity.User;
import com.Happy100BE.Happy100.repository.BoardRepository;
import com.Happy100BE.Happy100.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AdminService {
    private static final int DEFAULT_MAX_PAGE_SIZE = 100;

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    public PageResponse<UserResponse> getUsers(int page, int size, String keyword) {
        int safePage = Math.max(page, 1);
        int safeSize = Math.max(1, Math.min(size, DEFAULT_MAX_PAGE_SIZE));
        String normalizedKeyword = normalizeKeyword(keyword);

        int offset = (safePage - 1) * safeSize;
        List<User> users = userRepository.findAll(offset, safeSize, "created_at DESC", normalizedKeyword);
        long total = userRepository.countAll(normalizedKeyword);

        List<UserResponse> content = users.stream()
                .map(this::toUserResponse)
                .toList();

        return new PageResponse<>(content, safePage, safeSize, total);
    }

    @Transactional
    public void deleteUser(Integer userId) {
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "사용자 ID가 필요합니다.");
        }
        int updated = userRepository.disableAccountByUserId(userId);
        if (updated == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "대상 사용자를 찾을 수 없습니다.");
        }
    }

    public PageResponse<AdminPostResponse> getPosts(int page, int size, String searchType, String keyword) {
        int safePage = Math.max(page, 1);
        int safeSize = Math.max(1, Math.min(size, DEFAULT_MAX_PAGE_SIZE));
        String normalizedKeyword = normalizeKeyword(keyword);
        String normalizedSearchType = normalizePostSearchType(searchType);

        int offset = (safePage - 1) * safeSize;
        String keywordValue = normalizedKeyword;
        if (keywordValue != null) {
            keywordValue = keywordValue.toLowerCase(Locale.ROOT);
        }

        List<BoardPost> posts = boardRepository.findPostList(null, offset, safeSize,
                normalizedSearchType, keywordValue, null);
        long total = boardRepository.countPostList(null, normalizedSearchType, keywordValue);

        List<AdminPostResponse> content = posts.stream()
                .map(this::toAdminPostResponse)
                .toList();

        return new PageResponse<>(content, safePage, safeSize, total);
    }

    @Transactional
    public void deletePost(Long postId) {
        if (postId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "게시글 ID가 필요합니다.");
        }
        int deleted = boardRepository.softDelete(postId);
        if (deleted == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "대상 게시글을 찾을 수 없습니다.");
        }
    }

    private String normalizeKeyword(String keyword) {
        if (!StringUtils.hasText(keyword)) {
            return null;
        }
        return keyword.trim();
    }

    private String normalizePostSearchType(String searchType) {
        if (!StringUtils.hasText(searchType)) {
            return null;
        }
        String upper = searchType.trim().toUpperCase(Locale.ROOT);
        return "TITLE".equals(upper) ? "TITLE" : null;
    }

    private UserResponse toUserResponse(User user) {
        UserResponse response = new UserResponse();
        response.setUserId(user.getUserId());
        response.setUsername(user.getUsername());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRoleId(user.getRoleId());
        response.setRoleName(user.getRoleName());
        response.setAccountEnabled(user.getAccountEnabled());
        response.setCreatedAt(user.getCreatedAt());
        return response;
    }

    private AdminPostResponse toAdminPostResponse(BoardPost post) {
        AdminPostResponse response = new AdminPostResponse();
        response.setPostId(post.getPostId());
        response.setBoardType(post.getBoardType());
        response.setTitle(post.getTitle());
        response.setAuthorId(post.getAuthorId());
        response.setViewCount(post.getViewCount());
        response.setCreatedAt(post.getCreatedAt());
        response.setUpdatedAt(post.getUpdatedAt());
        return response;
    }
}
