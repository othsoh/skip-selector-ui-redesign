/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        'primary-hover': '#2563eb',
        'primary-light': '#1e3a8a',
        secondary: '#9ca3af',
        'secondary-hover': '#d1d5db',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#60a5fa',
        surface: '#1e293b',
        border: '#334155',
        'border-light': '#475569',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
      },
      fontFamily: {
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
