import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiUrl}/api/results/top`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setLeaders(data);
      } catch (err) {
        console.error(err);
        setError('Could not load leaderboard. Backend might be down.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="card animate-fade-in leaderboard-card">
      <h2 className="card-title">Top 5 Leaderboard</h2>
      <p className="card-subtitle">Fastest typists globally</p>

      <div className="leaderboard-content">
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : error ? (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        ) : leaders.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">👻</span>
            <p>No results yet. Be the first!</p>
          </div>
        ) : (
          <div className="leader-list">
            <div className="leader-header">
              <span>Rank</span>
              <span>Name</span>
              <span>WPM</span>
              <span>Acc</span>
              <span>Date</span>
            </div>
            
            {leaders.map((leader, index) => (
              <div 
                key={leader.id} 
                className={`leader-row animate-fade-in delay-${index}`}
              >
                <div className="rank">
                  {index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </div>
                <div className="name">{leader.username}</div>
                <div className="wpm-highlight">{leader.wpm}</div>
                <div className="acc">{leader.accuracy}%</div>
                <div className="date">
                  {new Date(leader.testDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
