/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f4f6ee',
          100: '#e6ebd7',
          200: '#cdd8b1',
          300: '#adbf85',
          400: '#8fa864',
          500: '#71884a',
          600: '#576b39',
          700: '#43532e',
          800: '#374428',
          900: '#2f3924',
          950: '#171e10',
        },
        rose: {
          50: '#fdf4f4',
          100: '#fbe7e8',
          200: '#f7d1d4',
          300: '#f0aeb3',
          400: '#e5828b',
          500: '#d65c68',
          600: '#c13f4e',
          700: '#a22f3d',
          800: '#872a37',
          900: '#742732',
        },
        sand: '#f7f4ee',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(55, 68, 40, 0.12)',
        glow: '0 0 0 1px rgba(255,255,255,0.4) inset, 0 8px 30px rgba(55,68,40,0.15)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        drawLine: {
          '0%': { strokeDashoffset: 400 },
          '100%': { strokeDashoffset: 0 },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.7s ease forwards',
        drawLine: 'drawLine 2.2s ease forwards',
      },
    },
  },
  plugins: [],
}
