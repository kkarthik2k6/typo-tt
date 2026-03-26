# Typo. — Premium Typing Test

A full-stack typing test application with a dark glassmorphism UI theme. Built with Spring Boot + React (Vite). Track your WPM, accuracy, and compete on a global leaderboard.

![Dark Glass Theme](https://img.shields.io/badge/Theme-Dark_Glassmorphism-black?style=for-the-badge)
![Java 17](https://img.shields.io/badge/Java-17-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge)

## Features

- **3 Difficulty Modes** — Easy (common words), Medium (paragraphs), Hard (code snippets)
- **Configurable Timer** — 15s, 30s, 60s, 120s
- **Smooth Animated Caret** — Monkeytype-style gliding cursor
- **Live Stats** — Real-time WPM & accuracy tracking
- **Global Leaderboard** — Save and compare scores
- **Dark Glass UI** — Premium glassmorphism with matte 3D background shapes

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Vanilla CSS |
| Backend | Java 17, Spring Boot 3.2, Spring Data JPA |
| Database | PostgreSQL (NeonDB) |
| Deployment | Vercel (frontend) + Render (backend) + NeonDB |

## Project Structure

```
typo/
├── backend/                    # Spring Boot API
│   ├── src/main/java/com/typingtest/
│   │   ├── config/             # CORS configuration
│   │   ├── controller/         # REST endpoints
│   │   ├── model/              # JPA entities
│   │   ├── repository/         # Data access
│   │   └── service/            # Business logic
│   ├── src/main/resources/
│   │   ├── application.properties          # (gitignored — has secrets)
│   │   └── application.properties.example  # Template for setup
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                   # React + Vite
│   ├── src/
│   │   ├── components/         # All UI components + CSS
│   │   ├── App.jsx             # Root component & routing
│   │   ├── index.css           # Global theme (dark glass)
│   │   └── main.jsx            # Entry point
│   ├── .env.example            # Template for env vars
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml          # Local Docker setup
├── .gitignore
└── README.md
```

## Local Development

### Prerequisites
- Java 17 + Maven
- Node.js 18+ + npm
- A PostgreSQL database (e.g., [NeonDB](https://neon.tech) free tier)

### 1. Backend Setup

```bash
cd backend

# Copy the template and fill in your NeonDB credentials
cp src/main/resources/application.properties.example src/main/resources/application.properties
# Edit application.properties with your database URL, username, password

# Run
mvn spring-boot:run
```
Server starts at `http://localhost:8080`

### 2. Frontend Setup

```bash
cd frontend

# Copy env template
cp .env.example .env

# Install & run
npm install
npm run dev
```
App starts at `http://localhost:5173`

## Deployment

### Frontend → Vercel
1. Import the `frontend/` directory in Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Set environment variable: `VITE_API_URL` = your Render backend URL

### Backend → Render
1. Create a new Web Service pointing to `backend/`
2. Set build command: `mvn clean package -DskipTests`
3. Set start command: `java -jar target/*.jar`
4. Set environment variables:
   - `DATABASE_URL` = your NeonDB JDBC URL
   - `DATABASE_USERNAME` = your NeonDB username
   - `DATABASE_PASSWORD` = your NeonDB password
   - `CORS_ALLOWED_ORIGINS` = your Vercel frontend URL

### Database → NeonDB
1. Create a free project at [neon.tech](https://neon.tech)
2. Copy the connection string details to your Render env vars

## License

MIT
