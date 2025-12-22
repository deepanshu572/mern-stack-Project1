import React, { useContext, useEffect, useState } from "react";
import { categories } from "../../Utils/constant";
import SideNavItem from "./SideNavItem";
import  Toggle from "../Toogle/Toggle";
import { Context } from "../../context/ContextApi";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../Utils/api";

const SideNav = () => {
  const {
    SetSelectCategories,
    SelectCategories,
    SetMobileMenu,
    MobileMenu,
    SetsubscribeData,
    MobileToggle,
    toggle,
  } = useContext(Context);
  const [subscribed, setSubscribed] = useState([]);
  const nav = useNavigate();

  const clickHandler = (data, name) => {
    if (data === null) {
      switch (name) {
        case "Subscription":
        // nav("/Channel");

        default:
          break;
      }
    } else {
      SetSelectCategories(data);
      nav("/");
    }
  };

  var data = JSON.parse(localStorage.getItem("subscriptions"));
  const FetchChanelData = () => {
    data
      ? data.map((channelId) => {
          if (channelId) {
            fetchDataFromApi(
              `channels/?id=${channelId}&part=snippet,statistics&regionCode=IN&maxResults=20`
            ).then((res) => {
              console.log(res);
              const channelData = res?.items[0];
              if (channelData) {
                setSubscribed((prev) => [
                  ...prev,
                  {
                    ...channelData,
                    channelId: channelId, // Add the channelId here
                  },
                ]);
              }
            });
          } else {
            console.log("Channel not found");
          }
        })
      : console.log("No data");
  };

  useEffect(() => {
    FetchChanelData();
  }, []);

  const FetchSubscribedChannel = (data) => {
    console.log(data);
    nav("/Channel/" + data.snippet.customUrl);

    SetsubscribeData(data);
  };

  return (
    <>
      <div
        className={`side_nav z-10 fixed ${
          toggle ? "bg-black " : " bg-[#fff]"
        } lg:translate-x-0 ${
          MobileMenu ? "translate-x-0" : "-translate-x-full"
        } w-[14rem] h-[100vh] top-[54px]  transition duration-700 ease-in-out sm:ease-linear sm:duration-0 lg:h-[100vh] pt-5 pb-5 p-[6px]  z-[999]  lg:w-[15rem]  lg:top-[9%] lg:left-0`}
      >
            <div  onClick={MobileToggle} className={` sm:hidden ${
          MobileMenu ? "translate-x-0" : "-translate-x-full"
        } w-screen h-full ${
          toggle ? "bg-[#00000094] " : " bg-[#ffffff94]"
        }  z-[-1] absolute left-0 top-0 `}> </div>
      <div className="overflow-y-scroll h-[92vh] pb-7 sm:scrollControll">
        {categories.map((val, index) => {
          return (
            <>
              {val.title && (
                <div className={` px-[11px] py-3 ${toggle
                      ? "border-t-[#262626]"
                      : "border-t-[#e6e6e6]"} border-t-[1px] `}>
                  <h3 className="font-[500] text-[15px] ">Explore</h3>
                </div>
              )}
              <SideNavItem
                text={val.name}
                key={index}
                icon={val.icon}
                DataId={val.DataId}
                action={() => {
                  clickHandler(val.DataId, val.name);
                }}
                className={`
                ${
                  SelectCategories === val.DataId
                    ? toggle
                      ? "bg-[#262626]"
                      : "bg-[#e6e6e6]"
                    : ""
                }
              `}
              />
              {val.divider && <p className={`my-2 ${toggle
                      ? "border-b-[#262626]"
                      : "border-b-[#e6e6e6]"} border-b-[1px]`} ></p>}
              {val.addData && (
                <div className="px-[11px] py-[4px]">
                  <h3 className="font-[500] text-[15px] pb-[10px] ">
                    All Subscription
                  </h3>

                  <div className={`subscribe_data_box ${toggle
                      ? "border-b-[#262626]"
                      : "border-b-[#e6e6e6]"} border-b-[1px] pb-4`}>
                    {subscribed ? (
                      subscribed?.slice(0, 6).map((item) => {
                        return (
                          <div
                            className="subscribe_box hover:bg-[#dedede38] cursor-pointer flex items-center  gap-2 py-[5px] px-[8px]  "
                            onClick={() => FetchSubscribedChannel(item)}
                          >
                            <div className="subscribe_box_img w-[25px] h-[25px] ">
                              {item ? (
                                <img
                                  className=" w-full h-full object-cover rounded-full "
                                  src={item?.snippet?.thumbnails?.high?.url}
                                  alt=""
                                />
                              ) : (
                                <img
                                  className=" w-full h-full object-cover rounded-full "
                                  src="https://avatar.iran.liara.run/public/girl"
                                  alt=""
                                />
                              )}
                            </div>
                            <p className="text-[14px] lg:text-[13px] ">
                              {item?.snippet?.title}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <p>----</p>
                    )}
                  </div>
                  {/* {subscribed ? (
                    <Link
                      to={`/feed/channels`}
                      className="subscribe_data  hover:bg-[#dedede38] cursor-pointer flex items-center  gap-3 py-[5px] px-[8px]  "
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="20px"
                        width="20px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M4 6h16v2H4zm2-4h12v2H6zm14 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10H4v-8h16v8zm-10-7.27v6.53L16 16z"></path>
                      </svg>
                      <p className="text-[14px] lg:text-[13px] ">
                        All Subscription
                      </p>
                    </Link>
                  ) : (
                    <span> </span>
                  )} */}

                  {/* <div className="view_nav">View more</div> */}
                  {/* <hr className="my-2 border-black/[0.2]" /> */}
                </div>

              )}

            </>
          );
        })}
        <div className=" sm:hidden px-[11px] py-3   ">
                  <h3 className="font-[500] text-[15px] mb-2">Switch mode</h3>
                          <Toggle />

                </div>
                        </div>

      </div>
    </>
  );
};

export default SideNav;
