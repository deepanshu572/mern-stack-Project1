import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import VideoCard from "../childComponent/VideoCard";
import ChannelShortsCard from "../childComponent/ChannelCards/ChannelShortsCard";
import { SiYoutubeshorts } from "react-icons/si";
import { PiVideo } from "react-icons/pi";
import axios from "axios";
import { serverUrl } from "../App";

const SavedLikedData = () => {
  const [shorts, setShorts] = useState();
  const [videos, setVideos] = useState();
  const handleLikedData = async () => {
    try {
      const { data } = await axios.get(serverUrl + "/api/content/likeData", {
        withCredentials: true,
      });
      setVideos(data?.video);
      setShorts(data?.short);
      console.log(data?.video, data?.short);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLikedData();
  }, []);

  return (
    <div className="flex">
      <SideNav />
      <div className=" w-full p-4 md:mt-[5rem]">
        <h4 className="p-4 pl-1 text-sm mt-3 flex items-center gap-2">
          {" "}
          <SiYoutubeshorts className="fill-[#FF0033] w-6 h-8" /> Liked shorts
        </h4>
        <div className="liked hide_scroll p-2 flex overflow-x-auto justify-center sm:justify-start  w-full ml-auto gap-5 sm:gap-[10px]  sm:pt-[8px]">
          {shorts?.map((item, index) => {
            return (
              <ChannelShortsCard
                key={index}
                data={item}
                channel={item?.channel}
              />
            );
          })}
        </div>
        <h4 className="p-4 pl-1 text-sm mt-3 flex items-center gap-2">
          {" "}
          <PiVideo className="fill-[#FF0033] w-6 h-8" /> Liked Videos
        </h4>
        <div className="liked flex flex-wrap justify-center sm:justify-start   ml-auto sm:gap-[10px]  pt-[8px]">
          {videos?.map((item, index) => {
            return (
              <VideoCard
                id={item?._id}
                image={item?.videoBanner}
                video={item?.video}
                title={item?.title}
                views={item?.views}
                description={item?.description}
                channel={item?.channel}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SavedLikedData;
