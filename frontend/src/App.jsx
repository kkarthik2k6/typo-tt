import React, { useState, useEffect, useRef } from "react";
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedScreen, setDisplayedScreen] = useState("home");
  const pendingScreen = useRef(null);

  const navigate = (screen) => {
    if (screen === displayedScreen) return;
    setIsTransitioning(true);
    pendingScreen.current = screen;
  };

  // When fade-out finishes, swap the screen and fade back in
  useEffect(() => {
    if (!isTransitioning) return;
    const timeout = setTimeout(() => {
      setCurrentScreen(pendingScreen.current);
      setDisplayedScreen(pendingScreen.current);
      setIsTransitioning(false);
    }, 250); // matches CSS transition duration
    return () => clearTimeout(timeout);
  }, [isTransitioning]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        // Don't navigate away if user is typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
          e.target.blur();
          return;
        }
        if (currentScreen !== 'home') {
          navigate('home');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen, displayedScreen]);

  return (
    <>
      <Navbar navigate={navigate} currentScreen={displayedScreen} />

      <main className={`container page-transition ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
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

      {/* Keyboard shortcut hints */}
      <div className="shortcut-hints">
        <span className="shortcut-hint">
          <kbd>Esc</kbd> Home
        </span>
        {currentScreen === 'test' && (
          <span className="shortcut-hint">
            <kbd>Tab</kbd> + <kbd>Enter</kbd> Restart
          </span>
        )}
      </div>

      <Footer />
    </>
  );
}

export default App;
