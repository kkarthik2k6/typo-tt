import React, { useState, useEffect } from 'react';
import './ResultScreen.css';

const useCountUp = (end, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing out function
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
};

const ResultScreen = ({ result, navigate }) => {
  const [username, setUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const animatedWpm = useCountUp(result.wpm);
  const animatedAccuracy = useCountUp(result.accuracy);
  const animatedChars = useCountUp(result.correctCharacters);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsSaving(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...result,
          username: username.trim(),
        }),
      });

      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => {
          navigate('leaderboard');
        }, 1500);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving result:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="card animate-fade-in result-card">
      <h2 className="card-title">Test Complete!</h2>
      <p className="card-subtitle">Here are your final statistics</p>

      <div className="stats-grid">
        <div className="stat-circle primary">
          <span className="sc-value">{animatedWpm}</span>
          <span className="sc-label">WPM</span>
        </div>
        <div className="stat-circle secondary">
          <span className="sc-value">{animatedAccuracy}%</span>
          <span className="sc-label">Accuracy</span>
        </div>
        <div className="stat-circle tertiary">
          <span className="sc-value">{animatedChars}</span>
          <span className="sc-label">Chars</span>
        </div>
      </div>

      <div className="actions-section">
        <form onSubmit={handleSave} className="save-form">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isSaving || saveStatus === 'success'}
            maxLength={20}
            required
            className="name-input"
          />
          <button 
            type="submit" 
            disabled={isSaving || saveStatus === 'success' || !username.trim()}
            className={`save-btn ${saveStatus === 'success' ? 'success' : ''}`}
          >
            {isSaving ? 'Saving...' : saveStatus === 'success' ? 'Saved! ✓' : 'Save Result'}
          </button>
        </form>
        
        {saveStatus === 'error' && (
          <p className="error-text">Failed to save result. Please try again.</p>
        )}

        <div className="secondary-actions">
          <button className="outline-btn" onClick={() => navigate('test')}>
            Try Again
          </button>
          <button className="text-btn" onClick={() => navigate('home')}>
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
