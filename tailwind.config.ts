import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'increase-text': {
          '0%': {
            transform: 'translateY(0%)'
          },
          '80%': {
            transform: 'translateY(-30%)'
          },
          '90%': {
            transform: 'translateY(-10%) scale(1.75)'
          },
          '100%': {
            transform: 'translateY(0%) scale(2)',
            opacity: '0.3',
            zIndex: '-1'
          }
        },
        'enter-in-view': {
          to: { opacity: '1' }
        },
        'fade-in': {
          from: { opacity: '0' }
        },
        'slide-in-right': {
          from: { transform: 'translate3d(100%, 0, 0)', visibility: 'visible' },
          to: { transform: 'translate3d(0, 0, 0)' }
        }
      },
      animation: {
        'increase-text': 'increase-text 1s linear forwards',
        'enter-in-view': 'enter-in-view .3s forwards',
        'fade-in': 'fade-in 1s both',
        'slide-in-right': 'slide-in-right .6s linear'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      supports: {
        'no-scroll-driven-animations': 'not(animation-timeline: scroll())'
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar-hide')]
}

export default config
