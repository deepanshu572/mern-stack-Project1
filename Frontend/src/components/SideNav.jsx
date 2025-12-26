import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SideNavItem from "../childComponent/SideNavItem";
import { categories } from "../Utils/constant";

const SideNav = () => {
  const toggleFnc = useSelector((state) => state.toggle.toggle);
  const [MobileMenu, SetMobileMenu] = useState();

  const [toggle, SetToggle] = useState(true);
  useEffect(() => {
    SetMobileMenu(toggleFnc);
    console.log("toggle value in sidenav:", MobileMenu);
  }, [toggleFnc]);

  return (
    <div className={`nav_side w-full  transition-all duration-700 ease-in-out ${MobileMenu ? " lg:w-[4rem] sm:w-[4rem]" : " lg:w-[15rem] sm:w-[14rem]"}    md:relative  shrink-0   `}>
      <div
        className={`overflow-hidden  sm:side_nav fixed  z-10 sm:pt-[80px] lg:pt-[79px]  ${
          toggle ? "bg-black " : " bg-[#fff]"
        }    
         transition-all duration-500 ease-in-out
         sm:ease-linear sm:duration-0  ${MobileMenu ? " lg:w-[4rem] sm:w-[4rem]" : "lg:w-[15rem] sm:w-[14rem]"}
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
                    <h3 className={` text-[15px] ${MobileMenu ? "hidden" : "block"}`}>You</h3>
                  </div>
                )}
                <SideNavItem
                  text={val.name}
                  key={index}
                  icon={val.icon}
                  name={val.class || ""}
                  MobileMenu={MobileMenu}
                  DataId={val.DataId}
                  action={() => {
                    clickHandler(val.DataId, val.name);
                  }}
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
                      <h3 className={`text-[15px]  ${MobileMenu ? "hidden" : "block"}`}>Subscriptions</h3>
                    </div>
                    <div
                      className={`subscribe_data_box ${
                        toggle ? "border-b-[#1a1a1abd]" : "border-b-[#e6e6e6]"
                      } border-b-[1px] pb-4`}
                    >
                      <div
                        className={` ${MobileMenu ? "justify-center" : ""} subscribe_box hover:bg-[#dedede38] cursor-pointer flex items-center  gap-2 py-[5px] px-[8px] `}
                        onClick={() => FetchSubscribedChannel(item)}
                      >
                        <div className="subscribe_box_img w-[25px] h-[25px] ">
                          <img
                            className=" w-full h-full object-cover rounded-full "
                            src="https://images.unsplash.com/photo-1646446835625-4f23efd5c662?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                          />
                        </div>
                        <p className={`text-[14px] lg:text-[13px] ${MobileMenu ? "hidden" : "block"} `}>T series</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}

          {/* <div className=" sm:hidden px-[11px] py-3   ">
            <h3 className="font-[500] text-[15px] mb-2">Switch mode</h3>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
