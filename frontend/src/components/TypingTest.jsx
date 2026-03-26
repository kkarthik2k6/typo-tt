import React, { useState, useEffect, useRef, useCallback } from 'react';
import './TypingTest.css';

/* ==========================================
   CONTENT POOLS BY DIFFICULTY
   ========================================== */

const EASY_WORDS = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
  "for", "not", "on", "with", "he", "as", "you", "do", "at", "this",
  "but", "his", "by", "from", "they", "we", "say", "her", "she", "or",
  "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know",
  "take", "people", "into", "year", "your", "good", "some", "could",
  "them", "see", "other", "than", "then", "now", "look", "only", "come",
  "its", "over", "think", "also", "back", "after", "use", "two", "how",
  "our", "work", "first", "well", "way", "even", "new", "want", "give",
  "most", "find", "here", "thing", "many", "right", "big", "high",
  "each", "follow", "act", "why", "ask", "men", "read", "need", "land",
  "home", "hand", "air", "small", "end", "put", "still", "between",
  "never", "start", "city", "run", "play", "old", "help", "every",
  "near", "add", "food", "own", "move", "live", "close", "night",
  "real", "life", "few", "stop", "open", "seem", "next", "hard",
  "walk", "ease", "both", "mark", "often", "letter", "until", "mile",
  "river", "car", "feet", "care", "keep", "door", "set", "map",
  "rain", "rule", "warm", "pull", "cold", "cut", "sure", "fast",
  "draw", "voice", "color", "face", "wood", "main", "true", "sun"
];

const MEDIUM_PARAGRAPHS = [
  "Technology is best when it brings people together. The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life. Innovation distinguishes between a leader and a follower.",
  "Programming is not about typing, it's about thinking. The sooner you start to code, the longer the program will take. Clean code always looks like it was written by someone who cares deeply about the craft.",
  "Software and cathedrals are much the same, first we build them, then we pray. A good programmer is someone who always looks both ways before crossing a one-way street. Every great developer started out confused.",
  "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it. Stay hungry, stay foolish.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. The future belongs to those who believe in the beauty of their dreams. Dream big, start small, but most of all start.",
  "In three words I can sum up everything I've learned about life: it goes on. To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment one can achieve.",
  "The web is more a social creation than a technical one. I designed it for a social effect, to help people work together, and not as a technical toy. The internet is becoming the town square of the global village.",
  "Design is not just what it looks like and feels like. Design is how it works. Simplicity is the ultimate sophistication. Good design is as little design as possible, and less but better is the guiding principle.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. Experience is the name everyone gives to their mistakes. We learn best from failure, not success.",
  "The best error message is the one that never shows up. Code is like humor: when you have to explain it, it's bad. Before software can be reusable it first has to be usable by actual people.",
  "The most important property of a program is whether it accomplishes the intention of its user. Computers are useless. They can only give you answers. The real question is always the most important part.",
  "Artificial intelligence is no match for natural stupidity, but it is getting closer every day. Machine learning is the last invention that humanity will ever need to make, assuming we get it right.",
  "Every great magic trick consists of three parts: the pledge, the turn, and the prestige. Technology follows the same pattern. You show the world something ordinary, then you make it do something extraordinary.",
  "Knowledge is power, but enthusiasm pulls the switch. Talent wins games, but teamwork and intelligence win championships. The strength of the team is each individual member, and the strength of each member is the team.",
  "The computer was born to solve problems that did not exist before. Programming today is a race between engineers building bigger and better programs and the universe trying to produce bigger fools.",
  "Talk is cheap. Show me the code. First solve the problem, then write the code. The function of good software is to make the complex appear simple and to empower users to achieve their goals effortlessly."
];

