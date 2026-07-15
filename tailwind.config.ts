import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tribun: {
          red: '#E82B2B',
          dark: '#B01F1F',
          gray: '#F5F5F5',
          border: '#E5E5E5',
          text: '#333333',
          link: '#21759b',
        },
      },
      // MENAMBAHKAN KONFIGURASI SHADOW AGAR LEBIH TERLIHAT
      boxShadow: {
        'tribun-card': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'tribun-deep': '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      fontFamily: {
        serif: ['"PT Serif"', 'Georgia', 'serif'],
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;