// src/components/Chest.jsx
import React, { useState } from 'react';
import { Star, Bomb, Lock } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

const Chest = ({ content, isRevealed, onClick, disabled }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { activeTheme } = useGame();

  const handleClick = () => {
    if (disabled || isRevealed) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onClick();
    }, 300);
  };

  const getChestStyle = () => {
    const baseStyle = "relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl border-2 transition-all duration-500 transform flex items-center justify-center font-bold text-sm backdrop-blur-sm";
    
    if (!isRevealed) {
      switch (activeTheme) {
        case 'neon-skin':
          return `${baseStyle} bg-gradient-to-br from-purple-500 to-cyan-400 border-cyan-300 shadow-lg hover:shadow-cyan-500/50 hover:border-cyan-200`;
        case 'cyber-skin':
          return `${baseStyle} bg-gradient-to-br from-blue-500 to-purple-600 border-purple-400 shadow-lg hover:shadow-purple-500/50 hover:border-purple-300`;
        default:
          return `${baseStyle} bg-gradient-to-br from-amber-400 to-amber-600 border-amber-300 shadow-lg hover:shadow-amber-500/50 hover:border-amber-200`;
      }
    }
    
    // Revealed chest styles
    switch (content) {
      case 'star':
        return `${baseStyle} bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border-yellow-400/50 shadow-glow-yellow`;
      case 'bomb':
        return `${baseStyle} bg-gradient-to-br from-red-400/20 to-red-600/20 border-red-400/50 shadow-glow-red`;
      default:
        return `${baseStyle} bg-white/10 border-white/20`;
    }
  };

  const getChestContent = () => {
    if (!isRevealed) return null;
    
    switch (content) {
      case 'star':
        return <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />;
      case 'bomb':
        return <Bomb className="w-6 h-6 text-red-400" />;
      case 'empty':
        return <div className="w-4 h-4 bg-white/20 rounded-full" />;
      default:
        return null;
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isRevealed}
      className={`
        ${getChestStyle()}
        ${isAnimating ? 'scale-110 rotate-5' : 'hover:scale-105'}
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      `}
    >
      {/* Chest latch - only show on unrevealed chests */}
      {!isRevealed && (
        <div className={`absolute top-2 w-6 h-1 rounded-full ${
          activeTheme === 'neon-skin' ? 'bg-cyan-700' : 
          activeTheme === 'cyber-skin' ? 'bg-purple-700' : 
          'bg-amber-700'
        }`} />
      )}
      
      {/* Content */}
      {getChestContent()}
      
      {/* Lock icon when disabled */}
      {disabled && !isRevealed && (
        <Lock className="w-4 h-4 text-white/50 absolute bottom-1 right-1" />
      )}
    </button>
  );
};

export default Chest;