import React from 'react';
import './HomePage.css';

const HomePage = ({ navigate, testDuration, setTestDuration, difficulty, setDifficulty }) => {
  const durations = [15, 30, 60, 120];
  const difficulties = [
    { key: 'easy', label: 'Easy', desc: 'Common words' },
    { key: 'medium', label: 'Medium', desc: 'Paragraphs' },
    { key: 'hard', label: 'Hard', desc: 'Code snippets' },
  ];

  return (
    <div className="card animate-fade-in homepage-card">
      <p className="card-subtitle">
        Master your typing speed and climb the global ranks.
      </p>
      
      <div className="selectors-row">
        <div className="selector-group">
          <span className="selector-label">Duration:</span>
          <div className="selector-options">
            {durations.map(dur => (
              <button
                key={dur}
                className={`selector-btn ${testDuration === dur ? 'active' : ''}`}
                onClick={() => setTestDuration(dur)}
              >
                {dur}s
              </button>
            ))}
          </div>
        </div>

        <div className="selector-group">
          <span className="selector-label">Difficulty:</span>
          <div className="selector-options">
            {difficulties.map(d => (
              <button
                key={d.key}
                className={`selector-btn diff-btn ${d.key} ${difficulty === d.key ? 'active' : ''}`}
                onClick={() => setDifficulty(d.key)}
                title={d.desc}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="features-grid">
        <span className="feature-item">Live WPM Tracking</span>
        <span className="feature-item">Real-time Accuracy</span>
        <span className="feature-item">Global Leaderboard</span>
      </div>

      <button className="start-btn" onClick={() => navigate('test')}>
        Start Test
      </button>
    </div>
  );
};

export default HomePage;
