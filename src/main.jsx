import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import { AuthProvider } from "./context/AuthContext.jsx";

let theme = createTheme();
theme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
          <Toaster />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
