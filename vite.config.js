import url from "@rollup/plugin-url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-styled-components"]],
      },
    }),
    url(),
    EnvironmentPlugin(["VITE_FIREBASE_API_KEY"]),
  ],
});
