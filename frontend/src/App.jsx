import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import TypingTest from "./components/TypingTest";
import ResultScreen from "./components/ResultScreen";
import Leaderboard from "./components/Leaderboard";
import Footer from './components/Footer';
import "./index.css";


function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [testResult, setTestResult] = useState(null);
  const [testDuration, setTestDuration] = useState(60);
  const [difficulty, setDifficulty] = useState("medium");

  const navigate = (screen) => setCurrentScreen(screen);

  return (
    <>
      <Navbar navigate={navigate} currentScreen={currentScreen} />

      <main className="container">
        {currentScreen === "home" && (
          <HomePage 
            navigate={navigate} 
            testDuration={testDuration}
            setTestDuration={setTestDuration}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        )}
        
        {currentScreen === "test" && (
          <TypingTest
            duration={testDuration}
            difficulty={difficulty}
            onComplete={(result) => {
              setTestResult(result);
              navigate("result");
            }}
          />
        )}

        {currentScreen === "result" && (
          <ResultScreen result={testResult} navigate={navigate} />
        )}

        {currentScreen === "leaderboard" && <Leaderboard />}
      </main>

      <Footer />
    </>
  );
}

export default App;
