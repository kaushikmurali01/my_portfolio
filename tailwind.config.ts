import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0B',
        'bg-elev': '#111114',
        'bg-card': '#15151A',
        'bg-card-hi': '#1B1B22',
        border: '#25252D',
        'border-hi': '#34343F',
        text: '#E8E8EA',
        'text-soft': '#A8A8AE',
        'text-mute': '#6E6E76',
        'text-faint': '#45454C',
        accent: '#FF5C28',
        'accent-soft': '#FF8A5C',
        green: '#4ADE80',
        blue: '#60A5FA',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
      maxWidth: {
        content: '1240px',
      },
      boxShadow: {
        'accent-glow': '0 0 20px rgba(255,92,40,0.25), 0 0 40px rgba(255,92,40,0.1)',
        'card': '0 1px 3px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}

export default config
