import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import TypingTest from "./components/TypingTest";
import ResultScreen from "./components/ResultScreen";
import Leaderboard from "./components/Leaderboard";
import Footer from './components/Footer';
import Particles from './components/Particles';
import "./index.css";


function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [testResult, setTestResult] = useState(null);
  const [testDuration, setTestDuration] = useState(60);
  const [difficulty, setDifficulty] = useState("medium");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedScreen, setDisplayedScreen] = useState("home");
  const [isTyping, setIsTyping] = useState(false);
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

  // Global keyboard shortcuts and mouse parallax
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
          e.target.blur();
          return;
        }
        if (currentScreen !== 'home') navigate('home');
      }
    };

    // Parallax mouse effect
    const handleMouseMove = (e) => {
      // Calculate from center of screen (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      // Give it a subtle max rotation of e.g. 5 degrees
      document.documentElement.style.setProperty('--mouse-x', `${x * 5}deg`);
      document.documentElement.style.setProperty('--mouse-y', `${-y * 5}deg`);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [currentScreen, displayedScreen]);

  return (
    <>
      <Particles />
      <Navbar navigate={navigate} currentScreen={displayedScreen} isHidden={isTyping} />

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
              setIsTyping(false);
              navigate("result");
            }}
            onRunningChange={setIsTyping}
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
