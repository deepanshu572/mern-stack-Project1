import axios from "axios";
import React from "react";
import { serverUrl } from "../App";
import VideosData from "../components/VideosData";

const Home = () => {
  const logoutHandler = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/auth/logout", {
      
      });
      // navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="">
      
     
      <VideosData/>
    </div>
  );
};

export default Home;
