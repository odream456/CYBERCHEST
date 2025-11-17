// src/components/Layout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0a0f1f] text-white">
      {/* Sidebar - Always fixed positioned */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      {/* Main content area with proper margin for sidebar */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-20">
        {/* Mobile header - only show on mobile */}
        <div className="lg:hidden p-4 border-b border-white/10 bg-[#0a0f1f] sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
          >
            <MenuIcon />
          </button>
        </div>

        {/* Main content - this will scroll independently */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export default Layout;