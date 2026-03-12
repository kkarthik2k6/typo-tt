import React from 'react';
import './Navbar.css';

const Navbar = ({ navigate, currentScreen }) => {
  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="nav-brand" onClick={() => navigate('home')}>
          <span className="brand-icon">⌨️</span>
          <span className="brand-text">Typo</span>
        </div>
        <div className="nav-links">
          <button 
            className={`nav-link ${currentScreen === 'home' ? 'active' : ''}`}
            onClick={() => navigate('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${currentScreen === 'leaderboard' ? 'active' : ''}`}
            onClick={() => navigate('leaderboard')}
          >
            Leaderboard
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
