import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        satyaSky: "#C3EBFA",
        satyaSkyLight: "#EDF9FD",
        satyaPurple: "#CFCEFF",
        satyaPurpleLight: "#F1F0FF",
        satyaYellow: "#FAE27C",
        satyaYellowLight: "#FEFCE8",
      },
    },
  },
  plugins: [],
};
export default config;
