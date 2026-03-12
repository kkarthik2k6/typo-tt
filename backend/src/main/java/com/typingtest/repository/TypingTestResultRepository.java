package com.typingtest.repository;

import com.typingtest.model.TypingTestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypingTestResultRepository extends JpaRepository<TypingTestResult, String> {

    // Spring Data JPA auto-generates these methods:
    // save(), findAll(), findById(), deleteById(), etc.

    // Custom query: find top 5 results ordered by WPM descending
    List<TypingTestResult> findTop5ByOrderByWpmDesc();
}
