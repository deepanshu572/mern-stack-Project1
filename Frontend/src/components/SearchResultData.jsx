import React, { useEffect, useState , useContext } from "react";
import { Link } from "react-router-dom";
import { timeAgo } from "../Utils/timeConvertor";
const SearchResultData = ({ video }) => {
  console.log(video)
  
  return (
    <>
      <Link
        to={`/video/${video?._id}`}
        className={`card hover:bg-[#1a1a1a92]  w-[95%] sm:w-full m-auto sm:m-0 flex flex-col  sm:flex-row `}
        href="#"
        data-discover="true"
      >
        <div className="card_video w-full h-[220px] sm:w-[350px] sm:h-[197px] flex-shrink-0 ">
          {video?.videoBanner ? (
            <img
              src={video?.videoBanner}
              alt="Thumbnail"
              className="w-full h-full object-cover rounded-[10px]"
            />
          ) : (
            <p>No thumbnail available</p>
          )}
        </div>
        <div className="flex items-center w-full sm:items-start sm:gap-3 sm:pt-[14px]">
          <div className="left flex-shrink-0 p-2 ">
            {video?.channel ? (
              <img
                className="w-[35px] h-[35px] rounded-full"
                src={video?.channel?.avatar || null}
                alt=""
              />
            ) : (
              <p className="text-[#727272] text-[13px]">No </p>
            )}
          </div>
          <div className="right p-2">
            <div className="card_heading text-[14px] font-[500] sm:text-[14px]">
              {video?.title}
            </div>
            <div className="card_desc text-[#727272] text-[10px] sm:text-[13px]">
              {video?.description}
            </div>
            <div className="card_desc mt-1 text-[#535353] text-[10px] sm:text-[13px]">
              {video?.channel?.
name
}
            </div>
            <div className="card_info flex gap-3 items-center text-[#727272] text-[13px]">
              <p>{video?.views} views</p> 
              <p className="flex items-center gap-1">
                <span className="text-sm">•</span> {timeAgo(video?.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SearchResultData;
