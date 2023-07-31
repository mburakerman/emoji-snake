import React from "react";
import ReactDOM from "react-dom/client";
import { Snake } from "../assets/src/Snake";
import { GlobalStyles } from "./src/styles/globalStyles";

ReactDOM.createRoot(document.getElementById("app") as any).render(
  <React.StrictMode>
    <Snake />
    <GlobalStyles />
  </React.StrictMode>
);
