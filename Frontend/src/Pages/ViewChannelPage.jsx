import React, { useEffect } from "react";
import SideNav from "../components/SideNav";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Hooks/getCurrentUser";

const ViewChannelPage = () => {
  getUser();

  const user = useSelector((state) => state.usersData.userData);
  console.log(user);

  return (
    <div className="flex">
      <SideNav />
      <div className="view w-full p-4 md:mt-[5rem] ">
        <div className="banner h-45 w-full rounded-md overflow-hidden">
          <img
            className="w-full h-full object-cover object-top "
            src={user?.channel?.bannerImage}
            alt=""
          />
        </div>
        <div className="detail_channel flex flex-col justify-center items-center mt-4">
          <div className="channel_img w-15 h-15 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover  object-top "
              src={user?.channel?.avatar}
              alt=""
            />
          </div>
          <h3>{user?.channel?.name}</h3>
          <p className="text-xs my-1 text-gray-500">@{user?.channel?.name}</p>
          <small className="flex items-center gap-1">
            more about this channel...{" "}
            <p className="text-xs text-[#346eeb] hover:underline cursor-pointer">
              {user?.channel?.category}
            </p>
          </small>
          <div className="btn_box flex gap-4 mt-4">
            <Link to={"/UpdateChannel"}>
              {" "}
              <button className="text-xs p-2 bg-white rounded-2xl px-4 font-medium text-black">
                Customize channel
              </button>
            </Link>
            <button className="text-xs p-2 bg-[#272727] rounded-2xl font-medium px-4 text-white">
              Manage videos
            </button>
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
              Upload and record at home or on the go. Everything you make public
              will appear here.
            </p>

            <Link
              to={"/create"}
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
