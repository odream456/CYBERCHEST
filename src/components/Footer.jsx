// src/components/Footer.jsx
import React, { useState } from 'react';
import { Instagram, Youtube, MessageCircle, Users, Github, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isHeartLiked, setIsHeartLiked] = useState(false);

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/odream_321/',
      color: 'hover:text-pink-400 hover:shadow-[0_0_15px_rgba(236,72,153,0.6)]'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@ELBEKSHERMAXMATOV',
      color: 'hover:text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.6)]'
    },
    {
      name: 'Telegram',
      icon: MessageCircle,
      url: 'https://t.me/ozodbek20100806',
      color: 'hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]'
    },
    {
      name: 'Discord',
      icon: Users,
      url: 'https://discord.gg/odream_321',
      color: 'hover:text-purple-400 hover:shadow-[0_0_15px_rgba(139,92,246,0.6)]'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/odream456/CYBERCHEST',
      color: 'hover:text-gray-300 hover:shadow-[0_0_15px_rgba(156,163,175,0.6)]'
    }
  ];

  const handleHeartClick = () => {
    setIsHeartLiked(!isHeartLiked);
  };

  return (
    <footer className="bg-gradient-to-t from-[#0a0f1f] to-transparent border-t border-white/10 backdrop-blur-xl mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Social Media Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group relative p-3 rounded-xl border border-white/20 
                    bg-white/5 backdrop-blur-sm transition-all duration-300
                    transform hover:scale-110 hover:border-cyan-400/50
                    ${social.color}
                  `}
                  aria-label={`Visit our ${social.name}`}
                >
                  <Icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
                  
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                    {social.name}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Made by text with clickable heart */}
          <div className="flex items-center gap-3 group">
            <button
              onClick={handleHeartClick}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-sm 
                transition-all duration-300 transform hover:scale-105 active:scale-95
                cursor-pointer select-none
                ${
                  isHeartLiked
                    ? 'bg-red-500/20 border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                    : 'bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-cyan-400/30'
                }
              `}
            >
              <div className="relative">
                <Heart
                  className={`
                    w-4 h-4 transition-all duration-300
                    ${
                      isHeartLiked
                        ? 'text-red-400 fill-red-400 scale-125'
                        : 'text-red-400 group-hover:scale-110'
                    }
                  `}
                />
                {/* Pulse animation when liked */}
                {isHeartLiked && (
                  <>
                    <div className="absolute inset-0 w-4 h-4 bg-red-400 rounded-full animate-ping opacity-75"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
                  </>
                )}
              </div>
              <span className={`
                text-sm font-medium transition-colors duration-300
                ${
                  isHeartLiked
                    ? 'text-red-300'
                    : 'text-white/70 group-hover:text-white'
                }
              `}>
                Made by <span className="text-cyan-300 font-semibold">Ozodbek</span>
              </span>
            </button>
            <button
              onClick={handleHeartClick}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-sm 
                transition-all duration-300 transform hover:scale-105 active:scale-95
                cursor-pointer select-none
                ${
                  isHeartLiked
                    ? 'bg-red-500/20 border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                    : 'bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-cyan-400/30'
                }
              `}
            >
              <div className="relative">
                <Heart
                  className={`
                    w-4 h-4 transition-all duration-300
                    ${
                      isHeartLiked
                        ? 'text-red-400 fill-red-400 scale-125'
                        : 'text-red-400 group-hover:scale-110'
                    }
                  `}
                />
                {/* Pulse animation when liked */}
                {isHeartLiked && (
                  <>
                    <div className="absolute inset-0 w-4 h-4 bg-red-400 rounded-full animate-ping opacity-75"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
                  </>
                )}
              </div>
              <span className={`
                text-sm font-medium transition-colors duration-300
                ${
                  isHeartLiked
                    ? 'text-red-300'
                    : 'text-white/70 group-hover:text-white'
                }
              `}>
                Teacher <span className="text-cyan-300 font-semibold">@jakhon_dev</span>
              </span>
            </button>
          </div>

          {/* Copyright */}
          <div className="text-white/50 text-sm text-center lg:text-right">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              © {currentYear} CYBERCHEST
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-6 pt-6 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <div className="flex items-center gap-4">
              <span>🎮 Cosmic Treasure Hunting Game</span>
              <span className="hidden sm:inline">•</span>
              <span>⚡ Built with React</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Game Server Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float"
            style={{
              left: `${20 + i * 30}%`,
              bottom: '20%',
              animationDelay: `${i * 2}s`,
              animationDuration: '6s'
            }}
          />
        ))}
        {[...Array(2)].map((_, i) => (
          <div
            key={i + 3}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-float"
            style={{
              left: `${70 + i * 15}%`,
              bottom: '30%',
              animationDelay: `${1 + i * 2}s`,
              animationDuration: '8s'
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;