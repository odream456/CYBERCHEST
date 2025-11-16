// src/pages/ShopPage.jsx
import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';

// Create simple inline components to ensure they work
const Card = ({ children, className = '', glow = false }) => (
  <div className={`
    bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6
    transition-all duration-300 hover:border-white/20
    ${glow ? 'shadow-[0_0_15px_rgba(91,45,252,0.3),0_0_30px_rgba(91,45,252,0.2)]' : ''}
    ${className}
  `}>
    {children}
  </div>
);

const Button = ({ children, onClick, disabled = false, variant = 'primary', className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform
      border backdrop-blur-xl disabled:opacity-50 disabled:cursor-not-allowed
      hover:scale-105 active:scale-95 w-full
      ${variant === 'primary' 
        ? 'bg-gradient-to-r from-purple-600 to-cyan-500 border-transparent text-white hover:shadow-[0_0_20px_rgba(28,210,255,0.5)]' 
        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
      }
      ${className}
    `}
  >
    {children}
  </button>
);

const Toast = ({ message, type = 'success', onClose }) => (
  <div className={`
    fixed top-4 right-4 z-50 flex items-center gap-3 p-4 rounded-xl border backdrop-blur-xl 
    animate-fade-in max-w-sm
    ${type === 'success' 
      ? 'bg-green-500/20 border-green-400/50 text-green-300' 
      : 'bg-red-500/20 border-red-400/50 text-red-300'
    }
  `}>
    <div className="flex-1">
      {message}
    </div>
    <button
      onClick={onClose}
      className="p-1 rounded-lg hover:bg-white/10 transition-colors"
    >
      ×
    </button>
  </div>
);

// Simple icon fallbacks if lucide-react isn't working
const Coins = () => <span className="text-yellow-400">₡</span>;
const Sparkles = () => <span>✨</span>;
const Shield = () => <span>🛡️</span>;
const Scan = () => <span>🔍</span>;
const Bomb = () => <span>💣</span>;
const Gem = () => <span>💎</span>;
const Zap = () => <span>⚡</span>;

const ShopPage = () => {
  // Use GameContext with safe fallbacks
  const gameContext = useGame();
  
  // Safe destructuring with fallbacks
  const { 
    coins = 0, 
    purchaseItem = () => false, 
    inventory = {
      extraLives: 0,
      starScanners: 0,
      bombDefusers: 0,
      goldenChests: 0,
      activeSkins: []
    },
    purchases = []
  } = gameContext || {};

  const [toast, setToast] = useState(null);

  const shopItems = [
    { 
      id: 'neon-skin', 
      name: "Neon Chest Skin", 
      price: 50, 
      type: 'skin',
      icon: Sparkles, 
      description: "Glowing neon chest appearance",
    },
    { 
      id: 'extra-life', 
      name: "Extra Life", 
      price: 150, 
      type: 'extraLife',
      icon: Shield, 
      description: "Continue after one bomb",
    },
    { 
      id: 'star-scanner', 
      name: "Star Scanner", 
      price: 100, 
      type: 'starScanner',
      icon: Scan, 
      description: "Reveal one star location",
    },
    { 
      id: 'bomb-defuser', 
      name: "Bomb Defuser", 
      price: 120, 
      type: 'bombDefuser',
      icon: Bomb, 
      description: "Neutralize one bomb",
    },
    { 
      id: 'golden-chest', 
      name: "Golden Chest", 
      price: 200, 
      type: 'goldenChest',
      icon: Gem, 
      description: "Double coins on next win",
    },
    { 
      id: 'cosmic-theme', 
      name: "Cosmic Theme", 
      price: 500, 
      type: 'theme',
      icon: Zap, 
      description: "Unlock cosmic UI theme",
    },
  ];

  const handlePurchase = (item) => {
    if (purchaseItem(item)) {
      setToast({
        message: `Purchased ${item.name} for ${item.price} coins!`,
        type: 'success'
      });
      setTimeout(() => setToast(null), 3000);
    } else {
      setToast({
        message: `Not enough coins for ${item.name}!`,
        type: 'error'
      });
      setTimeout(() => setToast(null), 3000);
    }
  };

  // Check if item is owned
  const isItemOwned = (item) => {
    switch (item.type) {
      case 'skin':
      case 'theme':
        return inventory.activeSkins?.includes(item.id) || false;
      case 'extraLife':
        return inventory.extraLives > 0;
      case 'starScanner':
        return inventory.starScanners > 0;
      case 'bombDefuser':
        return inventory.bombDefusers > 0;
      case 'goldenChest':
        return inventory.goldenChests > 0;
      default:
        return false;
    }
  };

  const getItemCount = (item) => {
    switch (item.type) {
      case 'extraLife':
        return inventory.extraLives;
      case 'starScanner':
        return inventory.starScanners;
      case 'bombDefuser':
        return inventory.bombDefusers;
      case 'goldenChest':
        return inventory.goldenChests;
      default:
        return 0;
    }
  };

  const getButtonText = (item) => {
    const owned = isItemOwned(item);
    const canAfford = coins >= item.price;

    if (owned && (item.type === 'skin' || item.type === 'theme')) {
      return 'OWNED';
    }
    
    return canAfford ? 'PURCHASE' : 'INSUFFICIENT COINS';
  };

  const isItemDisabled = (item) => {
    const owned = isItemOwned(item);
    const canAfford = coins >= item.price;

    // For skins/themes, disable if owned
    if ((item.type === 'skin' || item.type === 'theme') && owned) {
      return true;
    }
    
    return !canAfford;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1f] via-purple-900/20 to-cyan-900/10 p-4">
      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            COSMIC SHOP
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4 text-lg">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xs">₡</span>
            </div>
            <span className="text-yellow-400 font-bold text-2xl">{coins}</span>
            <span className="text-white/70">cosmic coins available</span>
          </div>
        </div>

        {/* Shop Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopItems.map((item) => {
            const Icon = item.icon;
            const owned = isItemOwned(item);
            const count = getItemCount(item);
            const canAfford = coins >= item.price;
            const isSkinType = item.type === 'skin' || item.type === 'theme';

            return (
              <Card 
                key={item.id} 
                glow={canAfford && !owned}
                className="p-6 text-center group hover:scale-105 transition-all duration-300 relative"
              >
                {/* Owned Badge */}
                {owned && isSkinType && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-400/50">
                    OWNED
                  </div>
                )}

                {/* Count Badge */}
                {count > 0 && !isSkinType && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-400/50">
                    {count}
                  </div>
                )}

                <div className={`
                  w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center 
                  transition-all duration-300 group-hover:scale-110 text-2xl
                  ${owned && isSkinType
                    ? 'bg-gradient-to-br from-green-500 to-emerald-400' 
                    : canAfford 
                      ? 'bg-gradient-to-br from-purple-500 to-cyan-400 group-hover:from-purple-400 group-hover:to-cyan-300 shadow-[0_0_20px_rgba(28,210,255,0.3)]'
                      : 'bg-gradient-to-br from-gray-500 to-gray-400'
                  }
                `}>
                  <Icon />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-white/70 text-sm mb-2">{item.description}</p>
                
                {(owned || count > 0) && (
                  <div className="text-cyan-300 text-sm mb-3">
                    {isSkinType ? 'OWNED' : `Owned: ${count}`}
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xs">₡</span>
                  </div>
                  <span className={`font-bold text-lg ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>
                    {item.price}
                  </span>
                </div>
                
                <Button 
                  variant={canAfford && !owned ? "primary" : "secondary"} 
                  disabled={isItemDisabled(item)}
                  onClick={() => handlePurchase(item)}
                  className="transition-all duration-300"
                >
                  {getButtonText(item)}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Inventory Summary */}
        <Card className="p-6">
          <h3 className="text-2xl font-bold text-cyan-300 mb-4 text-center">🎒 YOUR INVENTORY</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl">🛡️</div>
              <div className="text-2xl font-bold text-white">{inventory.extraLives}</div>
              <div className="text-cyan-300 text-sm">EXTRA LIVES</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl">🔍</div>
              <div className="text-2xl font-bold text-white">{inventory.starScanners}</div>
              <div className="text-cyan-300 text-sm">SCANNERS</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl">💣</div>
              <div className="text-2xl font-bold text-white">{inventory.bombDefusers}</div>
              <div className="text-cyan-300 text-sm">DEFUSERS</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl">💎</div>
              <div className="text-2xl font-bold text-white">{inventory.goldenChests}</div>
              <div className="text-cyan-300 text-sm">GOLDEN CHESTS</div>
            </div>
          </div>
        </Card>

        {/* Purchase History */}
        <Card className="p-6">
          <h3 className="text-2xl font-bold text-cyan-300 mb-4 text-center">📜 PURCHASE HISTORY</h3>
          {purchases.length === 0 ? (
            <div className="text-center py-8 text-white/50">
              No purchases yet. Buy something from the shop!
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {purchases.map((purchase) => (
                <div 
                  key={purchase.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center border border-green-400/30">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{purchase.item}</div>
                      <div className="text-xs text-white/60">{purchase.timestamp}</div>
                    </div>
                  </div>
                  <div className="text-red-400 font-bold">-{purchase.price}</div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ShopPage;