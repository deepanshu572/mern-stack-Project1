import React, { useContext, useEffect, useState } from "react";
import SideNavItem from "../childComponent/SideNavItem";
import { categories } from "../Utils/constant";

const SideNav = () => {
  const [toggle, SetToggle] = useState(true);
  const [MobileMenu, SetMobileMenu] = useState(true);
  const MobileToggle = () => {};

  return (
    <>
      <div
        className={`overflow-hidden sm:side_nav z-10 fixed ${
          toggle ? "bg-black " : " bg-[#fff]"
        } lg:translate-x-0 ${
          MobileMenu ? "translate-x-0" : "-translate-x-full"
        }  sm:w-[14rem] sm:h-[100vh] sm:top-[54px] 
         transition duration-700 ease-in-out 
         sm:ease-linear sm:duration-0 lg:h-[100vh] 
         sm:pt-5 sm:pb-5 py-1 w-full    lg:w-[15rem] 
          lg:top-[9%] lg:left-0 z-1 bottom-0`}
      >
        {/* <div
          onClick={MobileToggle}
          className={` sm:hidden ${
            MobileMenu ? "translate-x-0" : "-translate-x-full"
          } w-screen h-full ${
            toggle ? "bg-[#00000094] " : " bg-[#ffffff94]"
          }  z-[-1] absolute left-0 top-0 `}
        >
          {" "}
        </div> */}
        <div className=" overflow-hidden flex items-center justify-center gap-[13px] sm:block sm:h-[92vh] sm:px-2 sm:pt-2  sm:pb-7 sm:scrollControll border-r border-r-[#1a1a1abd]">
          {categories.map((val, index) => {
            return (
              <>
                {val.title && (
                  <div
                    className={`hidden sm:block  ${
                      toggle ? "border-t-[#1a1a1abd]" : "border-t-[#e6e6e6]"
                    } border-t  p-2`}
                  >
                    <h3 className=" text-[15px] ">You</h3>
                  </div>
                )}
                <SideNavItem
                  text={val.name}
                  key={index}
                  icon={val.icon}
                  name={val.class || ""}
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
                  <div className="subs">
                    <div className="p-2">
                      <h3 className="text-[15px]">Subscriptions</h3>
                    </div>
                    <div
                      className={`subscribe_data_box ${
                        toggle ? "border-b-[#1a1a1abd]" : "border-b-[#e6e6e6]"
                      } border-b-[1px] pb-4`}
                    >
                      <div
                        className="subscribe_box hover:bg-[#dedede38] cursor-pointer flex items-center  gap-2 py-[5px] px-[8px]  "
                        onClick={() => FetchSubscribedChannel(item)}
                      >
                        <div className="subscribe_box_img w-[25px] h-[25px] ">
                          <img
                            className=" w-full h-full object-cover rounded-full "
                            src="https://images.unsplash.com/photo-1646446835625-4f23efd5c662?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                          />
                        </div>
                        <p className="text-[14px] lg:text-[13px] ">T series</p>
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
    </>
  );
};

export default SideNav;
