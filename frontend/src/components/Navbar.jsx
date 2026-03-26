import React, { useRef, useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = ({ navigate, currentScreen, isHidden }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const linksRef = useRef([]);

  useEffect(() => {
    // Find the active link based on currentScreen
    const activeIndex = currentScreen === 'leaderboard' ? 1 : 0;
    const activeNode = linksRef.current[activeIndex];

    if (activeNode) {
      setIndicatorStyle({
        width: `${activeNode.offsetWidth}px`,
        transform: `translateX(${activeNode.offsetLeft}px)`
      });
    }
  }, [currentScreen]);

  return (
    <nav className={`nav-container ${isHidden ? 'hidden' : ''}`}>
      <div className="nav-content">
        <div className="nav-links">
          <div className="nav-indicator" style={indicatorStyle} />
          
          <button 
            ref={el => linksRef.current[0] = el}
            className={`nav-link ${currentScreen === 'home' ? 'active' : ''}`}
            onClick={() => navigate('home')}
          >
            Home
          </button>
          <button 
            ref={el => linksRef.current[1] = el}
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
