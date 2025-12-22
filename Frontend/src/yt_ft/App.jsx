import React, { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Component/Home/Home";
import SearchResult from "./Component/Search/SearchResult";
import VideoDetail from "./Component/VideoDetail/VideoDetail";
import Header from "./Component/Header/Header";
import SideNav from "./Component/SideNav/SideNav";
import Channel from "./pages/Channel";
import AllChannels from "./pages/AllChannels";
import { Context } from "./context/ContextApi";
// import LocomotiveScroll from 'locomotive-scroll';


const App = () => {
  const location = useLocation();
  const { toggle } = useContext(Context);
  // const locomotiveScroll = new LocomotiveScroll();


  return (
    <div className={`main ${toggle ? "bg-black text-[#fff]" : "text-black bg-[#fff]" } `}>
      <Header />
      {!location.pathname.startsWith("/videos/") && <SideNav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchResult/:serchQuery" element={<SearchResult />} />
        <Route path="/videos/:id" element={<VideoDetail />} />
        <Route path="/Channel/:id" element={<Channel />} />
        <Route path="/feed/channels/" element={<AllChannels />} />
      </Routes>
    </div>
  );
};

export default App;
