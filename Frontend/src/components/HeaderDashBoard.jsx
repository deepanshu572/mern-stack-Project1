import React, { useContext, useEffect, useState } from "react";
import Ytlogo from '../../public/img/studio.png'
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { RiVideoAddFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { HiUserCircle } from "react-icons/hi2";

import { SlMenu } from "react-icons/sl";
import { MdGroupAdd } from "react-icons/md";

import { FaMicrophone } from "react-icons/fa";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoIosLogOut } from "react-icons/io";
import { serverUrl } from "../App";
import axios from "axios";
import { alertHandler } from "./customAlert";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { toggleSidebar } from "../redux/toggleSlice";
import { TbXboxX } from "react-icons/tb";

const HeaderDashBoard = () => {
  const user = useSelector((state) => state.usersData.userData);
  
  const toggleFnc = useSelector((state) => state.toggle.toggle);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);
  const [togglemic, setTogglemic] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(true);
  const [visible, setvisible] = useState(false);
  const [searchQuery, setsearchQuery] = useState("");
  const navigate = useNavigate();


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
  };
  const handleProfile = () => {
    setvisible(!visible);
  };

  const handlegoogleAuth = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = res.user;
      let username = displayName;
      let data = await axios.post(
        serverUrl + "/api/auth/googleauth",
        {
          username,
          email,
          image: photoURL,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(getUserData(data.data));
      console.log(data, res, "google signin response");
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
  
      {visible ? (
        <div
          onMouseMove={handleProfile}
          className=" z-[1080] absolute h-screen w-full"
        ></div>
      ) : (
        ""
      )}
      <div
        className={`top_nav top-0 z-[1090] flex items-center justify-between border-b border-b-[#1a1a1abd] ${
          toggle ? "bg-black text-[#fff]" : "text-black bg-[#fff]"
        } gap-4 sm:justify-between px-[12px] py-[10px] sm:px-5 sm:py-[1rem] fixed w-full `}
      >
        <div className="top_nav_left sm:mr-[10vw] flex lg:gap-5 items-center">
          

          <Link to="/"><img className={`w-[5.8rem] sm:w-[6.3rem] fill-red-700 `} src={Ytlogo} alt="" /></Link>
        </div>
    
        <div className="top_nav_right hidden items-center justify-center gap-6 sm:flex">
          <Link
            to={"/create"}
            className="video p-2 rounded-3xl  flex gap-1 items-center hover:bg-[#6f6f6f8a] bg-[#6f6f6f33] "
          >
            <FaPlus className="w-3 h-3" />
            <p className="text-xs">Create</p>
          </Link>
          {/* <div className="hidden sm:inline"> </div> */}
          <div className="profile w-10 h-10" onClick={handleProfile}>
            {user == null ? (
              <div className="w-full h-full rounded-full">
                 <HiUserCircle className="w-full h-full" />
              </div>
            ) : (
              <img
                className="w-full h-full object-cover rounded-full object-top"
                src={user?.image}
                alt=""
              />
            )}
          </div>
          {visible ? (
            <div className="absolute top-14  rounded-sm right-5 bg-[#212121]">
              {user == null ? (
               ''
              ) : (
                <div className="detail flex gap-2 p-3 border-b border-b-[#373737bd]">
                  <div className="detail_img w-10 h-10 ">
                    <img
                      className="w-full h-full object-cover rounded-full object-top"
                      src={user?.image}
                      alt=""
                    />
                  </div>
                  <div className="content">
                    <h3 className="text-sm">{user?.username}</h3>
                    <p className="text-xs text-[#7a7a7a]">{user?.email}</p>
                    {!user?.channel > 0 ? (
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
                    {/* <p className="text-xs text-[#346eeb] hover:underline cursor-pointer">
                      Create channel
                    </p> */}
                  </div>
                </div>
              )}

              <div className="detail_login  py-1">
                <div
                  onClick={handlegoogleAuth}
                  className="btn_option hover:bg-[#323131bd] p-7 pl-4 py-1.5 cursor-pointer  flex items-center gap-2"
                >
                  <div className="icon">
                    <FcGoogle />
                  </div>
                  <p className="text-[13px]">Signin With Google account</p>
                </div>
                <Link
                  to={"/register"}
                  className="btn_option  hover:bg-[#323131bd] p-7 pl-4 cursor-pointer py-1.5  flex items-center gap-2"
                >
                  <div className="icon">
                    <MdGroupAdd />{" "}
                  </div>
                  <p className="text-[13px]">Create new account</p>
                </Link>
                <Link
                  to={"/login"}
                  className="btn_option  hover:bg-[#323131bd] p-7 pl-4 cursor-pointer py-1.5 flex items-center gap-2"
                >
                  <div className="icon">
                    <AiOutlineUsergroupAdd />
                  </div>
                  <p className="text-[13px]">Signin With other account</p>
                </Link>
                {user == null ? (
                  ""
                ) : (
                  <div
                    onClick={logoutHandler}
                    className="btn_option  hover:bg-[#323131bd] p-7 pl-4 cursor-pointer py-1.5 flex items-center gap-2"
                  >
                    <div className="icon">
                      <IoIosLogOut />
                    </div>
                    <p className="text-[13px]">Sign out</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderDashBoard;
