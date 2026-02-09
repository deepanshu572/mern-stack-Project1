import React from "react";
import SideNavDashBoard from "../components/SideNavDashBoard";
import HeaderDashBoard from "../components/HeaderDashBoard";
const YtDashboard = () => {
  return (
    <>
      <HeaderDashBoard />
      <div className="flex gap-1 mt-[5rem]  ">
        <div className="left_Sec w-[17rem] ">
        <SideNavDashBoard />
        </div>
        <div className="right_sec w-full ">
            rightSec
        </div>
      </div>
    </>
  );
};

export default YtDashboard;
