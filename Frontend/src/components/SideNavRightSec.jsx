import React from "react";
import { useSelector } from "react-redux";

import ContentDashBoard from "../childComponent/ContentDashBoard";
import DashBoard from "../childComponent/DashBoard";
import Analytic from "../childComponent/Analytic";

const SideNavRightSec = ({ tab }) => {
  console.log(tab);
  
  const channel = useSelector((state) => state.usersData.channelData);
  return (
    <>
      {tab == "dashboard" && <DashBoard channel={channel} />}

      {tab == "content" && <ContentDashBoard  channel={channel}  />}

      {tab == "analytic" && <Analytic channel={channel} />}
    </>
  );
};

export default SideNavRightSec;
