import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        spinSlow: "spin 8s linear infinite",
      },
    },

    clipPath: {
      mypolygon: "polygon(78% 0, 100% 0, 100% 100%, 33% 100%);",
      loginPoly: "circle(50% at 99% 11%)",
      signUpPoly: "circle(50% at 0 14%)",
      heroPoly: "inset(14% 20% 35% 31%)",
    },
  },
  plugins: [require("tailwind-clip-path")],
};
export default config;
