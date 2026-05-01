import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
    },
    extend: {
      fontFamily: {
        sans: "var(--font-sans)",
        serif: "var(--font-serif)",
        mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
      },
      colors: {
        bg: "var(--bg)",
        "bg-soft": "var(--bg-soft)",
        surface: "var(--surface-0)",
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        accent: "var(--accent-1)",
        "accent-2": "var(--accent-2)",
        "accent-3": "var(--accent-3)",
      },
      animation: {
        "ping-large": "ping-large 1s ease-in-out infinite",
        "move-left": "move-left 30s linear infinite",
        "move-right": "move-right 30s linear infinite",
        "hand-move": "hand-move 2s linear infinite",
        "arrow-down": "arrow-down 2s linear infinite",
        gradient: "gradient 5s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "border-spin": "border-spin 4s linear infinite",
        glitch: "glitch 0.8s steps(2) infinite",
      },
      keyframes: {
        "ping-large": { "75%, 100%": { transform: "scale(3)", opacity: "0" } },
        "move-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "move-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "hand-move": {
          "0%": { transform: "rotate(-10deg) scale(1)" },
          "50%": { transform: "rotate(30deg) scale(1.1)" },
          "100%": { transform: "rotate(-10deg) scale(1)" },
        },
        "arrow-down": {
          "0%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(30%)" },
          "100%": { transform: "translateY(0%)" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "border-spin": { "100%": { transform: "rotate(-360deg)" } },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
