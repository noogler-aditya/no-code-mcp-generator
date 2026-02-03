/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f7f4ee",
        ink: "#1f1e1c",
        muted: "#6f6a62",
        sage: "#9fb59a",
        clay: "#d4a38f",
        dusk: "#c2cbd1",
        line: "#e6e0d7",
        glow: "#e9f1e6"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 12px 30px -24px rgba(17, 24, 39, 0.35)",
        lift: "0 24px 60px -30px rgba(17, 24, 39, 0.45)"
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at 20% 20%, rgba(159,181,154,0.35), transparent 55%), radial-gradient(circle at 80% 30%, rgba(212,163,143,0.35), transparent 60%)",
        "soft-grid": "linear-gradient(to right, rgba(31,30,28,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,30,28,0.04) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
