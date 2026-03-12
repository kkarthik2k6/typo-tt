package com.typingtest.service;

import com.typingtest.model.TypingTestResult;
import com.typingtest.repository.TypingTestResultRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class TypingTestResultService {

    private final TypingTestResultRepository repository;

    // Constructor injection
    public TypingTestResultService(TypingTestResultRepository repository) {
        this.repository = repository;
    }

    public TypingTestResult saveResult(TypingTestResult result) {
        if (result.getUsername() == null || result.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }

        result.setId(UUID.randomUUID().toString());
        if (result.getTestDate() == null) {
            result.setTestDate(LocalDateTime.now());
        }

        return repository.save(result);
    }

    public List<TypingTestResult> getAllResults() {
        return repository.findAll();
    }

    public List<TypingTestResult> getTopResults() {
        // JPA handles the sorting and limiting for us!
        return repository.findTop5ByOrderByWpmDesc();
    }
}