const HARD_CODE_SNIPPETS = [
  "function mergeSort(arr) { if (arr.length <= 1) return arr; const mid = Math.floor(arr.length / 2); const left = mergeSort(arr.slice(0, mid)); const right = mergeSort(arr.slice(mid)); return merge(left, right); }",
  "const debounce = (fn, delay) => { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; };",
  "class TreeNode { constructor(val) { this.val = val; this.left = null; this.right = null; } } const inorder = (node) => { if (!node) return []; return [...inorder(node.left), node.val, ...inorder(node.right)]; };",
  "const fibonacci = (n, memo = {}) => { if (n in memo) return memo[n]; if (n <= 1) return n; memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo); return memo[n]; };",
  "app.get('/api/users/:id', async (req, res) => { try { const user = await User.findById(req.params.id); if (!user) return res.status(404).json({ error: 'Not found' }); res.json(user); } catch (err) { res.status(500).json({ error: err.message }); } });",
  "SELECT u.name, COUNT(o.id) AS total_orders, SUM(o.amount) AS total_spent FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE o.created_at >= '2024-01-01' GROUP BY u.name HAVING total_orders > 5 ORDER BY total_spent DESC;",
  "const useLocalStorage = (key, initial) => { const [value, setValue] = useState(() => { const stored = localStorage.getItem(key); return stored ? JSON.parse(stored) : initial; }); useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]); return [value, setValue]; };",
  "docker build -t myapp:latest . && docker run -d --name myapp -p 3000:3000 -e NODE_ENV=production -v $(pwd)/data:/app/data --restart unless-stopped myapp:latest",
  "git stash && git checkout main && git pull origin main && git checkout -b feature/auth-flow && git stash pop && npm install && npm test -- --coverage",
  "const pipeline = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x); const transform = pipeline(trim, toLowerCase, splitWords, removeDups, sortAlpha, joinWithComma);",
  "interface ApiResponse<T> { data: T; status: number; message: string; timestamp: Date; } type UserDTO = { id: string; name: string; email: string; roles: string[]; };",
  "@keyframes slideIn { from { transform: translateX(-100%) scale(0.95); opacity: 0; } to { transform: translateX(0) scale(1); opacity: 1; } } .modal { animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }"
];

/* Generate easy mode text from random words */
const generateEasyText = (wordCount = 50) => {
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(EASY_WORDS[Math.floor(Math.random() * EASY_WORDS.length)]);
  }
  return words.join(' ');
};

const getTextForDifficulty = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return generateEasyText(50);
    case 'hard':
      return HARD_CODE_SNIPPETS[Math.floor(Math.random() * HARD_CODE_SNIPPETS.length)];
    case 'medium':
    default:
      return MEDIUM_PARAGRAPHS[Math.floor(Math.random() * MEDIUM_PARAGRAPHS.length)];
  }
};

/* ==========================================
   TYPING TEST COMPONENT
   ========================================== */

