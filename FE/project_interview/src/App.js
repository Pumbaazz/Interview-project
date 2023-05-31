import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import { Register } from "./Components/Register";
import { Login } from "./Components/Login";
import { DashboardPage } from "./Components/Dashboard";
import { useMsal, MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/sign-up" element={<Register />} />
          <Route exact path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </MsalProvider>
  );
};

export default App;
