import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import CustomAlert from "./components/customAlert";
import Header from "./components/Header";
import "./app.css";
import SideNav from "./components/SideNav";
import VideoDetail from "./Pages/VideoDetail";
import { getUser } from "./Hooks/getCurrentUser";

export const serverUrl = "http://localhost:8080";

const App = () => {
  const location = useLocation();
  const hideLayout1 = location.pathname === "/";
  const hideLayout2 =
    location.pathname === "/register" || location.pathname === "/login";

  getUser();
 

  return (
    <>
      {!hideLayout2 && <Header />}
      {hideLayout1 && <SideNav />}

      <CustomAlert />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/video/:id" element={<VideoDetail />} />
      </Routes>
    </>
  );
};

export default App;
