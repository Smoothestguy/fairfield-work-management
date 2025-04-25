/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6", // blue-500
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f3f4f6", // gray-100
          foreground: "#1f2937", // gray-800
        },
        destructive: {
          DEFAULT: "#ef4444", // red-500
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f3f4f6", // gray-100
          foreground: "#6b7280", // gray-500
        },
        accent: {
          DEFAULT: "#eff6ff", // blue-50
          foreground: "#3b82f6", // blue-500
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1f2937", // gray-800
        },
        background: "#f9fafb", // gray-50
        foreground: "#1f2937", // gray-800
        border: "#e5e7eb", // gray-200
        input: "#e5e7eb", // gray-200
        ring: "#3b82f6", // blue-500
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
