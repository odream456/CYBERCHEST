// src/pages/GamePage.jsx
import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import LevelSelect from '../components/LevelSelect';
import GameBoard from '../components/GameBoard';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { Play, RotateCcw, Home, Shield, Scan, Bomb, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const GamePage = () => {
  const { 
    level, 
    setLevel, 
    addCoins, 
    addHistory, 
    inventory, 
    currentLives,
    useExtraLife,
    useStarScanner,
    useBombDefuser,
    resetGameState
  } = useGame();
  
  const [gameState, setGameState] = useState('selecting');
  const [chests, setChests] = useState([]);
  const [starsFound, setStarsFound] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [usedExtraLife, setUsedExtraLife] = useState(false);

  useEffect(() => {
    resetGameState();
  }, []);

  const initializeGame = () => {
    const newChests = Array(level).fill().map(() => ({ content: 'empty', isRevealed: false }));
    
    const starIndex = Math.floor(Math.random() * level);
    const bombIndex = (starIndex + 1 + Math.floor(Math.random() * (level - 1))) % level;
    
    newChests[starIndex].content = 'star';
    newChests[bombIndex].content = 'bomb';

    for (let i = 0; i < level; i++) {
      if (newChests[i].content !== 'empty') continue;
      
      const rand = Math.random();
      if (rand < 0.2) newChests[i].content = 'star';
      else if (rand < 0.35) newChests[i].content = 'bomb';
    }

    const starCount = newChests.filter(c => c.content === 'star').length;
    const bombCount = newChests.filter(c => c.content === 'bomb').length;

    if (starCount === 0) newChests[Math.floor(Math.random() * level)].content = 'star';
    if (bombCount === 0) {
      let emptyIndex;
      do {
        emptyIndex = Math.floor(Math.random() * level);
      } while (newChests[emptyIndex].content === 'star');
      newChests[emptyIndex].content = 'bomb';
    }

    const finalStarCount = newChests.filter(c => c.content === 'star').length;
    
    setChests(newChests);
    setStarsFound(0);
    setTotalStars(finalStarCount);
    setGameState('playing');
    setUsedExtraLife(false);
    resetGameState();
  };

  const handleChestClick = (index) => {
    if (gameState !== 'playing' || chests[index].isRevealed) return;

    const newChests = [...chests];
    newChests[index].isRevealed = true;
    setChests(newChests);

    const content = newChests[index].content;

    if (content === 'bomb') {
      if (currentLives > 1 || (inventory.extraLives > 0 && !usedExtraLife)) {
        // Use extra life
        if (useExtraLife()) {
          setUsedExtraLife(true);
          // Mark bomb as defused
          newChests[index].content = 'empty';
          setChests(newChests);
          return;
        }
      } else {
        setGameState('lost');
        // Save chest data to history
        addHistory('lost', chests, starsFound, totalStars);
      }
    } else if (content === 'star') {
      const newStarsFound = starsFound + 1;
      setStarsFound(newStarsFound);

      if (newStarsFound === totalStars) {
        setGameState('won');
        const reward = level * 10;
        // Apply golden chest bonus if available
        const finalReward = inventory.goldenChests > 0 ? reward * 2 : reward;
        addCoins(finalReward);
        // Save chest data to history
        addHistory('win', chests, newStarsFound, totalStars);
      }
    }
  };

  const handleUseScanner = () => {
    if (useStarScanner()) {
      // Find a random unrevealed star and reveal it
      const unrevealedStars = chests
        .map((chest, index) => ({ chest, index }))
        .filter(({ chest }) => chest.content === 'star' && !chest.isRevealed);
      
      if (unrevealedStars.length > 0) {
        const randomStar = unrevealedStars[Math.floor(Math.random() * unrevealedStars.length)];
        const newChests = [...chests];
        newChests[randomStar.index].isRevealed = true;
        setChests(newChests);
        
        const newStarsFound = starsFound + 1;
        setStarsFound(newStarsFound);

        if (newStarsFound === totalStars) {
          setGameState('won');
          const reward = level * 10;
          const finalReward = inventory.goldenChests > 0 ? reward * 2 : reward;
          addCoins(finalReward);
          // Save chest data to history
          addHistory('win', chests, newStarsFound, totalStars);
        }
      }
    }
  };

  const resetGame = () => {
    setGameState('selecting');
    setChests([]);
    resetGameState();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          COSMIC CHESTS
        </h1>
        <p className="text-white/70 mt-2">Risk it all for cosmic rewards</p>
      </div>

      {gameState === 'selecting' && (
        <LevelSelect
          selectedLevel={level}
          onLevelChange={setLevel}
          onStartGame={initializeGame}
        />
      )}

      {(gameState === 'playing' || gameState === 'won' || gameState === 'lost') && (
        <div className="space-y-6">
          {/* Game Stats & Inventory */}
          <div className="flex flex-col items-center gap-4">
            {/* Lives Display */}
            <div className="flex items-center gap-2">
              {[...Array(currentLives)].map((_, i) => (
                <Heart key={i} className="w-6 h-6 text-red-400 fill-red-400" />
              ))}
              {usedExtraLife && (
                <Shield className="w-6 h-6 text-green-400" />
              )}
            </div>

            {/* Inventory during gameplay */}
            {gameState === 'playing' && (
              <div className="flex justify-center gap-4 flex-wrap">
                {inventory.extraLives > 0 && !usedExtraLife && (
                  <Card className="px-4 py-2 bg-green-500/20 border-green-400/50">
                    <div className="flex items-center gap-2 text-green-400">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">Extra Life Available</span>
                    </div>
                  </Card>
                )}
                {inventory.starScanners > 0 && (
                  <Button 
                    variant="secondary" 
                    onClick={handleUseScanner}
                    className="flex items-center gap-2 py-2"
                  >
                    <Scan className="w-4 h-4" />
                    Use Scanner ({inventory.starScanners})
                  </Button>
                )}
                {inventory.bombDefusers > 0 && (
                  <Card className="px-4 py-2 bg-yellow-500/20 border-yellow-400/50">
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Bomb className="w-4 h-4" />
                      <span className="text-sm">Defusers: {inventory.bombDefusers}</span>
                    </div>
                  </Card>
                )}
                {inventory.goldenChests > 0 && (
                  <Card className="px-4 py-2 bg-amber-500/20 border-amber-400/50">
                    <div className="flex items-center gap-2 text-amber-400">
                      <Scan className="w-4 h-4" />
                      <span className="text-sm">2x Coins Active!</span>
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>

          <GameBoard
            chests={chests}
            onChestClick={handleChestClick}
            gameStatus={gameState}
            starsFound={starsFound}
            totalStars={totalStars}
          />

          {/* Game Over Modal */}
          {(gameState === 'won' || gameState === 'lost') && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
              <Card glow className="p-8 max-w-md mx-4 text-center">
                <div className={`text-6xl mb-4 ${
                  gameState === 'won' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {gameState === 'won' ? '🎉' : '💥'}
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2">
                  {gameState === 'won' ? 'MISSION ACCOMPLISHED!' : 'MISSION FAILED!'}
                </h2>
                
                <p className="text-white/70 mb-2">
                  {gameState === 'won' 
                    ? `You found all ${totalStars} stars and earned ${level * 10 * (inventory.goldenChests > 0 ? 2 : 1)} cosmic coins!`
                    : usedExtraLife 
                      ? 'Your extra life saved you once, but luck ran out!'
                      : 'A bomb chest ended your mission. Better luck next time!'
                  }
                </p>

                {gameState === 'won' && (
                  <div className="text-2xl font-bold text-yellow-400 my-4">
                    +{level * 10 * (inventory.goldenChests > 0 ? 2 : 1)} COINS
                    {inventory.goldenChests > 0 && (
                      <div className="text-sm text-amber-400">(Golden Chest Bonus!)</div>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Button onClick={initializeGame} className="flex items-center">
                    <Play className="w-4 h-4 mr-2" />
                    PLAY AGAIN
                  </Button>
                  <Button onClick={resetGame} variant="secondary" className="flex items-center">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    CHANGE LEVEL
                  </Button>
                  <Link to="/" className="flex-1">
                    <Button variant="secondary" className="w-full flex items-center">
                      <Home className="w-4 h-4 mr-2" />
                      HOME
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GamePage;