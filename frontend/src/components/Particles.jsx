import React from 'react';
import './Particles.css';

const Particles = () => {
  // Generate a fixed number of random particles on mount
  const particles = React.useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1 + 'px',
      left: Math.random() * 100 + 'vw',
      top: Math.random() * 100 + 'vh',
      animationDuration: Math.random() * 25 + 20 + 's',
      animationDelay: -Math.random() * 40 + 's',
      opacity: Math.random() * 0.3 + 0.1
    }));
  }, []);

  return (
    <div className="particles-container">
      {particles.map(p => (
        <div 
          key={p.id} 
          className="particle" 
          style={{
            width: p.size, 
            height: p.size, 
            left: p.left, 
            top: p.top, 
            animationDuration: p.animationDuration, 
            animationDelay: p.animationDelay,
            opacity: p.opacity
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
