import { Analytics } from "@vercel/analytics/react";
import React from "react";
import ReactDOM from "react-dom/client";

import { Snake } from "../src/Snake";
import { GlobalStyles } from "../src/styles/globalStyles";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <Snake />
    <GlobalStyles />
    <Analytics />
  </React.StrictMode>
);
