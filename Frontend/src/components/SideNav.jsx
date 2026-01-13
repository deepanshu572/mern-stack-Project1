import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SideNavItem from "../childComponent/SideNavItem";
import { categories } from "../Utils/constant";
import { Link, useLocation, useNavigate } from "react-router";
import { getUser } from "../Hooks/getCurrentUser";

const SideNav = () => {
  getUser()
  const toggleFnc = useSelector((state) => state.toggle.toggle);
  const user = useSelector((state) => state.usersData.userData);

  const [MobileMenu, SetMobileMenu] = useState();
  const [userChannel, setuserChannel] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [toggle, SetToggle] = useState(true);
  useEffect(() => {
    SetMobileMenu(toggleFnc);
  }, [toggleFnc]);

  useEffect(() => {
    if (user || user?.length > 0) {
      setuserChannel(user);
    }
  }, [user]);

  return (
    <div
      className={`nav_side w-full  transition-all duration-700 ease-in-out ${
        MobileMenu ? " lg:w-[4rem] sm:w-[4rem]" : " lg:w-[15rem] sm:w-[14rem]"
      }    md:relative  shrink-0   `}
    >
      <div
        className={`overflow-hidden  sm:side_nav fixed  z-10 sm:pt-[80px] lg:pt-[79px]  ${
          toggle ? "bg-black " : " bg-[#fff]"
        }    
         transition-all duration-500 ease-in-out
         sm:ease-linear sm:duration-0  ${
           MobileMenu ? " lg:w-[4rem] sm:w-[4rem]" : "lg:w-[15rem] sm:w-[14rem]"
         }
         py-1 w-full     
           sm:top-0 lg:left-0 z-1 bottom-0`}
      >
        <div className=" overflow-hidden  cursor-pointer transition-all duration-300 ease-in-out flex items-center justify-center gap-[13px] sm:block sm:h-[92vh] sm:px-2 sm:pt-2  sm:pb-7 sm:scrollControll border-r border-r-[#1a1a1abd]">
          {categories.map((val, index) => {
            return (
              <>
                {val.title && (
                  <div
                    className={`hidden sm:block   ${
                      toggle ? "border-t-[#1a1a1abd]" : "border-t-[#e6e6e6]"
                    } border-t  p-2`}
                  >
                    <h3
                      className={` text-[15px] ${
                        MobileMenu ? "hidden" : "block"
                      }`}
                    >
                      You
                    </h3>
                  </div>
                )}
                <SideNavItem
                  text={val.name}
                  key={index}
                  icon={val.icon}
                  name={val.class || ""}
                  MobileMenu={MobileMenu}
                  DataId={val.DataId}
                  somename={
                    location.pathname === val.route ? "bg-[#161616]" : ""
                  }
                  action={() => navigate(val.route)}
                />
                {val.divider && (
                  <p
                    className={`sm:hidden my-2 ${
                      toggle ? "border-b-[#1a1a1abd]" : "border-b-[#e6e6e6]"
                    } border-b-[1px]`}
                  ></p>
                )}
                {val.addData && (
                  <div className="subs border-t-[1px] border-t-[#1a1a1abd]">
                    <div className="p-2">
                      <h3
                        className={`text-[15px]  ${
                          MobileMenu ? "hidden" : "block"
                        }`}
                      >
                        Subscriptions
                      </h3>
                    </div>
                    <div
                      className={`subscribe_data_box ${
                        toggle ? "border-b-[#1a1a1abd]" : "border-b-[#e6e6e6]"
                      } border-b-[1px] pb-4`}
                    >
                      {userChannel?.subscriptions?.map((item) => {
                        return (
                          <Link to={`/ChannelDetail/${item?._id}`}
                            className={` ${
                              MobileMenu ? "justify-center" : ""
                            } subscribe_box hover:bg-[#161616] cursor-pointer flex items-center  gap-2 py-[5px] px-[8px] `}
                          
                          >
                            <div className="subscribe_box_img w-[25px] h-[25px] ">
                              <img
                                className=" w-full h-full object-cover rounded-full object-top "
                                src={item?.avatar}
                                alt=""
                              />
                            </div>
                            <p
                              className={`text-[12.5px] sm:text-[13px]  ${
                                MobileMenu ? "hidden" : "block"
                              } `}
                            >
                              {item?.name}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            );
          })}

        
        </div>
      </div>
    </div>
  );
};

export default SideNav;
