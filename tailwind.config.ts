import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neural: {
          bg: "rgb(var(--neural-bg) / <alpha-value>)",
          surface: "rgb(var(--neural-surface) / <alpha-value>)",
          card: "rgb(var(--neural-card) / <alpha-value>)",
          border: "rgb(var(--neural-border) / <alpha-value>)",
          fg: "rgb(var(--neural-fg) / <alpha-value>)",
          "fg-muted": "rgb(var(--neural-fg-muted) / <alpha-value>)",
          "fg-soft": "rgb(var(--neural-fg-soft) / <alpha-value>)",
          "fg-dim": "rgb(var(--neural-fg-dim) / <alpha-value>)",
          cyan: "#06b6d4",
          purple: "#6366f1",
          pink: "#ec4899",
          green: "#10b981",
          amber: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: [
          "var(--font-space-grotesk)",
          "Space Grotesk",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
