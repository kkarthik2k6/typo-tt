package com.typingtest.controller;

import com.typingtest.model.TypingTestResult;
import com.typingtest.service.TypingTestResultService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
public class TypingTestResultController {

    private final TypingTestResultService service;

    public TypingTestResultController(TypingTestResultService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<TypingTestResult> saveResult(@RequestBody TypingTestResult result) {
        TypingTestResult savedResult = service.saveResult(result);
        return new ResponseEntity<>(savedResult, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TypingTestResult>> getAllResults() {
        return ResponseEntity.ok(service.getAllResults());
    }

    @GetMapping("/top")
    public ResponseEntity<List<TypingTestResult>> getTopResults() {
        return ResponseEntity.ok(service.getTopResults());
    }
}
