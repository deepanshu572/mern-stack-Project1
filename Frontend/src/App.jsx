import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./Pages/home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

export const serverUrl = "http://localhost:8080";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
