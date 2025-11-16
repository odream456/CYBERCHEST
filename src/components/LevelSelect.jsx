// src/components/LevelSelect.jsx
import React from 'react';
import Card from './UI/Card';
import Button from './UI/Button';

const LevelSelect = ({ selectedLevel, onLevelChange, onStartGame }) => {
  const levels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <Card glow className="p-8 max-w-2xl mx-auto">
      <div className="text-center space-y-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            SELECT DIFFICULTY
          </h2>
          <p className="text-white/70">Choose your challenge level</p>
        </div>

        {/* Level Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => onLevelChange(level)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                ${selectedLevel === level
                  ? 'border-cyan-400 bg-cyan-400/20 shadow-glow scale-105'
                  : 'border-white/20 bg-white/5 hover:border-cyan-400/50'
                }
              `}
            >
              <div className="text-2xl font-bold text-white">{level}</div>
              <div className="text-xs text-white/60 mt-1">CHESTS</div>
              <div className="text-xs text-cyan-300 mt-1">{level * 10} COINS</div>
            </button>
          ))}
        </div>

        {/* Start Button */}
        <Button
          onClick={onStartGame}
          className="w-full max-w-xs mx-auto text-lg py-4"
        >
          START MISSION
        </Button>

        {/* Game Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
          <div className="text-center">
            <div className="text-yellow-400 font-semibold">★ STARS</div>
            <div className="text-white/70 text-sm">Find all to win</div>
          </div>
          <div className="text-center">
            <div className="text-red-400 font-semibold">💣 BOMBS</div>
            <div className="text-white/70 text-sm">Avoid at all costs</div>
          </div>
          <div className="text-center">
            <div className="text-cyan-400 font-semibold">🎯 REWARD</div>
            <div className="text-white/70 text-sm">Level × 10 coins</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LevelSelect;