import url from "@rollup/plugin-url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-styled-components"]],
      },
    }),
    url(),
  ],
});
