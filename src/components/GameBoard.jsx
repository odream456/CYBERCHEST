// src/components/GameBoard.jsx
import React from 'react';
import Chest from './Chest';
import Card from './UI/Card';

const GameBoard = ({ chests, onChestClick, gameStatus, starsFound, totalStars }) => {
  const gridCols = chests.length <= 16 ? 'grid-cols-4' : 
                   chests.length <= 25 ? 'grid-cols-5' : 
                   chests.length <= 36 ? 'grid-cols-6' : 'grid-cols-8';

  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <div className="flex justify-center gap-8 text-center">
        <Card className="px-6 py-3 min-w-[120px]">
          <div className="text-cyan-300 text-sm">Stars Found</div>
          <div className="text-2xl font-bold text-yellow-400">
            {starsFound}<span className="text-white/50">/{totalStars}</span>
          </div>
        </Card>
        
        <Card className="px-6 py-3 min-w-[120px]">
          <div className="text-cyan-300 text-sm">Status</div>
          <div className={`text-lg font-semibold ${
            gameStatus === 'playing' ? 'text-green-400' : 
            gameStatus === 'lost' ? 'text-red-400' : 
            'text-cyan-400'
          }`}>
            {gameStatus.toUpperCase()}
          </div>
        </Card>
      </div>

      {/* Chests Grid */}
      <Card glow className="p-6">
        <div className={`grid ${gridCols} gap-4 justify-center max-w-4xl mx-auto`}>
          {chests.map((chest, index) => (
            <Chest
              key={index}
              content={chest.content}
              isRevealed={chest.isRevealed}
              onClick={() => onChestClick(index)}
              disabled={gameStatus !== 'playing'}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default GameBoard;