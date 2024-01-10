/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        sidebarShow: "sidebarShow 0.6s ease-in-out",
        sidebarHidden: "sidebarHidden 0.6s ease-in-out",
        whenSideOn: "WhenSiderOn 0.6s ease-in-out",
        WhenSiderOff: "WhenSiderOff 0.6s ease-in-out",
      },
      keyframes: () => ({
        sidebarShow: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0%)", opacity: 1 },
        },
        sidebarHidden: {
          "0%": { transform: "translateX(0%)", opacity: 1 },
          "100%": { transform: "translateX(-100%)", opacity: 0 },
        },
        WhenSiderOn: {
          "0%": { left: "8px" },
          "100%": { left: "288px" },
        },
        WhenSiderOff: {
          "0%": { left: "288px" },
          "100%": { left: "8px" },
        },
      }),
    },
  },

  plugins: [],
};
