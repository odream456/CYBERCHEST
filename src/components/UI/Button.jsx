// src/components/UI/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled, 
  ...props 
}) => {
  const baseStyles = `
    px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform
    border backdrop-blur-xl disabled:opacity-50 disabled:cursor-not-allowed
    hover:scale-105 active:scale-95
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-purple-600 to-cyan-500 border-transparent
      hover:shadow-glow hover:from-purple-500 hover:to-cyan-400
    `,
    secondary: `
      bg-white/10 border-white/20 text-white
      hover:bg-white/20 hover:border-cyan-400/50 hover:shadow-glow-soft
    `,
    danger: `
      bg-red-500/20 border-red-400/50 text-red-100
      hover:bg-red-500/30 hover:border-red-300 hover:shadow-glow-red
    `
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;