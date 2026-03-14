/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        card: '#13131a',
        primary: '#8b5cf6', // Violet
        secondary: '#06b6d4', // Cyan
        accent: '#c084fc',
        textMain: '#f8fafc',
        textMuted: '#94a3b8'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
