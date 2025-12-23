import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { RiVideoAddFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";

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

const Header = () => {
  const user = useSelector((state) => state.usersData.userData);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);
  const [mobileToggle, setMobileToggle] = useState(true);
  const [visible, setvisible] = useState(false);
  const navigate = useNavigate();
  const handleMobileToggle = () => {
    setMobileToggle(!mobileToggle);
  };
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
  const svg = (
    <svg
      className={`w-[4.8rem] sm:w-[5.3rem] ${
        toggle ? "fill-black" : "fill-white"
      }`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 93 20"
      aria-hidden="true"
      focusable="false"
    >
      <g>
        <path
          d="M14.4848 20C14.4848 20 23.5695 20 25.8229 19.4C27.0917 19.06 28.0459 18.08 28.3808 16.87C29 14.65 29 9.98 29 9.98C29 9.98 29 5.34 28.3808 3.14C28.0459 1.9 27.0917 0.94 25.8229 0.61C23.5695 0 14.4848 0 14.4848 0C14.4848 0 5.42037 0 3.17711 0.61C1.9286 0.94 0.954148 1.9 0.59888 3.14C0 5.34 0 9.98 0 9.98C0 9.98 0 14.65 0.59888 16.87C0.954148 18.08 1.9286 19.06 3.17711 19.4C5.42037 20 14.4848 20 14.4848 20Z"
          fill="#FF0033"
        />
        <path d="M19 10L11.5 5.75V14.25L19 10Z" />
      </g>

      <g fill={toggle ? " white" : "black"}>
        {/* YouTube text paths */}
        <path d="M37.1384 18.8999V13.4399L40.6084 2.09994H38.0184L36.6984 7.24994C36.3984 8.42994 36.1284 9.65994 35.9284 10.7999H35.7684C35.6584 9.79994 35.3384 8.48994 35.0184 7.22994L33.7384 2.09994H31.1484L34.5684 13.4399V18.8999H37.1384Z"></path>
        <path d="M44.1003 6.29994C41.0703 6.29994 40.0303 8.04994 40.0303 11.8199V13.6099C40.0303 16.9899 40.6803 19.1099 44.0403 19.1099C47.3503 19.1099 48.0603 17.0899 48.0603 13.6099V11.8199C48.0603 8.44994 47.3803 6.29994 44.1003 6.29994ZM45.3903 14.7199C45.3903 16.3599 45.1003 17.3899 44.0503 17.3899C43.0203 17.3899 42.7303 16.3499 42.7303 14.7199V10.6799C42.7303 9.27994 42.9303 8.02994 44.0503 8.02994C45.2303 8.02994 45.3903 9.34994 45.3903 10.6799V14.7199Z"></path>
        <path d="M52.2713 19.0899C53.7313 19.0899 54.6413 18.4799 55.3913 17.3799H55.5013L55.6113 18.8999H57.6012V6.53994H54.9613V16.4699C54.6812 16.9599 54.0312 17.3199 53.4212 17.3199C52.6512 17.3199 52.4113 16.7099 52.4113 15.6899V6.53994H49.7812V15.8099C49.7812 17.8199 50.3613 19.0899 52.2713 19.0899Z"></path>
        <path d="M62.8261 18.8999V4.14994H65.8661V2.09994H57.1761V4.14994H60.2161V18.8999H62.8261Z"></path>
        <path d="M67.8728 19.0899C69.3328 19.0899 70.2428 18.4799 70.9928 17.3799H71.1028L71.2128 18.8999H73.2028V6.53994H70.5628V16.4699C70.2828 16.9599 69.6328 17.3199 69.0228 17.3199C68.2528 17.3199 68.0128 16.7099 68.0128 15.6899V6.53994H65.3828V15.8099C65.3828 17.8199 65.9628 19.0899 67.8728 19.0899Z"></path>
        <path d="M80.6744 6.26994C79.3944 6.26994 78.4744 6.82994 77.8644 7.73994H77.7344C77.8144 6.53994 77.8744 5.51994 77.8744 4.70994V1.43994H75.3244L75.3144 12.1799L75.3244 18.8999H77.5444L77.7344 17.6999H77.8044C78.3944 18.5099 79.3044 19.0199 80.5144 19.0199C82.5244 19.0199 83.3844 17.2899 83.3844 13.6099V11.6999C83.3844 8.25994 82.9944 6.26994 80.6744 6.26994ZM80.7644 13.6099C80.7644 15.9099 80.4244 17.2799 79.3544 17.2799C78.8544 17.2799 78.1644 17.0399 77.8544 16.5899V9.23994C78.1244 8.53994 78.7244 8.02994 79.3944 8.02994C80.4744 8.02994 80.7644 9.33994 80.7644 11.7299V13.6099Z"></path>
        <path d="M92.6517 11.4999C92.6517 8.51994 92.3517 6.30994 88.9217 6.30994C85.6917 6.30994 84.9717 8.45994 84.9717 11.6199V13.7899C84.9717 16.8699 85.6317 19.1099 88.8417 19.1099C91.3817 19.1099 92.6917 17.8399 92.5417 15.3799L90.2917 15.2599C90.2617 16.7799 89.9117 17.3999 88.9017 17.3999C87.6317 17.3999 87.5717 16.1899 87.5717 14.3899V13.5499H92.6517V11.4999ZM88.8617 7.96994C90.0817 7.96994 90.1717 9.11994 90.1717 11.0699V12.0799H87.5717V11.0699C87.5717 9.13994 87.6517 7.96994 88.8617 7.96994Z"></path>
      </g>
    </svg>
  );
  const handlegoogleAuth = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = res.user;
      let username = displayName;
      let data = await axios.post(serverUrl + "/api/auth/googleauth", {
        username,
        email,
        image: photoURL
      }, {
        withCredentials: true,
      });
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
          className=" z-[999] absolute h-screen w-full"
        ></div>
      ) : (
        ""
      )}
      <div
        className={`top_nav z-999 flex items-center justify-between border-b border-b-[#1a1a1abd] ${
          toggle ? "bg-black text-[#fff]" : "text-black bg-[#fff]"
        } gap-4 sm:justify-between px-[8px] py-[10px] sm:px-5 sm:py-[1rem] fixed w-full `}
      >
        <div className="top_nav_left sm:mr-[10vw] flex lg:gap-5">
          {/* <SlMenu className="hidden sm:block" onClick={handleMobileToggle} /> */}

          <Link to="/">{svg}</Link>
        </div>
        <div className="top_nav_middle  flex items-center gap-3 sm:w-1/3">
          <div
            className={`serch_wrap flex items-center gap-3 sm:w-full border-1 border-[#242424] rounded-full overflow-hidden`}
          >
            <input
              className={` ${
                toggle ? "bg-black text-[#fff]" : "text-black bg-[#fff]"
              } text-[13px]  sm:block  border-0 outline-none px-[17px] py-[4px] sm:w-full `}
              type="text"
              placeholder="Search"
              // onChange={(e) => SetsearchQuery(e.target.value)}
              // onKeyUp={SearchQueryHandler}
              // value={searchQuery}
            />
            <div className="serch bg-[#6f6f6f33] p-3 py-1.5 ">
              <IoSearchOutline
                className={`text-[20px] ${
                  toggle ? " text-[#fff]" : "text-black "
                } `}
              />
            </div>
            {/* <SearchBar key={SearchRelatedData?.results?.value} data={SearchRelatedData} /> */}
          </div>

          <div
            className={`
              rounded-full
             bg-[#6f6f6f33] hover:bg-[#6f6f6f8a] w-8.75 shrink-0 h-8.75 hidden   lg:flex items-center justify-center`}
          >
            <FaMicrophone />
          </div>
        </div>
        <div className="top_nav_right hidden items-center justify-center gap-6 sm:flex">
          <button className="video p-2 rounded-3xl  flex gap-1 items-center hover:bg-[#6f6f6f8a] bg-[#6f6f6f33] ">
            <FaPlus className="w-3 h-3" />
            <p className="text-xs">Create</p>
          </button>
          {/* <div className="hidden sm:inline"> </div> */}
          <div className="profile w-10 h-10" onClick={handleProfile}>
            {user == null ? (
              <div className="w-full h-full bg-gray-600 rounded-full"></div>
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
                ""
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

export default Header;
