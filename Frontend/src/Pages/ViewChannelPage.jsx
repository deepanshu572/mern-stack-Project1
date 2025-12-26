import React from "react";
import SideNav from "../components/SideNav";
import { Link } from "react-router";

const ViewChannelPage = () => {
  return (
    <div className="flex">
      <SideNav />
      <div className="view w-full p-4 md:mt-[5rem] ">
        <div className="banner h-45 w-full rounded-md overflow-hidden">
          <img className="w-full h-full object-cover " src="" alt="" />
        </div>
        <div className="detail_channel flex flex-col justify-center items-center mt-4">
          <div className="channel_img w-15 h-15 rounded-full overflow-hidden">
            <img className="w-full h-full object-cover " src="" alt="" />
          </div>
          <h3>Deepanshu</h3>
          <p>@dk_Zeenat_aara</p>
          <small className="flex items-center gap-1">
            more about this channel...{" "}
            <p className="text-xs text-[#346eeb] hover:underline cursor-pointer">
              Study
            </p>
          </small>
          <div className="btn_box flex gap-4 mt-4">
            <button className="text-xs p-2 bg-white rounded-2xl px-4 font-medium text-black">Customize channel</button>
            <button className="text-xs p-2 bg-[#272727] rounded-2xl font-medium px-4 text-white">Manage videos</button>
          </div>
          <div className="create_btn flex flex-col items-center justify-center mt-8 ">
        <div className="create_img">
          <img
            className="w-20 h-20"
            src="https://fplaytube.onrender.com/assets/create-CcBJqj2U.png"
            alt=""
          />
        </div>

       
            <h3 className="font-bold">Create content on any device</h3>
            <p className="text-xs text-[#5e5e5e]">
              Upload and record at home or on the go. Everything you make public will appear here.
            </p>

            <Link to={"/create"}
              
              className="p-2 bg-white text-black rounded-full mt-3 font-medium my-2 text-xs"
            >
              + Create
            </Link>
        
      </div>
        </div>
      </div>
    </div>
  );
};

export default ViewChannelPage;
