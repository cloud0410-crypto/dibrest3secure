import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { ink:"#18231f", forest:"#174d3b", lime:"#d7f36a", cream:"#f7f6ef", muted:"#68756e" }, boxShadow: { soft:"0 18px 50px rgba(24,35,31,.08)" } } },
  plugins: []
};
export default config;