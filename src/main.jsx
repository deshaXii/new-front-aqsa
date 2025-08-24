import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { registerSW } from "virtual:pwa-register";
import { registerSWW } from "./swRegistration";
registerSWW();
registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
