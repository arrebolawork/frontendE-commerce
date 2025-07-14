import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./provider/UserProvider.jsx";
import { ProductProvider } from "./provider/ProductProvider.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <ProductProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ProductProvider>
  </UserProvider>
);
