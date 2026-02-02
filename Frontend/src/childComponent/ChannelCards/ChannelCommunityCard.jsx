import React from "react";
import { timeAgo } from "../../Utils/timeConvertor";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { MdMessage } from "react-icons/md";

const ChannelCommunityCard = ({ data, channel }) => {
  return (
    <div className="community_card bg-[#060606] rounded-xl border w-full sm:w-80 sm:max-h-85 p-4 border-[#1a1a1a] ">
      <div className="header_post flex items-start gap-2">
        <div className="left_post shrink-0 w-6 h-6 overflow-hidden rounded-full">
          <img
            className="w-full h-full object-cover"
            src={channel?.avatar}
            alt=""
          />
        </div>
        <div className="right_post">
          <h2 className="channel_title text-gray-300 text-xs ">
            {channel?.name}
          </h2>
          <p className="text-[11px] text-gray-500">
            {timeAgo(data?.createdAt)}
          </p>
        </div>
      </div>
      <h3 className="text-xs py-4 text-gray-300">{data?.description}</h3>

      <div className="card_img w-full h-40.5 ">
        <img
          className="w-full h-full object-contain"
          src={data?.image}
          alt=""
        />
      </div>
      <div className="card_content_item flex items-center gap-2 mt-3 justify-between">
        <div className="flex items-center gap-3">
        <div className="sec_item flex items-center gap-2">
            <AiOutlineLike/>
            {/* <AiFillLike/> */}
          <p className="text-sm">1</p>
        </div>
        <div className="sec_item flex items-center gap-2">
          {/* <AiFillDislike /> */}
          <AiOutlineDislike />
        </div>
        </div>
        <div className="sec_item flex items-center gap-2">
          <MdMessage/>
        </div>
      </div>
    </div>
  );
};

export default ChannelCommunityCard;
