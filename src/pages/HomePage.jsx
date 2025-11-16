// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Zap, Trophy, Star, Coins } from 'lucide-react';

const HomePage = () => {
  const { coins, history } = useGame();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="relative">
          <h1 className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse-slow font-cyber">
            CYBERCHEST
          </h1>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 blur-2xl -z-10" />
        </div>
        
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Every chest hides a secret. Some shine, some explode. Choose wisely.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link to="/play">
            <Button className="text-lg px-8 py-4">
              <Zap className="w-5 h-5 mr-2" />
              START GAME
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="secondary" className="text-lg px-8 py-4">
              <Coins className="w-5 h-5 mr-2" />
              SHOP {coins > 0 && `(${coins})`}
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card glow className="p-6 text-center">
          <Coins className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white">{coins}</div>
          <div className="text-cyan-300">COSMIC COINS</div>
        </Card>

        <Card glow className="p-6 text-center">
          <Trophy className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white">
            {history.filter(h => h.result === 'win').length} 
          </div>
          <div className="text-cyan-300">VICTORIES</div>
        </Card>

        <Card glow className="p-6 text-center">
          <Star className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white">{history.length}</div>
          <div className="text-cyan-300">MISSIONS</div>
        </Card>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-bold text-cyan-300 mb-4">🎮 HOW TO PLAY</h3>
          <ul className="space-y-3 text-white/80">
            <li>• Choose your difficulty level (10-100 chests)</li>
            <li>• Find all hidden stars to win the mission</li>
            <li>• Avoid bomb chests at all costs</li>
            <li>• Earn coins based on difficulty</li>
            <li>• Spend coins in the cosmic shop</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold text-purple-300 mb-4">⚡ RECENT MISSIONS</h3>
          <div className="space-y-2">
            {history.slice(0, 3).map((mission) => (
              <div key={mission.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <span className="font-semibold">Level {mission.level}</span>
                  <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                    mission.result === 'win' 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {mission.result.toUpperCase()}
                  </span>
                </div>
                <div className="text-cyan-300">+{mission.coins} coins</div>
              </div>
            ))}
            {history.length === 0 && (
              <div className="text-center text-white/50 py-4">
                No missions yet. Start playing!
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;