// src/components/HistoryGameView.jsx
import React from 'react';
import { useGame } from '../contexts/GameContext';
import Card from './UI/Card';
import Button from './UI/Button';
import Chest from './Chest';
import { X, Trophy, Skull, Star, Bomb, Calendar, Coins } from 'lucide-react';

const HistoryGameView = () => {
  const { viewingHistoryGame, closeHistoryView } = useGame();

  if (!viewingHistoryGame) return null;

  const { level, result, coins, timestamp, chests, starsFound, totalStars } = viewingHistoryGame;

  const gridCols = level <= 16 ? 'grid-cols-4' : 
                   level <= 25 ? 'grid-cols-5' : 
                   level <= 36 ? 'grid-cols-6' : 'grid-cols-8';

  const getHighlightedChests = () => {
    if (result === 'win') {
      // Highlight all stars in won games
      return chests.filter(chest => chest.content === 'star');
    } else {
      // Highlight bombs in lost games
      return chests.filter(chest => chest.content === 'bomb' && chest.isRevealed);
    }
  };

  const highlightedChests = getHighlightedChests();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <Card glow className="p-6 relative">
          {/* Close Button */}
          <button
            onClick={closeHistoryView}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 border border-white/20 text-white/70 hover:text-white hover:border-cyan-400/50 transition-all duration-300 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              MISSION REPLAY
            </h2>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-sm ${
                result === 'win' 
                  ? 'bg-green-500/20 border-green-400/50 text-green-400' 
                  : 'bg-red-500/20 border-red-400/50 text-red-400'
              }`}>
                {result === 'win' ? <Trophy className="w-5 h-5" /> : <Skull className="w-5 h-5" />}
                <span className="font-semibold">{result === 'win' ? 'VICTORY' : 'DEFEAT'}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white">
                <span className="text-cyan-300">Level:</span>
                <span className="font-bold">{level}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white">
                <Calendar className="w-4 h-4 text-cyan-300" />
                <span>{timestamp}</span>
              </div>
            </div>
          </div>

          {/* Result Banner */}
          <div className={`text-center p-4 rounded-xl mb-6 border backdrop-blur-sm ${
            result === 'win'
              ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
              : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
          }`}>
            <div className="text-2xl font-bold text-white mb-2">
              {result === 'win' ? '🎉 Mission Accomplished!' : '💥 Mission Failed!'}
            </div>
            <p className="text-white/80">
              {result === 'win' 
                ? `You found all ${totalStars} stars and earned ${coins} cosmic coins!`
                : 'A bomb chest ended your mission.'
              }
            </p>
            {coins > 0 && (
              <div className="flex items-center justify-center gap-2 text-yellow-400 text-lg font-bold mt-2">
                <Coins className="w-5 h-5" />
                +{coins} COINS EARNED
              </div>
            )}
          </div>

          {/* Game Board */}
          <Card className="p-6 mb-6">
            <div className="flex justify-center gap-8 text-center mb-6">
              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                <div className="text-cyan-300 text-sm">Stars Found</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {starsFound}<span className="text-white/50">/{totalStars}</span>
                </div>
              </div>
              
              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                <div className="text-cyan-300 text-sm">Chests Opened</div>
                <div className="text-2xl font-bold text-white">
                  {chests.filter(c => c.isRevealed).length}<span className="text-white/50">/{level}</span>
                </div>
              </div>
            </div>

            <div className={`grid ${gridCols} gap-3 justify-center max-w-4xl mx-auto`}>
              {chests.map((chest, index) => (
                <div key={index} className="relative">
                  <Chest
                    content={chest.content}
                    isRevealed={chest.isRevealed}
                    onClick={() => {}} // Disabled for history view
                    disabled={true}
                  />
                  {/* Highlight effect for important chests */}
                  {highlightedChests.includes(chest) && (
                    <div className={`absolute inset-0 rounded-xl border-2 animate-pulse ${
                      chest.content === 'star' 
                        ? 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]' 
                        : 'border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.6)]'
                    } pointer-events-none`} />
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Legend */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-yellow-500/10 border border-yellow-400/30">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white">Star Chests</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-400/30">
              <Bomb className="w-5 h-5 text-red-400" />
              <span className="text-white">Bomb Chests</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-cyan-500/10 border border-cyan-400/30">
              <div className="w-5 h-5 bg-white/20 rounded-full"></div>
              <span className="text-white">Empty Chests</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Button onClick={closeHistoryView} variant="primary">
              Back to History
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HistoryGameView;