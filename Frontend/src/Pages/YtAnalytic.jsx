import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const YtAnalytic = () => {
  const channelData = useSelector((state) => state.usersData.channelData);
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    if (channelData) {
      setChannel(channelData);
    }
  }, [channelData]);

  // --------- videos Chart Data ------------

  const videoChart = (channel?.videos || []).map((video) => ({
    title:
      video?.title?.length > 10
        ? video?.title?.slice(0, 10) + "...."
        : video?.title,
    views: video?.views || 0,
  }));

  // --------- shorts Chart Data ------------
  const shortChart = (channel?.shorts || []).map((short) => ({
    title:
      short?.title?.length > 10
        ? short?.title?.slice(0, 10) + "...."
        : short?.title,
    views: short?.views || 0,
  }));
    console.log(videoChart, shortChart);

  return (
    <div className="m-h-full h-screen overflow-y-scroll md:max-h-[102vh] scroll_hide w-full pt-[3rem] ">
      <h2 className="text-3xl font-bold">Analytic Dashboard</h2>
      <p class="text-xs pt-1 border-b border-[#393939e4] pb-2 text-[#5e5e5e]">
        Here you can view the analytics of your channel, including video
        performance, audience demographics, and revenue insights.
      </p>

      <div className="p-4">
     <ResponsiveContainer width="100%" height={300}>
  <LineChart data={videoChart}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="title" tick={{ fontSize: 10 }} />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="views"
      stroke="#ff7300"
      strokeWidth={2}
    />
  </LineChart>
</ResponsiveContainer>
      </div>
      <div className="p-4">
          <ResponsiveContainer width="100%" height={300}>
  <LineChart data={shortChart}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="title" tick={{ fontSize: 10 }} />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="views"
      stroke="#ff7300"
      strokeWidth={2}
    />
  </LineChart>
</ResponsiveContainer>
      </div>
    </div>
  );
};

export default YtAnalytic;
