// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a0f1f',
        neon: {
          purple: '#5b2dfc',
          cyan: '#1cd2ff',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(28, 210, 255, 0.5), 0 0 40px rgba(28, 210, 255, 0.3)',
        'glow-soft': '0 0 15px rgba(91, 45, 252, 0.3), 0 0 30px rgba(91, 45, 252, 0.2)',
        'glow-yellow': '0 0 15px rgba(255, 193, 7, 0.5), 0 0 30px rgba(255, 193, 7, 0.3)',
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.5), 0 0 30px rgba(239, 68, 68, 0.3)',
      }
    },
  },
  plugins: [],
}
