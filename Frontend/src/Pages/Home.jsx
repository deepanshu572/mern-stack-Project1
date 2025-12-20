import axios from "axios";
import React from "react";
import { serverUrl } from "../App";

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
    <div>
      <button onClick={logoutHandler} className="btn p-2">
        Logout{" "}
      </button>
    </div>
  );
};

export default Home;
