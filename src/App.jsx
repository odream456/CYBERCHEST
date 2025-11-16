// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import ShopPage from './pages/ShopPage';
import HistoryPage from './pages/HistoryPage';
import ChatPage from './pages/ChatPage';
import './index.css';

function App() {
  return (
    <GameProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/play" element={<GamePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </Layout>
      </Router>
    </GameProvider>
  );
}

export default App;