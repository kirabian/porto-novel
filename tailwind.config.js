/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-purple': '#9333ea',
        'cyber-blue': '#2563eb',
        'cyber-pink': '#ec4899',
        'cyber-teal': '#14b8a6',
        'cyber-black': '#0f172a',
        'pastel-pink': '#fce7f3',
        'pastel-blue': '#dbeafe',
        'pastel-purple': '#f3e8ff',
      },
      fontFamily: {
        'cyber': ['Rajdhani', 'sans-serif'],
        'terminal': ['JetBrains Mono', 'monospace'],
        'body': ['Exo 2', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'cyber-grid': "url('https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg')",
        'anime-city': "url('https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg')",
      },
    },
  },
  plugins: [],
};