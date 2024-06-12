/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        animationleft: 'animationleft 0.5s forwards',
        animationup: 'animationup 0.3s forwards',
        pulsefast: 'pulse 0.9s cubic-bezier(0.4, 0, 0.8, 1) infinite',
        flip: 'flip 1s forwards',
        flipBack: 'flip-back 1s forwards',
      },
      keyframes: {
        animationleft: {
          to: { opacity: 1, transform: 'initial' },
        },
        animationup: {
          to: { opacity: 1, transform: 'initial' },
        },
        flip: {
          from: {
            transform: 'perspective(600px) rotateY(0)',
          },
          to: {
            transform: 'perspective(600px) rotateY(360deg)',
          },
        },
        flipBack: {
          from: {
            transform: 'perspective(600px) rotateY(-360deg)',
          },
          to: {
            transform: 'perspective(600px) rotateY(180)',
          },
        },
      },
    },
    fontFamily: {
      sans: ['Lexend', 'sans-serif'],
    },
  },
  plugins: [],
};
