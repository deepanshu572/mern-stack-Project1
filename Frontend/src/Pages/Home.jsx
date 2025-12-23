import axios from "axios";
import React from "react";
import { serverUrl } from "../App";
import VideosData from "../components/VideosData";

const Home = () => {
  
  return (
    <div className="home">
      <VideosData />
    </div>
  );
};

export default Home;
