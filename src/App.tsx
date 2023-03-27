import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
