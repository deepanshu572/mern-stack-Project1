import React from 'react'
import { IoVideocam } from "react-icons/io5";
import { TiEye } from "react-icons/ti";
import { SiYoutubeshorts } from "react-icons/si";
import { PiGooglePlayLogoFill } from "react-icons/pi";
import { AiFillLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { timeAgo } from "../Utils/timeConvertor";
const DashBoard = ({channel}) => {
  return (
     <div className="p-3">
          <div className="head">
            <p className="text-xs text-[#6b6b6b] ">Welcome to YtStudio</p>
            <h2 className="text-2xl font-bold">Hii Deepanshu ✌</h2>
          </div>
          <div className="box_flex flex gap-2 mt-4 flex-wrap ">
            <div className="box cursor-pointer bg-[#0b0b0b61] shrink-0 flex items-center justify-between px-3  w-[14rem] h-[8rem] rounded-md overflow-hidden relative">
              <div className="flex flex-col justify-center h-full ">
                <h1 className="text-3xl font-bold">
                  {channel?.subscribers?.length}
                </h1>
                <h3 className="text-xs text-[#ffff]">Subscribers</h3>
              </div>
              <div className="w-12 h-12 p-3 rounded-full bg-[#5e5e5e1a]">
                <PiGooglePlayLogoFill className="w-full h-full" />
              </div>
            </div>
            <div className="box cursor-pointer bg-[#0b0b0b61] shrink-0 flex items-center justify-between px-3 w-[14rem] h-[8rem] rounded-md overflow-hidden relative">
              <div className="flex flex-col justify-center h-full">
                <h1 className="text-3xl font-bold">
                  {channel?.subscribers?.length}
                </h1>
                <h3 className="text-xs text-[#ffff]">Views</h3>
              </div>
              <div className="w-12 h-12 p-3 rounded-full bg-[#5e5e5e1a]">
                <TiEye className="w-full h-full" />
              </div>
            </div>

            <div className="box cursor-pointer bg-[#0b0b0b61] shrink-0 flex items-center justify-between px-3 w-[14rem] h-[8rem] rounded-md overflow-hidden relative">
              <div className="flex flex-col justify-center h-full ">
                <h1 className="text-3xl font-bold">
                  {channel?.shorts?.length}
                </h1>
                <h3 className="text-xs text-[#ffffff]">shorts</h3>
              </div>
              <div className="w-12 h-12 p-3 rounded-full bg-[#5e5e5e1a]">
                <SiYoutubeshorts className="w-full h-full" />
              </div>
            </div>
            <div className="box cursor-pointer bg-[#0b0b0b61] shrink-0 flex items-center justify-between px-3 w-[14rem] h-[8rem] rounded-md overflow-hidden relative">
              <div className="flex flex-col justify-center h-full">
                <h1 className="text-3xl font-bold">
                  {channel?.videos?.length}
                </h1>
                <h3 className="text-xs text-[#ffff]">Videos</h3>
              </div>
              <div className="w-12 h-12 p-3 rounded-full bg-[#5e5e5e1a]">
                <IoVideocam className="w-full h-full" />
              </div>
            </div>
          </div>
          <div className="channel_wrap flex gap-7 mt-8 items-center ">
            <div className="channel_Data mt-4 ">
              <h3>Latest Videos</h3>
              {channel?.videos?.map((item) => {
                return (
                  <div className="channels_videos mt-4 ">
                    <div className="card_data flex mb-2 items-center gap-2 bg-[#0b0b0b61] p-2 w-[25rem]">
                      <div className="card_img w-30 shrink-0">
                        <img
                          className="w-full h-full "
                          src={item?.videoBanner}
                          alt=""
                        />
                      </div>
                      <div className="card_des flex flex-col gap-1">
                        <h3 className="text-[10px] line-clamp-2">
                          {item?.title}
                        </h3>
                        <h3 className="text-[10px] text-[#666666]">
                          {timeAgo(item?.createdAt)}
                        </h3>
                        <div className="flex gap-4 ">
                          <div className="box flex gap-1 items-center">
                            <AiFillLike className="w-3" />{" "}
                            <p className="text-[10px]">{item?.like?.length}</p>
                          </div>
                          <div className="box flex gap-1 items-center">
                            <TiEye className="w-5" />{" "}
                            <p className="text-[10px]">{item?.views}</p>
                          </div>
                          <div className="box flex gap-1 items-center">
                            <FaCommentDots className="w-2.5" />{" "}
                            <p className="text-[10px]">
                              {item?.comments?.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="channels_shorts  ">
              <h3>Latest Shorts</h3>
              {channel?.shorts?.map((item) => {
                return (
                  <div className="channels_videos mt-4 ">
                    <div className="card_data flex mb-2 items-center gap-2 bg-[#0b0b0b61] p-2 w-[25rem]">
                      <div className="card_img w-30 h-21 shrink-0">
                        <video
                          className="w-full h-full "
                          src={item?.video}
                          alt=""
                        ></video>
                      </div>
                      <div className="card_des flex flex-col gap-1">
                        <h3 className="text-[10px] line-clamp-2">
                          {item?.title}
                        </h3>
                        <h3 className="text-[10px] text-[#666666]">
                          {timeAgo(item?.createdAt)}
                        </h3>
                        <div className="flex gap-4 ">
                          <div className="box flex gap-1 items-center">
                            <AiFillLike className="w-3" />{" "}
                            <p className="text-[10px]">{item?.like?.length}</p>
                          </div>
                          <div className="box flex gap-1 items-center">
                            <TiEye className="w-5" />{" "}
                            <p className="text-[10px]">{item?.views}</p>
                          </div>
                          <div className="box flex gap-1 items-center">
                            <FaCommentDots className="w-2.5" />{" "}
                            <p className="text-[10px]">
                              {item?.comments?.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
  )
}

export default DashBoard