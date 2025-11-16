// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Zap, Trophy, Star, Coins, Sparkles, ChevronDown } from 'lucide-react';

const HomePage = () => {
  const { coins, history } = useGame();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1f] via-purple-900/30 to-cyan-900/20">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
        
        {/* Pulse Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '6s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        
        {/* Hero Section - Cinematic Entrance */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center space-y-12">
          
          {/* Main Title with Staggered Animation */}
          <div className={`space-y-6 transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            
            {/* Cyber Text Effect */}
            <div className="relative">
              <h1 className="text-8xl lg:text-9xl font-black bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-tighter leading-none">
                CYBERCHEST
              </h1>
              
              {/* Multi-layer Glow */}
              <div className="absolute inset-0 text-8xl lg:text-9xl font-black bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 blur-2xl opacity-30 -z-10 animate-pulse"></div>
              <div className="absolute inset-0 text-8xl lg:text-9xl font-black bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 blur-xl opacity-20 -z-20"></div>
              
              {/* Scanning Line Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent opacity-0 animate-scan" style={{animationDelay: '2s'}}></div>
            </div>

            {/* Subtitle with Typewriter Effect */}
            <div className={`transform transition-all duration-1000 delay-500 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <p className="text-2xl lg:text-3xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed">
                Every chest hides a secret.{' '}
                <span className="text-cyan-300 font-semibold animate-pulse">Some shine</span>,{' '}
                <span className="text-red-300 font-semibold animate-pulse" style={{animationDelay: '1s'}}>some explode</span>.
                <br />
                <span className="text-purple-300 font-semibold">Choose wisely</span>.
              </p>
            </div>
          </div>

          {/* CTA Buttons with Staggered Entrance */}
          <div className={`flex flex-col sm:flex-row gap-6 transform transition-all duration-1000 delay-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            
            {/* Start Game Button */}
            <Link to="/play" className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
              <Button className="text-lg px-12 py-6 relative overflow-hidden border-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 group-hover:from-purple-500 group-hover:to-cyan-400 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <div className="relative flex items-center gap-3">
                  <Zap className="w-6 h-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-bold tracking-widest text-lg">START GAME</span>
                </div>
              </Button>
            </Link>
            
            {/* Shop Button */}
            <Link to="/shop" className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-all duration-300"></div>
              <Button variant="secondary" className="text-lg px-12 py-6 relative overflow-hidden border-2 border-white/30">
                <div className="relative flex items-center gap-3">
                  <Coins className="w-6 h-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-bold tracking-widest text-lg">
                    SHOP {coins > 0 && `(${coins})`}
                  </span>
                  {coins > 0 && (
                    <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-ping" />
                  )}
                </div>
              </Button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className={`transform transition-all duration-1000 delay-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="flex flex-col items-center gap-2 text-white/50 animate-bounce">
              <span className="text-sm tracking-widest">EXPLORE</span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* Stats Section - Appears on Scroll */}
        <section className="min-h-screen flex flex-col justify-center space-y-16 py-20">
          
          {/* Stats Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transform transition-all duration-1000 delay-200 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            
            {/* Coins Card */}
            <Card glow className="p-8 text-center group relative overflow-hidden border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <Coins className="w-20 h-20 text-yellow-400 mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
              <div className="text-5xl font-black text-white mb-4 bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                {coins}
              </div>
              <div className="text-cyan-300 font-semibold tracking-widest text-lg">COSMIC COINS</div>
            </Card>

            {/* Victories Card */}
            <Card glow className="p-8 text-center group relative overflow-hidden border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <Trophy className="w-20 h-20 text-purple-400 mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
              <div className="text-5xl font-black text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {history.filter(h => h.result === 'win').length}
              </div>
              <div className="text-cyan-300 font-semibold tracking-widest text-lg">VICTORIES</div>
            </Card>

            {/* Missions Card */}
            <Card glow className="p-8 text-center group relative overflow-hidden border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <Star className="w-20 h-20 text-cyan-400 mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 fill-cyan-400/20" />
              <div className="text-5xl font-black text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {history.length}
              </div>
              <div className="text-cyan-300 font-semibold tracking-widest text-lg">MISSIONS</div>
            </Card>
          </div>

          {/* Features Grid */}
          <div className={`grid grid-cols-1 xl:grid-cols-2 gap-10 transform transition-all duration-1000 delay-400 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            
            {/* How to Play */}
            <Card className="p-8 group relative overflow-hidden border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              <h3 className="text-3xl font-bold text-cyan-300 mb-8 flex items-center gap-4">
                <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                  🎮
                </div>
                HOW TO PLAY
              </h3>
              
              <ul className="space-y-4 text-white/80 text-lg">
                {[
                  "Choose your difficulty level (10-100 chests)",
                  "Find all hidden stars to win the mission",
                  "Avoid bomb chests at all costs",
                  "Earn coins based on difficulty",
                  "Spend coins in the cosmic shop"
                ].map((item, index) => (
                  <li 
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group/item border border-white/10 hover:border-cyan-400/30"
                  >
                    <div className="w-3 h-3 bg-cyan-400 rounded-full group-hover/item:scale-150 transition-transform duration-300 shadow-lg shadow-cyan-400/50"></div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Recent Missions */}
            <Card className="p-8 group relative overflow-hidden border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              <h3 className="text-3xl font-bold text-purple-300 mb-8 flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-400/30 group-hover:scale-110 transition-transform duration-300">
                  ⚡
                </div>
                RECENT MISSIONS
              </h3>
              
              <div className="space-y-4">
                {history.slice(0, 3).map((mission, index) => (
                  <div 
                    key={mission.id} 
                    className="flex justify-between items-center p-5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group/item border border-white/10 hover:border-cyan-400/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${
                        mission.result === 'win' ? 'bg-green-400' : 'bg-red-400'
                      } group-hover/item:scale-150 transition-transform duration-300 shadow-lg ${
                        mission.result === 'win' ? 'shadow-green-400/50' : 'shadow-red-400/50'
                      }`}></div>
                      <div>
                        <span className="font-semibold text-white text-lg">Level {mission.level}</span>
                        <span className={`ml-3 text-sm px-3 py-1 rounded-full border font-semibold ${
                          mission.result === 'win' 
                            ? 'bg-green-500/20 text-green-300 border-green-400/30' 
                            : 'bg-red-500/20 text-red-300 border-red-400/30'
                        }`}>
                          {mission.result.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="text-yellow-400 font-bold text-lg flex items-center gap-2">
                      <Coins className="w-5 h-5" />
                      +{mission.coins}
                    </div>
                  </div>
                ))}
                {history.length === 0 && (
                  <div className="text-center py-12 text-white/50 border-2 border-dashed border-white/10 rounded-xl">
                    <div className="text-5xl mb-4">🌌</div>
                    <div className="font-semibold text-xl mb-2">No missions yet</div>
                    <div className="text-sm">Start your first cosmic adventure!</div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;