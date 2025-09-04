// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["@material-tailwind/react"],
    },
    optimizeDeps: {
      include: ["@material-tailwind/react"],
    },
  },
  //TEMP config for static demo with Github pages
  site: "https://inria.github.io",
  base: "/inocs-sum-odp-frontend",
  output: "static",
});
