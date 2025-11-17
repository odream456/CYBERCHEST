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
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:fixed inset-y-0 left-0 z-50
        w-20 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full bg-white/10 backdrop-blur-md border-r border-white/15 shadow-sm">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 p-4 border-b border-white/10">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/90 to-cyan-400/90 shadow-md">
              <img src="/frw.svg" alt="Logo" className="w-10 h-10 object-contain" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    group relative flex items-center justify-center w-14 h-14 rounded-xl
                    transition-all duration-200 ease-out flex-shrink-0
                    ${isActive 
                      ? 'bg-gradient-to-br from-purple-500/20 to-cyan-400/20 border border-cyan-400/40 shadow-sm' 
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/20'
                    }
                  `}
                  onClick={() => window.innerWidth < 1024 && onToggle()}
                >
                  <Icon className={`
                    w-5 h-5 transition-all duration-200
                    ${isActive 
                      ? 'text-cyan-300' 
                      : 'text-white/60 group-hover:text-cyan-200'
                    }
                  `} />
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-3 px-2 py-1.5 bg-gray-800/95 backdrop-blur-sm rounded-md text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-lg border border-white/10 z-50">
                    {item.label}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-800/95 rotate-45 border-l border-t border-white/10"></div>
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