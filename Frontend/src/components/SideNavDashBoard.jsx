import React, { useState } from "react";
import { IoTimerSharp } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { IoAnalyticsSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { IoIosLogOut } from "react-icons/io";
import studio from "../../public/img/studio.png"
import { useDispatch, useSelector } from "react-redux";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import axios from "axios";
import { serverUrl } from "../App";
import { getUserData } from "../redux/userSlice";
import { alertHandler } from "./customAlert";

const SideNavDashBoard = ({ action }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
    const user = useSelector((state) => state.usersData.userData);
   console.log(user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const arr = [
    {
      name: "DashBoard",
      svg: <IoTimerSharp className="w-5 h-5" />,
      path: "dashboard",
    },
    {
      name: "Content",
      svg: <IoVideocam className="w-5 h-5" />,
      path: "content",
    },
    {
      name: "Analytic",
      svg: <IoAnalyticsSharp className="w-5 h-5" />,
      path: "analytic",
    },
    {
      name: "Revenue",
      svg: <RiMoneyRupeeCircleFill className="w-5 h-5" />,
      path: "revenue",
    },
  ];
    const logoutHandler = async () => {
      try {
        let result = await axios.get(serverUrl + "/api/auth/logout", {
          withCredentials: true,
        });
        dispatch(getUserData(null));
        alertHandler(result.data.message);
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className="h-screen w-[11rem]">
    <div className="h-screen fixed w-[13rem] left-0 top-0 bg-black justify-between p-3  px-0  border-r border-r-gray-900 flex flex-col items-center ">
      <div className="flex w-full flex-col mt-0 gap-1 ">
        <Link to={'/'} className="img_wrap flex items-center mb-4 px-2">
        <img src={studio} className="w-10" alt="" />
        <h3>YtStudio</h3>
      </Link>
        {arr?.map((item, index) => {
          return (
            <button
              onClick={() => {
                setSelectedIndex(index);
                action(item?.path);
              }}
              className={`p-2 text-xs flex items-center gap-1.5 px-4  cursor-pointer ${selectedIndex == index ? "bg-[#161616]" : ""}`}
            >
              {item?.svg} {item?.name}
            </button>
          );
        })}
      </div>
      <div className="w-full  border-t border-gray-900 pt-2">
        <button className="text-sm w-full flex items-center justify-between px-2 ">
          <div className="flex">
            <div className="img w-8 h-8">
              <img
                className=" object-cover w-full h-full rounded-full"
                src={user?.image}
                alt=""
              />
            </div>
            <div className="ml-2 flex flex-col">
              <h3 className="text-[13px]">{user?.username}</h3>
              <p className="text-[10px] text-[#6b6b6b]">@{user?.username}</p>
            </div>
          </div>
          <button onClick={logoutHandler} className="cursor-pointer">
          <IoIosLogOut /></button>
        </button>
      </div>
    </div>
    </div>
  
  );
};

export default SideNavDashBoard;
