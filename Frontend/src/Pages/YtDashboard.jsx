import React, { useState } from "react";
import SideNavDashBoard from "../components/SideNavDashBoard";
import DashBoard from "../components/DashBoard";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
const YtDashboard = () => {
  const [content, setContent] = useState("dashboard");
  const handleTabContent = (tabName) => {
    setContent(tabName);
  };

  return (
    <>
      <div className="flex gap-1 mt-[0rem] md:overflow-hidden h-full  ">
        <div className="left_Sec md:w-[17rem] ">
          <SideNavDashBoard action={handleTabContent} />
        </div>
        <div className="right_sec w-[95%] pt-5 md:pt-0  pb-14 mx-auto  ">
          <Outlet  />
        </div>
      </div>
    </>
  );
};

export default YtDashboard;
