import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
