import React from "react";

const AnalyticDashboard = () => {
  return (
    <div className="m-h-full h-screen w-full ">
      <h2 className="text-3xl font-bold">Analytic Dashboard</h2>
      <p class="text-xs pt-1 border-b border-[#393939e4] pb-2 text-[#5e5e5e]">
        Here you can view the analytics of your channel, including video
        performance, audience demographics, and revenue insights.
      </p>

      {/* <LineChart width={400} height={400} data={data}>
        <XAxis dataKey="name" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        <Line type="monotone" dataKey="pv" stroke="#387908" />
      </LineChart> */}
    </div>
  );
};

export default AnalyticDashboard;
