import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F6F3EC',
          card: '#FCFAF6',
          gold: '#BF8E2E',
          goldLight: '#FBF3DD',
          goldBorder: '#E6D3A3',
          dark: '#1D1812',
          muted: '#736B63',
          badgeBg: '#F3EDE2',
          actionGold: '#B87910'
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        cinzel: ['var(--font-cinzel)', 'serif'],
        sans: ['var(--font-jakarta)', 'sans-serif'],
      },
      boxShadow: {
        'card-soft': '0 4px 18px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'nav-bar': '0 -4px 20px rgba(0, 0, 0, 0.04)',
        'gold-glow': '0 4px 16px rgba(184, 121, 16, 0.18)',
        'modal': '0 20px 40px rgba(29, 24, 18, 0.2)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};

export default config;
