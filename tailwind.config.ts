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
        bg: "#1A0A1E",
        card: "#250C30",
        accent: "#C0306A",
        "accent-dark": "#8B1A4A",
        "text-primary": "#F2E6F5",
        "text-muted": "#999999",
        border: "#4A1A5C",
      },
    },
  },
  plugins: [],
};
export default config;
