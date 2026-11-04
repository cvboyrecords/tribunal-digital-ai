import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: "#0B192C",
          darkNavy: "#070F1B",
          slate: "#1E3E62",
          gold: "#C5A880",
          goldHover: "#B3956B",
          bgLight: "#F4F6F9",
          cardBorder: "#E1E6ED",
        },
      },
    },
  },
  plugins: [],
};
export default config;
