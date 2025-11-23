/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          void: '#0a0a0f',
          deep: '#12121a',
          surface: '#1a1a2e',
          primary: '#6366f1',
          secondary: '#8b5cf6',
          accent: '#ec4899',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          nebula: '#4c1d95',
          star: '#fbbf24',
          galaxy: '#6366f1',
          aurora: {
            purple: '#a78bfa',
            pink: '#f472b6',
            blue: '#60a5fa',
            cyan: '#22d3ee',
          }
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'nebula-gradient': 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #581c87 100%)',
        'aurora-gradient': 'linear-gradient(90deg, #a78bfa 0%, #f472b6 50%, #60a5fa 100%)',
        'void-gradient': 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 100%)',
      },
      boxShadow: {
        'cosmic': '0 0 30px rgba(99, 102, 241, 0.3)',
        'cosmic-lg': '0 0 50px rgba(99, 102, 241, 0.4)',
        'glow': '0 0 20px currentColor',
        'glow-sm': '0 0 10px currentColor',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
