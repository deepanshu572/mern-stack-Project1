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
import { getAllContentData } from "./Hooks/getAllContentData";
import CreatePage from "./Pages/CreatePage";
import UploadVideo from "./Pages/uploadVideo";
import UploadShorts from "./Pages/UploadShorts";
import UploadCommunityPost from "./Pages/UploadCommunityPost";
import UploadPlaylistVideos from "./Pages/UploadPlaylistVideos";
import ViewChannelPage from "./Pages/ViewChannelPage";
import CreateChannel from "./Pages/CreateChannel";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdateChannel from "./Pages/UpdateChannel";
import { getchannel } from "./Hooks/getCurrentChannelData";
import ChannelDetailPage from "./Pages/ChannelDetailPage";

export const serverUrl = "http://localhost:8080";

const App = () => {
  const location = useLocation();
  // const hideLayout1 = location.pathname === "/video/:id";
  const hideLayout2 =
    location.pathname === "/register" ||
    location.pathname === "/login" ||
    location.pathname === "/forgotpassword" ||
    location.pathname === "/CreateChannel";

  getUser();
  getchannel();
  getAllContentData();

  return (
    <>
    
      {!hideLayout2 && <Header />}
      {/* {!hideLayout1 && <SideNav />} */}

      <CustomAlert />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/CreateChannel" element={<CreateChannel />} />
        <Route path="/UpdateChannel" element={<UpdateChannel />} />
        <Route path="/viewChannel" element={<ViewChannelPage />} />
        <Route path="/ChannelDetail/:id" element={<ChannelDetailPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/create/video" element={<UploadVideo />} />
        <Route path="/create/shorts" element={<UploadShorts />} />
        <Route
          path="/create/community-post"
          element={<UploadCommunityPost />}
        />
        <Route path="/create/playlist" element={<UploadPlaylistVideos />} />
      </Routes>
    </>
  );
};

export default App;
