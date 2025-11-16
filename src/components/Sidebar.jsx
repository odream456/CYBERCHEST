// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  GamepadIcon, 
  ShoppingCart, 
  History, 
  MessageCircle,
  Zap
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/play', icon: GamepadIcon, label: 'Play' },
    { path: '/shop', icon: ShoppingCart, label: 'Shop' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
  ];

  return (
    <>
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-20 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full bg-white/5 backdrop-blur-xl border-r border-white/10 neon-glow">
          
          {/* Logo */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-400 shadow-lg glow-cyan">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    group relative flex items-center justify-center w-12 h-12 rounded-xl
                    transition-all duration-300 transform hover:scale-110
                    ${isActive 
                      ? 'bg-gradient-to-br from-purple-600/30 to-cyan-400/30 border border-cyan-400/50 shadow-glow' 
                      : 'bg-white/5 border border-white/10 hover:border-cyan-400/30'
                    }
                  `}
                  onClick={() => window.innerWidth < 1024 && onToggle()}
                >
                  <Icon className={`
                    w-5 h-5 transition-all duration-300
                    ${isActive ? 'text-cyan-300 scale-110' : 'text-white/70 group-hover:text-cyan-200'}
                  `} />
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;