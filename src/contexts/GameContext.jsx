// src/contexts/GameContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('world-of-chest-coins');
    return saved ? parseInt(saved) : 0;
  });
  
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('world-of-chest-history');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [purchases, setPurchases] = useState(() => {
    const saved = localStorage.getItem('world-of-chest-purchases');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [level, setLevel] = useState(10);
  
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('world-of-chest-inventory');
    return saved ? JSON.parse(saved) : {
      extraLives: 0,
      activeSkins: [],
      starScanners: 0,
      bombDefusers: 0,
      goldenChests: 0,
      usedItems: [] // Track used consumables
    };
  });

  const [activeTheme, setActiveTheme] = useState(() => {
    const saved = localStorage.getItem('world-of-chest-active-theme');
    return saved ? saved : 'default';
  });

  const [currentLives, setCurrentLives] = useState(1); // Current game lives

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('world-of-chest-coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('world-of-chest-history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('world-of-chest-purchases', JSON.stringify(purchases));
  }, [purchases]);

  useEffect(() => {
    localStorage.setItem('world-of-chest-inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('world-of-chest-active-theme', activeTheme);
  }, [activeTheme]);

  const addCoins = (amount) => {
    setCoins(prev => prev + amount);
  };

  const spendCoins = (amount) => {
    if (coins >= amount) {
      setCoins(prev => prev - amount);
      return true;
    }
    return false;
  };

  const addHistory = (result) => {
    const newHistory = {
      id: Date.now(),
      level,
      result,
      coins: result === 'win' ? level * 10 : 0,
      timestamp: new Date().toLocaleString()
    };
    setHistory(prev => [newHistory, ...prev.slice(0, 9)]);
  };

  const addPurchase = (item) => {
    const newPurchase = {
      id: Date.now(),
      item: item.name,
      price: item.price,
      timestamp: new Date().toLocaleString()
    };
    setPurchases(prev => [newPurchase, ...prev]);
  };

  const purchaseItem = (item) => {
    if (spendCoins(item.price)) {
      addPurchase(item);
      
      // Update inventory based on item type
      setInventory(prev => {
        const newInventory = { ...prev };
        switch (item.type) {
          case 'extraLife':
            newInventory.extraLives += 1;
            break;
          case 'skin':
            if (!newInventory.activeSkins.includes(item.id)) {
              newInventory.activeSkins.push(item.id);
            }
            break;
          case 'starScanner':
            newInventory.starScanners += 1;
            break;
          case 'bombDefuser':
            newInventory.bombDefusers += 1;
            break;
          case 'goldenChest':
            newInventory.goldenChests += 1;
            break;
          default:
            break;
        }
        return newInventory;
      });

      // Apply theme immediately if it's a skin
      if (item.type === 'skin') {
        setActiveTheme(item.id);
      }

      return true;
    }
    return false;
  };

  const useExtraLife = () => {
    if (inventory.extraLives > 0 && currentLives <= 1) {
      setInventory(prev => ({
        ...prev,
        extraLives: prev.extraLives - 1,
        usedItems: [...prev.usedItems, `extraLife-${Date.now()}`]
      }));
      setCurrentLives(2); // Give player an extra life
      return true;
    }
    return false;
  };

  const useStarScanner = () => {
    if (inventory.starScanners > 0) {
      setInventory(prev => ({
        ...prev,
        starScanners: prev.starScanners - 1,
        usedItems: [...prev.usedItems, `starScanner-${Date.now()}`]
      }));
      return true;
    }
    return false;
  };

  const useBombDefuser = () => {
    if (inventory.bombDefusers > 0) {
      setInventory(prev => ({
        ...prev,
        bombDefusers: prev.bombDefusers - 1,
        usedItems: [...prev.usedItems, `bombDefuser-${Date.now()}`]
      }));
      return true;
    }
    return false;
  };

  const resetGameState = () => {
    setCurrentLives(1);
  };

  const applyTheme = (themeId) => {
    if (inventory.activeSkins.includes(themeId)) {
      setActiveTheme(themeId);
      return true;
    }
    return false;
  };

  return (
    <GameContext.Provider value={{
      coins,
      addCoins,
      spendCoins,
      history,
      addHistory,
      level,
      setLevel,
      purchases,
      purchaseItem,
      inventory,
      activeTheme,
      applyTheme,
      currentLives,
      useExtraLife,
      useStarScanner,
      useBombDefuser,
      resetGameState
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);