const TypingTest = ({ duration = 60, difficulty = 'medium', onComplete, onRunningChange }) => {
  const [timer, setTimer] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [stats, setStats] = useState({ wpm: 0, accuracy: 100, correctChars: 0, totalCharsEscaped: 0 });
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [caretPos, setCaretPos] = useState({ left: 0, top: 0 });
  
  const inputRef = useRef(null);
  const textDisplayRef = useRef(null);

  // Raw keystroke tracking refs (survive re-renders, no stale closures)
  const totalKeypressesRef = useRef(0);
  const correctKeypressesRef = useRef(0);
  // Refs to always hold latest state (fixes stale closure in timer effect)
  const userInputRef = useRef('');
  const paragraphRef = useRef('');
  const timerRef = useRef(duration);

  // Keep refs in sync with state
  useEffect(() => { userInputRef.current = userInput; }, [userInput]);
  useEffect(() => { paragraphRef.current = paragraph; }, [paragraph]);
  useEffect(() => { timerRef.current = timer; }, [timer]);

  useEffect(() => {
    if (onRunningChange) {
      onRunningChange(isRunning);
    }
  }, [isRunning, onRunningChange]);

  const initTest = useCallback(() => {
    const p = getTextForDifficulty(difficulty);
    setParagraph(p);
    paragraphRef.current = p;
    setTimer(duration);
    timerRef.current = duration;
    setIsRunning(false);
    setUserInput('');
    userInputRef.current = '';
    setStats({ wpm: 0, accuracy: 100, correctChars: 0, totalCharsEscaped: 0 });
    setCurrentWordIndex(0);
    setCaretPos({ left: 0, top: 0 });
    // Reset raw keystroke counters
    totalKeypressesRef.current = 0;
    correctKeypressesRef.current = 0;
    if (textDisplayRef.current) {
      textDisplayRef.current.scrollTop = 0;
    }
  }, [duration, difficulty]);

  useEffect(() => {
    initTest();
  }, [initTest]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [paragraph]);

  // Track every raw keystroke for accurate accuracy measurement
  useEffect(() => {
    const textarea = inputRef.current;
    if (!textarea) return;

    const handleRawKeystroke = (e) => {
      // Ignore modifier keys, Tab, Enter, Escape, arrows, etc.
      if (e.key === 'Tab' || e.key === 'Escape' || e.key === 'Enter' ||
          e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta' ||
          e.key === 'CapsLock' || e.key.startsWith('Arrow') ||
          e.key === 'Home' || e.key === 'End' || e.key === 'PageUp' || e.key === 'PageDown' ||
          e.key === 'Insert' || e.key === 'Delete' || e.key.startsWith('F')) return;

      // Backspace is not a "typing" keystroke — skip it
      if (e.key === 'Backspace') return;

      // This is a real typing keystroke
      totalKeypressesRef.current++;

      // Check if this keystroke is correct
      const currentInputLength = userInputRef.current.length;
      const expectedChar = paragraphRef.current[currentInputLength];
      if (e.key === expectedChar) {
        correctKeypressesRef.current++;
      }
    };

    textarea.addEventListener('keydown', handleRawKeystroke);
    return () => textarea.removeEventListener('keydown', handleRawKeystroke);
  }, [paragraph]); // Re-attach when paragraph changes

  /* Smooth caret position tracking */
  useEffect(() => {
    if (!textDisplayRef.current) return;
    const currentCharEl = textDisplayRef.current.querySelector('.text-char.current');
    if (currentCharEl) {
      const displayRect = textDisplayRef.current.getBoundingClientRect();
      const charRect = currentCharEl.getBoundingClientRect();
      
      const newLeft = charRect.left - displayRect.left;
      const newTop = charRect.top - displayRect.top + textDisplayRef.current.scrollTop;
      
      setCaretPos({ left: newLeft, top: newTop });
      
      // Auto-scroll when caret goes below 2 lines
      const relativeTop = charRect.top - displayRect.top;
      if (relativeTop > 80) {
        textDisplayRef.current.scrollTop += 45;
      }
    } else if (userInput.length > 0 && userInput.length >= paragraph.length) {
      const lastChar = textDisplayRef.current.querySelector('.text-char:last-child');
      if (lastChar) {
        const displayRect = textDisplayRef.current.getBoundingClientRect();
        const charRect = lastChar.getBoundingClientRect();
        setCaretPos({
          left: charRect.right - displayRect.left,
          top: charRect.top - displayRect.top + textDisplayRef.current.scrollTop,
        });
      }
    }
  }, [userInput, paragraph]);

  useEffect(() => {
    let tabPressed = false;
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        tabPressed = true;
        e.preventDefault();
      }
      if (e.key === 'Enter' && tabPressed) {
        initTest();
        tabPressed = false;
      }
    };
    const handleKeyUp = (e) => {
      if (e.key === 'Tab') {
        tabPressed = false;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [initTest]);

  // Timer Effect — uses refs to avoid stale closures
  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && isRunning) {
      setIsRunning(false);
      // Use refs for guaranteed latest values (no stale closure)
      finishTest(userInputRef.current, 0);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const calculateStats = (input, currentParagraph, currentTimerValue) => {
    // Count correct characters in the CURRENT visible input (for WPM)
    let correctInView = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === currentParagraph[i]) {
            correctInView++;
        }
    }
    
    const timeElapsed = duration - currentTimerValue;
    const timeInMinutes = timeElapsed > 0 ? timeElapsed / 60 : 1/60; 
    
    // WPM uses correct chars in view (standard net WPM formula)
    const currentWpm = timeElapsed > 0 
      ? Math.round((correctInView / 5) / timeInMinutes) 
      : 0;

    // ACCURACY uses raw keystrokes (tracks every mistake, even corrected ones)
    const totalRaw = totalKeypressesRef.current;
    const correctRaw = correctKeypressesRef.current;
    const currentAccuracy = totalRaw > 0 
      ? Math.round((correctRaw / totalRaw) * 100) 
      : 100;

    return { wpm: currentWpm, accuracy: currentAccuracy, correctChars: correctInView, totalCharsEscaped: input.length };
  };

  // Keep stats updating strictly in real-time every second
  useEffect(() => {
    if (isRunning) {
      setStats(calculateStats(userInputRef.current, paragraphRef.current, timer));
    }
  }, [timer]);

  const handleInputChange = (e) => {
    if (timer === 0) return;
    
    if (!isRunning && e.target.value.length === 1) {
      setIsRunning(true);
    }
    
    const val = e.target.value;
    
    // Auto-extend text when approaching the end (within 30 chars)
    let newParagraph = paragraph;
    if (val.length >= paragraph.length - 30) {
      newParagraph = paragraph + ' ' + getTextForDifficulty(difficulty);
      setParagraph(newParagraph);
    }

    if (val.length > newParagraph.length) return;

    setUserInput(val);
    
    // Calculate current word index for highlighting
    const words = newParagraph.substring(0, val.length).split(' ');
    setCurrentWordIndex(words.length - 1);

    const newStats = calculateStats(val, newParagraph, timer);
    setStats(newStats);
  };

  const finishTest = (input, currentTimer) => {
    // Use refs as fallback for guaranteed latest values
    const finalInput = input !== undefined ? input : userInputRef.current;
    const finalTimer = currentTimer !== undefined ? currentTimer : timerRef.current;
    const timeTaken = duration - finalTimer;
    const finalStats = calculateStats(finalInput, paragraphRef.current, finalTimer);
    
    onComplete({
      wpm: finalStats.wpm,
      accuracy: finalStats.accuracy,
      correctCharacters: finalStats.correctChars,
      totalCharacters: finalInput.length,
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

  const difficultyLabel = difficulty === 'easy' ? 'Easy' : difficulty === 'hard' ? 'Hard' : 'Medium';

  return (
    <div className="card animate-fade-in typing-test-card">
      <div className="test-header">
        <div className="stat-box">
          <span className="stat-label">Time Left</span>
          <span className={`stat-value ${timer <= 10 && isRunning ? 'timer-warning' : ''}`}>{timer}s</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Live WPM</span>
          <span className="stat-value">{stats.wpm}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Accuracy</span>
          <span className="stat-value">{stats.accuracy}%</span>
        </div>
        <div className="stat-box difficulty-badge-box">
          <span className="stat-label">Mode</span>
          <span className={`difficulty-badge ${difficulty}`}>{difficultyLabel}</span>
        </div>
      </div>

      <div 
        className="text-display" 
        ref={textDisplayRef}
        onClick={() => inputRef.current && inputRef.current.focus()}
      >
        {/* Smooth animated caret */}
        <div 
          className={`smooth-caret ${!isRunning && userInput.length === 0 ? 'blink' : ''}`}
          style={{ 
            transform: `translate(${caretPos.left}px, ${caretPos.top}px)`,
          }}
        />
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
