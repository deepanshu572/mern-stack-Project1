import React, { useState } from "react";
import SideNavDashBoard from "../components/SideNavDashBoard";
import SideNavRightSec from "../components/SideNavRightSec";
const YtDashboard = () => {
 const [content, setContent] = useState("dashboard");
 const handleTabContent = (tabName) =>{
   setContent(tabName);
 }

  return (
    <>
      <div className="flex gap-1 mt-[0rem]  ">
        <div className="left_Sec w-[17rem] ">
          <SideNavDashBoard action={handleTabContent} />
        </div>
        <div className="right_sec w-[95%] my-2 mt-[3rem] m-auto  ">
          <SideNavRightSec tab={content}  />
        </div>
      </div>
    </>
  );
};

export default YtDashboard;
