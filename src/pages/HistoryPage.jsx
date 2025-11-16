// src/pages/HistoryPage.jsx
import React from 'react';
import { useGame } from '../contexts/GameContext';
import Card from '../components/UI/Card';
import { Trophy, Skull, Calendar, Coins } from 'lucide-react';

const HistoryPage = () => {
  const { history } = useGame();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          MISSION LOG
        </h1>
        <p className="text-white/70 mt-2">Record of your cosmic adventures</p>
      </div>

      <Card className="p-6">
        {history.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌌</div>
            <h3 className="text-xl font-bold text-white mb-2">No Missions Yet</h3>
            <p className="text-white/70">Start playing to see your mission history here!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((mission) => (
              <div
                key={mission.id}
                className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    mission.result === 'win' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {mission.result === 'win' ? <Trophy className="w-6 h-6" /> : <Skull className="w-6 h-6" />}
                  </div>
                  
                  <div>
                    <div className="font-semibold text-white">Level {mission.level} Mission</div>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Calendar className="w-4 h-4" />
                      {mission.timestamp}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    mission.result === 'win' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {mission.result.toUpperCase()}
                  </div>
                  {mission.coins > 0 && (
                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                      <Coins className="w-4 h-4" />
                      +{mission.coins}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Statistics */}
      {history.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{history.length}</div>
            <div className="text-cyan-300 text-sm">TOTAL MISSIONS</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {history.filter(h => h.result === 'win').length}
            </div>
            <div className="text-cyan-300 text-sm">VICTORIES</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {history.reduce((total, h) => total + h.coins, 0)}
            </div>
            <div className="text-cyan-300 text-sm">TOTAL COINS</div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;