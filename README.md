# Typing Test Web Application

A full-stack, aesthetically pleasing typing test application built with Spring Boot (Java 17) and Vite (React JS). It tracks words per minute (WPM), typing accuracy, total characters, and correct characters without requiring a database connection (uses in-memory storage).

## Features

- **Backend**: Spring Boot 3 + Java 17
  - In-memory data store for saving scores and global leaderboard.
- **Frontend**: Vite + React
  - Responsive modern UI, sleek CSS styles.
  - 60-second typing test with real-time accuracy and WPM tracking.
  - Character highlighting (green for correct, red for incorrect).

---

## Project Structure

```bash
root/
├── backend/    # Spring Boot Java application
└── frontend/   # Vite React application
```

## Running the Application Locally

### 1. Start the Backend

Prerequisites: Java 17 and Maven installed.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build and run the Spring Boot application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
3. The server will start on `http://localhost:8080`.

### 2. Start the Frontend

Prerequisites: Node.js (v18+) and npm installed.

1. Navigate to the frontend directory (open a new terminal):
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. The frontend will start locally on `http://localhost:5173`.

---

## Usage

1. Open `http://localhost:5173` in your browser.
2. Click **Start Typing Test** on the home page.
3. Begin typing. The 60-second timer automatically starts on your first keystroke.
4. When the timer ends, review your results.
5. Enter your name and save to view the leaderboard!
