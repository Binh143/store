import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* // <React.StrictMode> */}
    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer />
    {/* </React.StrictMode> */}
  </>
);
reportWebVitals();
