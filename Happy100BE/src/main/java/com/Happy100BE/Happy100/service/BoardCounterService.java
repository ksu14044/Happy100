package com.Happy100BE.Happy100.service;

import com.Happy100BE.Happy100.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BoardCounterService {

    private final BoardRepository boardRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW, readOnly = false)
    public void increaseViewCount(Long postId) {
        boardRepository.increaseView(postId);
    }
}