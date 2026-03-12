import React, { useState, useEffect, useRef } from 'react';
import './TypingTest.css';

const PARAGRAPHS = [
  "Technology is best when it brings people together. The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life. Innovation distinguishes between a leader and a follower.",
  "Programming is not about typing, it's about thinking. The sooner you start to code, the longer the program will take. Clean code always looks like it was written by someone who cares.",
  "Software and cathedrals are much the same, first we build them, then we pray. A good programmer is someone who always looks both ways before crossing a one-way street.",
  "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. The future belongs to those who believe in the beauty of their dreams.",
  "In three words I can sum up everything I've learned about life: it goes on. To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
  "The web is more a social creation than a technical one. I designed it for a social effect, to help people work together, and not as a technical toy.",
  "Design is not just what it looks like and feels like. Design is how it works. Innovation distinguishes between a leader and a follower.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. Experience is the name everyone gives to their mistakes."
];

const TypingTest = ({ duration = 60, onComplete }) => {
  const [timer, setTimer] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [stats, setStats] = useState({ wpm: 0, accuracy: 100, correctChars: 0, totalCharsEscaped: 0 });
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const inputRef = useRef(null);

  const initTest = () => {
    const p = PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)];
    setParagraph(p);
    setTimer(duration);
    setIsRunning(false);
    setUserInput('');
    setStats({ wpm: 0, accuracy: 100, correctChars: 0, totalCharsEscaped: 0 });
    setCurrentWordIndex(0);
  };

  useEffect(() => {
    initTest();
  }, [duration]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [paragraph]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && e.tabKey) { // Just in case, standard restart
        initTest();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [duration]);

  // Timer Effect
  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && isRunning) {
      setIsRunning(false);
      finishTest();
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const calculateStats = (input) => {
    let correct = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === paragraph[i]) {
            correct++;
        }
    }
    
    const timeElapsed = duration - timer;
    const timeInMinutes = timeElapsed > 0 ? timeElapsed / 60 : 1/60; 
    
    const currentWpm = timeElapsed > 0 
      ? Math.round((correct / 5) / timeInMinutes) 
      : 0;

    const currentAccuracy = input.length > 0 
      ? Math.round((correct / input.length) * 100) 
      : 100;

    return { wpm: currentWpm, accuracy: currentAccuracy, correctChars: correct, totalCharsEscaped: input.length };
  };

  const handleInputChange = (e) => {
    if (timer === 0) return;
    
    if (!isRunning && e.target.value.length === 1) {
      setIsRunning(true);
    }
    
    const val = e.target.value;
    if (val.length > paragraph.length) return;

    setUserInput(val);
    
    // Calculate current word index for highlighting
    const words = paragraph.substring(0, val.length).split(' ');
    setCurrentWordIndex(words.length - 1);

    const newStats = calculateStats(val);
    setStats(newStats);

    if (val.length === paragraph.length) {
      setIsRunning(false);
      finishTest(newStats, val, timer);
    }
  };

  const finishTest = (finalStats = stats, input = userInput, currentTimer = timer) => {
    const timeTaken = duration - currentTimer;
    onComplete({
      wpm: finalStats.wpm,
      accuracy: finalStats.accuracy,
      correctCharacters: finalStats.correctChars,
      totalCharacters: input.length,
      timeTaken: timeTaken === 0 ? 1 : timeTaken
    });
  };

  const renderText = () => {
    const words = paragraph.split(' ');
    let charIndex = 0;

    return words.map((word, wIdx) => {
      const isCurrentWord = wIdx === currentWordIndex;
      const wordSpan = (
        <span key={wIdx} className={`text-word ${isCurrentWord ? 'current-word' : ''}`}>
          {word.split('').map((char, cIdx) => {
            const globalCharIndex = charIndex;
            let className = 'text-char ';
            if (globalCharIndex < userInput.length) {
              className += char === userInput[globalCharIndex] ? 'correct' : 'incorrect';
            } else if (globalCharIndex === userInput.length) {
              className += 'current';
            }
            charIndex++;
            return <span key={cIdx} className={className}>{char}</span>;
          })}
          {/* Handle the space after the word */}
          {wIdx < words.length - 1 && (() => {
            const globalCharIndex = charIndex;
            let className = 'text-char space-char ';
            if (globalCharIndex < userInput.length) {
              className += ' ' === userInput[globalCharIndex] ? 'correct' : 'incorrect';
            } else if (globalCharIndex === userInput.length) {
              className += 'current';
            }
            charIndex++;
            return <span key={`space-${wIdx}`} className={className}> </span>;
          })()}
        </span>
      );
      return wordSpan;
    });
  };

  return (
    <div className="card animate-fade-in typing-test-card">
      <div className="test-header">
        <div className="stat-box">
          <span className="stat-label">Time Left</span>
          <span className="stat-value timer-glow">{timer}s</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Live WPM</span>
          <span className="stat-value">{stats.wpm}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Accuracy</span>
          <span className="stat-value">{stats.accuracy}%</span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${((duration - timer) / duration) * 100}%` }}
        ></div>
      </div>

      <div className="text-display" onClick={() => inputRef.current && inputRef.current.focus()}>
        {renderText()}
      </div>

      <div className="test-actions">
        <button className="restart-btn" onClick={initTest} title="Restart (Tab + Enter)">
          ↻ Restart Test
        </button>
      </div>

      <textarea
        ref={inputRef}
        className="hidden-input"
        value={userInput}
        onChange={handleInputChange}
        disabled={timer === 0}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
      />
      
      <p className="hint-text">Start typing to begin • Press Tab + Enter to restart</p>
    </div>
  );
};

export default TypingTest;
