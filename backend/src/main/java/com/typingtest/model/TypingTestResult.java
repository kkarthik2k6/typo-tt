package com.typingtest.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "typing_test_results")
public class TypingTestResult {

    @Id
    private String id;

    @Column(nullable = false)
    private String username;

    private double wpm;
    private double accuracy;
    private int totalCharacters;
    private int correctCharacters;
    private int timeTaken;
    private LocalDateTime testDate;

    // Constructors
    public TypingTestResult() {
    }

    public TypingTestResult(String id, String username, double wpm, double accuracy, int totalCharacters,
                            int correctCharacters, int timeTaken, LocalDateTime testDate) {
        this.id = id;
        this.username = username;
        this.wpm = wpm;
        this.accuracy = accuracy;
        this.totalCharacters = totalCharacters;
        this.correctCharacters = correctCharacters;
        this.timeTaken = timeTaken;
        this.testDate = testDate;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public double getWpm() {
        return wpm;
    }

    public void setWpm(double wpm) {
        this.wpm = wpm;
    }

    public double getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(double accuracy) {
        this.accuracy = accuracy;
    }

    public int getTotalCharacters() {
        return totalCharacters;
    }

    public void setTotalCharacters(int totalCharacters) {
        this.totalCharacters = totalCharacters;
    }

    public int getCorrectCharacters() {
        return correctCharacters;
    }

    public void setCorrectCharacters(int correctCharacters) {
        this.correctCharacters = correctCharacters;
    }

    public int getTimeTaken() {
        return timeTaken;
    }

    public void setTimeTaken(int timeTaken) {
        this.timeTaken = timeTaken;
    }

    public LocalDateTime getTestDate() {
        return testDate;
    }

    public void setTestDate(LocalDateTime testDate) {
        this.testDate = testDate;
    }
}
