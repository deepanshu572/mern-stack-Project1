import React from 'react'
import { timeAgo } from "../../Utils/timeConvertor";

const RelatedShortsData = () => {
  return (
     <div className="shorts shrink-0 w-48 h-63 rounded-xl overflow-hidden relative">
          <video className="w-full h-full object-cover" src={data?.video}></video>
          <div className="absolute p-2 bottom-0 left-0 bg-[#00000057]">
            <h3 className="text-xs title_elipse">{data?.title}</h3>
            <div className="channel flex items-center mt-2 gap-2">
              <div className=" shrink-0 w-6 h-6 overflow-hidden rounded-full">
                <img
                  className="w-full h-full object-cover"
                  src={channel?.avatar}
                  alt=""
                />
              </div>
              <div className="right_post flex flex-col gap-1">
                <h2 className="channel_title text-gray-100 text-xs ">
                  {channel?.name}
                </h2>
                <div className="flex items-center justify-between">
              
                <p className="text-[10px] text-gray-200">
                  {data?.views} views
                </p>
                  <p className="text-[10px] text-gray-200">
                  {timeAgo(data?.createdAt)}
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default RelatedShortsData