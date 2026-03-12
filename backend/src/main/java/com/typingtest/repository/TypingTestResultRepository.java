package com.typingtest.repository;

import com.typingtest.model.TypingTestResult;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Repository
public class TypingTestResultRepository {

    // In-memory storage wrapper
    private final List<TypingTestResult> results = Collections.synchronizedList(new ArrayList<>());

    public TypingTestResult save(TypingTestResult result) {
        results.add(result);
        return result;
    }

    public List<TypingTestResult> findAll() {
        // Return a copy to prevent external modification
        return new ArrayList<>(results);
    }
}
