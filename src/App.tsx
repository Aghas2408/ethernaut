import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import HelloEthernaut from "./pages/HelloEthernaut";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/helloEthernaut" element={<HelloEthernaut />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
