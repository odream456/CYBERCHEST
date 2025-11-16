// src/components/UI/Card.jsx
import React from 'react';

const Card = ({ children, className = '', glow = false, ...props }) => {
  return (
    <div 
      className={`
        bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10
        transition-all duration-300 hover:border-white/20
        ${glow ? 'shadow-glow-soft' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;