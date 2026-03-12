import React from 'react';
import './HomePage.css';

const HomePage = ({ navigate, testDuration, setTestDuration }) => {
  const durations = [15, 30, 60, 120];

  return (
    <div className="card animate-fade-in homepage-card">
      <div className="icon-wrapper">
        <span className="huge-icon">⌨️</span>
      </div>
      <h1 className="card-title">Typo</h1>
      <p className="card-subtitle">
        Test your typing skills, track your progress, and compete on the leaderboard.
      </p>
      
      <div className="timer-selector">
        <span className="timer-label">Test Duration:</span>
        <div className="timer-options">
          {durations.map(duration => (
            <button
              key={duration}
              className={`timer-btn ${testDuration === duration ? 'active' : ''}`}
              onClick={() => setTestDuration(duration)}
            >
              {duration}s
            </button>
          ))}
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-item">
          <span className="feature-icon">⏱️</span>
          <span>60 Second Timer</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🎯</span>
          <span>Live Accuracy</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🏆</span>
          <span>Global Leaderboard</span>
        </div>
      </div>

      <button className="start-btn" onClick={() => navigate('test')}>
        Start Typing Test
      </button>
    </div>
  );
};

export default HomePage;
