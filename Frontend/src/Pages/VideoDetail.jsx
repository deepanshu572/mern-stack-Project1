import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { IoMdArrowRoundDown } from "react-icons/io";

import { FaRegSave } from "react-icons/fa";

import ReactPlayer from "react-player";
import RelatedVideoData from "../childComponent/RelatedVideoData";
// import RelatedVideoData from "./RelatedVideoData";

const VideoDetail = () => {
  const [video, SetVideo] = useState();
  const [relatedVideo, SetRelatedVideo] = useState();
  const [Channel, SetChannel] = useState();
  const { toggle, Settoggle } = useState(true);
  const [Subscribe, SetSubscribe] = useState();
  const { id } = useParams();

  return (
    <>
      <div className="flex justify-center w-full pt-[2.7rem] sm:px-[3rem] sm:pt-[5.2rem] flex-col sm:flex-col lg:flex-row">
        <div className="wraper relative lg:w-[44rem] ">
          <div className="fixed w-full yt_player  sm:relative sm:h-[26rem] lg:h-[22rem] lg:w-[44rem]  h-[14.7rem]  flex-shrink-0">
            <ReactPlayer
              className="react-player"
              width="100%"
              height="100%"
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
            />
            <div
              className={`blank sm:hidden ${
                toggle ? "bg-black " : " bg-[#fff]"
              } `}
            ></div>
          </div>

          <div className="yt_desc mt-[15rem] sm:mt-0 px-[18px] sm:px-0 py-[10px]">
            <div className="top">
              <h3 className=" font-[600] text-[13px] sm:text-[16px]">
                video?.snippet?.title
              </h3>
              <div className="yt_time flex items-center gap-[6px] py-[2px] ">
                <p
                  className={`${
                    toggle ? " text-[#fff]" : "text-black "
                  } text-[12px] `}
                >
                  Views
                </p>
                <div
                  className={`w-[2px] h-[2px] rounded-full ${
                    toggle ? "bg-black text-[#fff]" : "text-black bg-[#fff]"
                  } `}
                ></div>
                <p
                  className={` ${
                    toggle ? " text-[#fff]" : "text-black "
                  } text-[12px]`}
                >
                  time
                </p>
              </div>
            </div>
            <div className="wrapper_dets flex sm:items-center flex-col sm:flex-row sm:justify-between ">
              <div className="chanel_dets flex items-center justify-between py-[7px] sm:gap-[20px] ">
                <div className="chanel_left flex items-center gap-[12px] ">
                  {/* <img
                    className=" w-[30px] rounded-full "
                    src={Channel?.snippet?.thumbnails?.high?.url}
                    alt=""
                  /> */}
                  <h4 className=" text-[13px] font-[500] ">
                    Channel?.snippet?.title
                  </h4>
                  <small className=" text-[#383838] font-[700] text-[12px] ">
                    subscribe
                  </small>
                </div>
                <div className="chanel_right">
                  {/* <button className="bg-black text-white rounded-[40px] px-[18px] py-[9px] text-[11px]" onClick={()=>subscribeFetcher(video)} >Subscribe</button> */}

                  <button
                    className={`
    font-[500] rounded-[40px] px-[18px] py-[9px] text-[11px]
    
  `}
                  ></button>
                </div>
              </div>
              <div className="bottom flex items-center justify-between py-[10px] gap-[9px] overflow-x-scroll sm:gap-[10px] ">
                <div
                  className={`icon_sec_wrap flex items-center  gap-2 px-[10px] py-[4px]  ${
                    toggle
                      ? "bg-[#1d1d1d] text-[#fff]"
                      : "text-black bg-[#e3e3e3]"
                  } rounded-[27px] `}
                >
                  <div className="icon1 flex items-center gap-2 text-[12px]">
                    <BiLike />
                    {/* <BiSolidLike /> */}

                    <p>likes</p>
                  </div>
                  <p>|</p>
                  <div className="icon2">
                    {/* <BiSolidDislike /> */}

                    <BiDislike />
                  </div>
                </div>
                <div
                  className={`icon3 flex items-center gap-2 px-[8px] py-[6px] text-[12px]   rounded-[20px]  ${
                    toggle
                      ? "bg-[#1d1d1d] text-[#fff]"
                      : "text-black bg-[#e3e3e3]"
                  }`}
                >
                  <RiShareForwardLine />
                  <p>Share</p>
                </div>
                <div
                  className={`icon3 flex items-center gap-2  px-[8px] py-[6px]  text-[12px]  rounded-[20px] ${
                    toggle
                      ? "bg-[#1d1d1d] text-[#fff]"
                      : "text-black bg-[#e3e3e3]"
                  } `}
                >
                  <FaRegSave />

                  <p>Save</p>
                </div>
                <div
                  className={`icon3 flex items-center gap-2  px-[8px] py-[6px]  text-[12px]  rounded-[20px] ${
                    toggle
                      ? "bg-[#1d1d1d] text-[#fff]"
                      : "text-black bg-[#e3e3e3]"
                  } `}
                >
                  <IoMdArrowRoundDown />

                  <p>Download</p>
                </div>
              </div>
            </div>
            <div
              className={`comment h-[57px] p-3 py-2 w-full ${
                toggle ? "bg-[#1d1d1d] text-[#fff]" : "text-black bg-[#fff]"
              } rounded-[10px]   `}
            >
              <h3 className=" text-[13px] ">Comments comments</h3>
              <p className="text-[10px]">Click Here To View Comments</p>
            </div>
          </div>
        </div>
        <div className="yt_player_content">
          <div className="yt_related_data flex item-center gap-[2px] flex-col  sm:overflow-y-scroll sm:h-[100vh] ">
            {/* {relatedVideo?.length > 0 &&
              relatedVideo.map((item, index) => {
                // console.log(item.snippet.channelId);
                return  <RelatedVideoData item={item} channelData={item?.snippet?.channelId} index={index}/>

                })} */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
              return (
                <RelatedVideoData
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
