// src/components/UI/Toast.jsx
import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === 'success' 
    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50' 
    : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/50';

  const icon = type === 'success' 
    ? <CheckCircle className="w-5 h-5 text-green-400" /> 
    : <XCircle className="w-5 h-5 text-red-400" />;

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 p-4 rounded-xl border backdrop-blur-xl animate-fade-in ${bgColor} shadow-glow-soft`}>
      {icon}
      <span className="text-white font-medium">{message}</span>
      <button
        onClick={onClose}
        className="p-1 rounded-lg hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4 text-white/70" />
      </button>
    </div>
  );
};

export default Toast;