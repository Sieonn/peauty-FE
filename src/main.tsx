import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./router";
import GlobalStyle from "../src/style/global-style";
import { RouterProvider } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />
    <RouterProvider 
      router={router}
    />
    <App />
  </StrictMode>,
);
