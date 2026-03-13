import React, { useState } from "react";
import { IoTimerSharp } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { IoAnalyticsSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { IoIosLogOut } from "react-icons/io";
import studio from "../../public/img/studio.png"
import { useDispatch, useSelector } from "react-redux";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import axios from "axios";
import { serverUrl } from "../App";
import { getUserData } from "../redux/userSlice";
import { alertHandler } from "./CustomAlert";
import { FaPlus } from "react-icons/fa6";

const SideNavDashBoard = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
    const user = useSelector((state) => state.usersData.userData);
   const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const arr = [
    {
      name: "DashBoard",
      svg: <IoTimerSharp className="w-5 h-5" />,
      path: "/Ytstudio",
    },
    {
      name: "Content",
      svg: <IoVideocam className="w-5 h-5" />,
      path: "/Ytstudio/content",
    },
    {
      name: "Create",
      svg: <FaPlus className="w-5 h-5" />,
      path: "/create",
    },
    {
      name: "Analytic",
      svg: <IoAnalyticsSharp className="w-5 h-5" />,
      path: "/Ytstudio/analytic",
    },
    {
      name: "Revenue",
      svg: <RiMoneyRupeeCircleFill className="w-5 h-5" />,
      path: "/Ytstudio/revenue",
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
    <>
    {/* <div className={`h-screen w-[11rem]  md:block `}> */}
    <div className="h-screen hidden md:block max-sm:absolute  bottom-0 z-20  w-55 left-0 top-0 bg-black justify-between p-3  px-0  border-r border-r-gray-900 md:flex flex-col items-center ">
      <div className="flex w-full flex-col mt-0 gap-1  ">
        <Link to={'/'} className="img_wrap flex items-center mb-4 px-2 bg-black z-9">
        <img src={studio} className="w-10" alt="" />
        <h3>YtStudio</h3>
      </Link>
        {arr?.map((item, index) => {
          return (
            <div 
            onClick={() => {
                setSelectedIndex(index);
                navigate(item?.path)
              }}
              className={`p-2 text-xs flex items-center gap-1.5 px-4  cursor-pointer ${location.pathname == item?.path ? "bg-[#161616]" : ""}`}
            >
              {item?.svg} {item?.name}
            </div>
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
            <div className="ml-2 flex flex-col items-start">
              <h3 className="text-[13px]">{user?.username}</h3>
              <p className="text-[10px] text-[#6b6b6b]">@{user?.username}</p>
            </div>
          </div>
          <button onClick={logoutHandler} className="cursor-pointer">
          <IoIosLogOut /></button>
        </button>
      </div>
    {/* </div> */}
    </div>
     <Link to={'/'} className="img_wrap z-10 md:hidden fixed top-0 left-0 w-full bg-black p-2 flex items-center mb-4 px-2">
        <img src={studio} className="w-10" alt="" />
        <h3>YtStudio</h3>
      </Link>

    <div className="fixed md:hidden bg-black   bottom-0 left-0 w-full flex gap-1 items-center justify-between">
        {arr?.map((item, index) => {
          return (
            <div
              onClick={() => {
                setSelectedIndex(index);
                navigate(item?.path)
              }}
              className={`p-2 text-xs flex flex-col items-center gap-1.5 px-4  cursor-pointer ${location.pathname == item?.path ? "bg-[#161616]" : ""}`}
            >
              {item?.svg} {item?.name}
            </div>
          );
        })}
 
    </div>
    </>
  
  );
};

export default SideNavDashBoard;
