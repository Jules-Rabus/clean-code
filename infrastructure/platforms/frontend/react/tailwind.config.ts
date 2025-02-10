import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{ts,jsx,tsx,mdx}",
    "./src/components/**/*.{ts,jsx,tsx,mdx}",
    "./src/app/**/*.{ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
