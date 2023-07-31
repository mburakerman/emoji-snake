import React from "react";
import ReactDOM from "react-dom/client";
import { Snake } from "../src/Snake";
import { GlobalStyles } from "../src/styles/globalStyles";

ReactDOM.createRoot(document.getElementById("app") as any).render(
  <React.StrictMode>
    <Snake />
    <GlobalStyles />
  </React.StrictMode>
);
