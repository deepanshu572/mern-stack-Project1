import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const YtRevenue = () => {
  const channelData = useSelector((state) => state.usersData.channelData);
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    if (channelData) {
      setChannel(channelData);
    }
  }, [channelData]);
  return (
    <div className="m-h-full h-screen w-full pt-[3rem] ">
      <h2 className="text-3xl font-bold">Revenue Dashboard</h2>
      <p class="text-xs pt-1 border-b border-[#393939e4] pb-2 text-[#5e5e5e]">
        Here you can view the revenue of your channel, including video
        performance, audience demographics, and revenue insights.
      </p>
    </div>
  );
};

export default YtRevenue;
