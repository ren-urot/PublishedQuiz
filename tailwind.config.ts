import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist Variable', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.93)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'pop': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.18)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-4px)' },
          '40%': { transform: 'translateX(4px)' },
          '60%': { transform: 'translateX(-3px)' },
          '80%': { transform: 'translateX(3px)' },
        },
        'glow-answer': {
          '0%, 100%': { boxShadow: '0 0 5px 1px rgba(17,130,227,0.13)' },
          '50%':       { boxShadow: '0 0 14px 4px rgba(17,130,227,0.28)' },
        },
        'glow-btn': {
          '0%, 100%': { boxShadow: '0 0 5px 1px rgba(17,130,227,0.15)' },
          '50%':       { boxShadow: '0 0 16px 5px rgba(17,130,227,0.30)' },
        },
      },
      animation: {
        'slide-up':     'slide-up 0.45s cubic-bezier(0.16,1,0.3,1) both',
        'slide-down':   'slide-down 0.35s cubic-bezier(0.16,1,0.3,1) both',
        'scale-in':     'scale-in 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':      'fade-in 0.3s ease-out both',
        'pop':          'pop 0.3s ease-out',
        'shake':        'shake 0.4s ease-out',
        'glow-answer':  'glow-answer 1.8s ease-in-out infinite',
        'glow-btn':     'glow-btn 1.8s ease-in-out infinite',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
}

export default config
