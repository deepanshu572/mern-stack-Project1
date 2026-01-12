import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { IoMdArrowRoundDown } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { PiVideo } from "react-icons/pi";

import { FaRegSave } from "react-icons/fa";

import { useSelector } from "react-redux";
import RelatedVideoData from "../childComponent/VideoDetail/RelatedVideoData";
import RelatedShortsData from "../childComponent/VideoDetail/RelatedShortsData";
import ChannelShortsCard from "../childComponent/ChannelCards/ChannelShortsCard";

const VideoDetail = () => {
  const videos = useSelector((state) => state.content.videos);
  const shorts = useSelector((state) => state.content.shorts);

  const [videoData, setVideoData] = useState();
  const [relatedVideo, setRelatedVideo] = useState();
  const [relatedshorts, setRelatedshorts] = useState();
  const { toggle, Settoggle } = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (videos?.length > 0 || videos !== null) {
      const Allvideos = videos.find((item) => item?._id === id);
      const AllrelatedVideos = videos.filter(
        (item) => item?.tags == Allvideos?.tags
      );
      const AllrelatedShorts = shorts.filter(
        (item) => item?.tags == Allvideos?.tags
      );
      const shuffledRelatedShorts = [...AllrelatedShorts].sort(
        () => Math.random() - 0.5
      );
      const shuffledrelatedVideos = [...AllrelatedVideos].sort(
        () => Math.random() - 0.5
      );
      setVideoData(Allvideos);
      setRelatedVideo(shuffledrelatedVideos);
      setRelatedshorts(shuffledRelatedShorts);
    }
  }, [id]);
  console.log(videoData, videos, relatedVideo, relatedshorts);

  return (
    <>
      <div className="flex justify-center w-full pt-[2.7rem] sm:px-[3rem] sm:pt-[5.2rem] flex-col sm:flex-col lg:flex-row">
        <div className="wraper relative lg:w-[44rem] ">
          <div className="fixed w-full yt_player z-1080   sm:relative sm:h-[26rem] lg:h-[22rem] lg:w-[44rem]  h-[14.7rem]  flex-shrink-0">
            <video
              className="react-player bg-black  relative z-1080  w-full h-full"
              src={videoData?.video}
              muted
              controls
            ></video>
            <div className={`blank sm:hidden bg-black `}></div>
          </div>

          <div className="yt_desc mt-[15rem] sm:mt-0 px-[18px] sm:px-0 py-[10px]">
            <div className="top">
              <h3 className=" font-[600] text-[13px] sm:text-[16px]">
                {videoData?.title}
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
                  <img
                    className=" w-[30px] h-[40px] rounded-full "
                    src={videoData?.channel?.avatar}
                    alt=""
                  />
                  <h4 className=" text-[13px] font-[500] ">
                    {videoData?.channel?.name}
                  </h4>
                </div>
                <div className="chanel_right">
                  <button
                    className="bg-black text-white rounded-[40px] px-[18px] py-[9px] text-[11px]"
                    onClick={() => subscribeFetcher(video)}
                  >
                    Subscribe
                  </button>
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
            <h4 className="p-4 flex items-center gap-2">
              <SiYoutubeshorts /> Related Shorts
            </h4>
            <div className="flex items-center p-4 gap-3 overflow-x-auto">
              {relatedshorts?.map((item, index) => {
                return (
                  <ChannelShortsCard
                    data={item}
                    key={index}
                    channel={item?.channel}
                  />
                );
              })}
            </div>
            <h4 className="p-4  flex items-center gap-2">
              {" "}
              <PiVideo /> Related Videos
            </h4>
            {relatedVideo?.map((item, index) => {
              return <RelatedVideoData data={item} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
