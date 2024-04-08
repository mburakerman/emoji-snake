import { Analytics } from "@vercel/analytics/react";
import React from "react";
import ReactDOM from "react-dom/client";

import { GlobalStyles } from "../src/styles/globalStyles";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <GlobalStyles />
    <Analytics />
  </React.StrictMode>
);
