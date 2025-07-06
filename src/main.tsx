import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/AdminContext.tsx";
import DoctorContextProvider from "./context/DoctorContext.tsx";
import AppContextProvider from "./context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
);
