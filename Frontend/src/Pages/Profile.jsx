import React from "react";
import SideNav from "../components/SideNav";
import { HiUserCircle } from "react-icons/hi2";
import { Link } from "react-router";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoIosLogOut } from "react-icons/io";
import { MdGroupAdd } from "react-icons/md";
import { PiVideo } from "react-icons/pi";
import { LuListVideo } from "react-icons/lu";
import { BiLike } from "react-icons/bi";

const Profile = () => {
    const linkData = [
  {
    name: "Playlist",
    icon: <LuListVideo className="w-6 h-6" />,
    route: "/PlaylistData",
  },
  {
    name: "Saved video",
    icon: <PiVideo className="w-6 h-6" />,
    route: "/savedData",
  },
  {
    name: "Liked videos",
    icon: <BiLike className="w-6 h-6" />,
    route: "/likeData",
  },
    ];
  const handlegoogleAuth = () => {};
  const logoutHandler = () => {};
  return (
    <div className="flex w-full">
      <SideNav />
      <div className="profile p-4 mt-[7rem] w-full">
        <div className="profile_top flex items-center mb-6 gap-2 border-b border-gray-800 w-full px-2 pb-3">
          <div className="profile_img w-20 h-20 rounded-full flex items-center justify-center">
            <HiUserCircle className="w-18 h-18" />
            {/* <img className='w-full h-full object-cover' src="" alt="" /> */}
          </div>
          <div className="text">
            <h4>Deepanshu coder</h4>
            <p className="text-gray-600 text-sm">krdeepanshu@gmail.com</p>
            {1 == 1 ? (
              <Link to={"/CreateChannel"}>
                {" "}
                <p className="text-xs text-[#346eeb] hover:underline cursor-pointer">
                  Create channel
                </p>
              </Link>
            ) : (
              <Link to={"/viewChannel"}>
                {" "}
                <p className="text-xs text-[#346eeb] hover:underline cursor-pointer">
                  View channel
                </p>
              </Link>
            )}
          </div>
        </div>
        <div className="profile_slide overflow-x-auto flex gap-2 detail_login border-b border-gray-800 pb-6  ">
          <div
            onClick={handlegoogleAuth}
            className="btn_option shrink-0 rounded-4xl bg-[#323131bd] p-2 px-3 cursor-pointer text-[10px]  flex items-center gap-2"
          >
            <div className="icon">
              <FcGoogle />
            </div>
            <p className="text-[13px]">Signin With Google account</p>
          </div>
          <Link
            to={"/register"}
            className="btn_option  shrink-0  rounded-4xl bg-[#323131bd] p-2 px-3 cursor-pointer text-[10px]   flex items-center gap-2"
          >
            <div className="icon">
              <MdGroupAdd />{" "}
            </div>
            <p className="text-[13px]">Create new account</p>
          </Link>
          <Link
            to={"/login"}
            className="btn_option   shrink-0  rounded-4xl bg-[#323131bd] p-2  cursor-pointer text-[10px]  flex items-center gap-2"
          >
            <div className="icon">
              <AiOutlineUsergroupAdd />
            </div>
            <p className="text-[13px]">Signin With other account</p>
          </Link>
          {(1 == 1) == null ? (
            ""
          ) : (
            <div
              onClick={logoutHandler}
              className="btn_option rounded-4xl bg-[#323131bd] p-2 cursor-pointer text-[10px] shrink-0  flex items-center gap-2"
            >
              <div className="icon">
                <IoIosLogOut />
              </div>
              <p className="text-[13px]">Sign out</p>
            </div>
          )}
        </div>
        <div className="profile_items">
          <div className="profile_data mt-3">
            <h4 className="text-lg p-2 ">Your Profile</h4>
            {linkData?.map((item) => {
              return (
                <Link
                to={item.route}
                  className={` flex items-center gap-2 p-3 pb-1.5  cursor-pointer transition-all duration-300 ease-in-out flex`}
                >
                  {item.icon}
                  <p className={`text-md `}>{item.name}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
