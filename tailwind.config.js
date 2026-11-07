/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#08090A",

        "tech-blue": {
          DEFAULT: "#0066FF",
          50: "#F0F5FF",
          100: "#E0ECFF",
          200: "#B8D4FF",
          300: "#85B6FF",
          400: "#4790FF",
          500: "#0066FF",
          600: "#0052CC",
          700: "#003E99",
          800: "#002B6B",
          900: "#001A42",
        },

        accent: {
          DEFAULT: "#FF2E9C",
          50: "#FFF0F8",
          100: "#FFE0F1",
          200: "#FFB8DE",
          300: "#FF8ACA",
          400: "#FF5CB6",
          500: "#FF2E9C",
          600: "#E01484",
          700: "#B30F69",
          800: "#800A4B",
          900: "#4D062D",
        },

        slate: {
          50: "#F8F9FA",
          100: "#F1F3F5",
          200: "#E9ECEF",
          300: "#DEE2E6",
          400: "#CED4DA",
          500: "#868E96",
          600: "#495057",
          700: "#343A40",
          800: "#212529",
          900: "#121417",
          950: "#08090A",
        },

        hairline: {
          DEFAULT: "#E5E7EB",
          subtle: "#F0F2F5",
          strong: "#D1D5DB",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "SFMono-Regular", "Menlo", "Courier New", "monospace"],
      },
      letterSpacing: {
        "tight-heading": "-0.035em",
        "wide-tag": "0.12em",
        "wider-tag": "0.18em",
        "widest-tag": "0.24em",
      },
      boxShadow: {
        "nav-scrolled": "0 1px 0 0 rgba(0, 0, 0, 0.05), 0 4px 16px -2px rgba(0, 0, 0, 0.02)",
        "tech-glow": "0 0 20px -2px rgba(0, 102, 255, 0.25)",
        "tech-button": "0 1px 3px 0 rgba(0, 102, 255, 0.25), 0 4px 12px -2px rgba(0, 102, 255, 0.2)",
        "accent-glow": "0 0 0 1px rgba(255,46,156,0.25), 0 8px 28px -4px rgba(255,46,156,0.45)",
        "accent-soft": "0 0 0 1px rgba(255,46,156,0.15), 0 6px 20px -6px rgba(255,46,156,0.28)",
      },
      backgroundImage: {
        "grid-pattern": "radial-gradient(circle, #E5E7EB 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-sm": "24px 24px",
      },
    },
  },
  plugins: [],
};
