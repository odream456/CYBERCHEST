// src/components/Layout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0f1f] text-white overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-20">
          {/* Mobile header */}
          <div className="lg:hidden p-4 border-b border-white/10">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
            >
              <MenuIcon />
            </button>
          </div>

          {/* Main content */}
          <main className="flex-1 overflow-auto p-4 lg:p-8">
            <div className="animate-fade-in">
              {children}
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export default Layout;