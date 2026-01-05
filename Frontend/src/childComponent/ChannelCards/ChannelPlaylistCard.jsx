import React from "react";
import { timeAgo } from "../../Utils/timeConvertor";

import { CgPlayListAdd } from "react-icons/cg";

const ChannelPlaylistCard = ({ data, channel }) => {
  return (
    <div className="playlist_box">
      <div className="playlist_item w-65 flex justify-center relative ">
        <img  src={data?.selectedVideos?.[0]?.videoBanner} className="bg_playlist  rounded-xl blur-[0.6px]  h-full object-cover w-[87%] top-[-5px]   absolute z-2"/>
        <img  src={data?.selectedVideos?.[0]?.videoBanner} className="bg_playlist rounded-xl blur-[0.6px]  h-full object-cover w-[93%]   absolute z-2"/>
        <img src={data?.selectedVideos?.[0]?.videoBanner} className="w-full top-[5px] rounded-xl h-full object-cover relative z-4"/>
      
      <div className=" play w-fit bg-[#0009]  px-1 py-[qpx] flex items-center justify-center absolute bottom-[-5px] right-0 z-9">
          <CgPlayListAdd className="w-4 h-4" />
            <p className="text-[11px] ">{data?.selectedVideos?.length} Videos</p>
          </div>
        </div>
        <div className="title_play mt-3">
              <p className="text-[12px] title_elipse uppercase">{data?.title}</p>
               <p className="text-[10px] text-gray-500 ">Updated {timeAgo(data?.createdAt)}</p>
               <p  className="font-bold text-[10px] text-gray-500 ">View full playlist</p>
        </div>
    </div>
  );
};

export default ChannelPlaylistCard;
