import React, { useContext } from "react";
import { Link } from "react-router-dom";

const ChannelCard = ({ data }) => {

  const svg = (
    <svg
      className="cursor-pointer "
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
    </svg>
  );
  return (
    <>
      <Link
        to={`/videos/${data?.id?.videoId}`}
        className="channel_card w-full lg:w-[240px]"
      >
        <div className="channel_img w-full overflow-hidden rounded-[10px] h-[200px] sm:h-[145px] ">
          {data ? (
            <img
              className="w-full h-full object-cover"
              src={data?.snippet?.thumbnails?.high?.url}
              alt=""
            />
          ) : (
            <img
              className="w-full h-full object-cover"
              src="https://i.ytimg.com/vi/CW3gjRgL4w4/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBidAfALBDgPRwl8PS_1zKT15FX6g"
              alt=""
            />
          )}
        </div>
        <div className="channel_txt flex py-2 ">
          <p className="text-[12px] font-semibold">{data?.snippet?.title}</p>
          {svg}
        </div>
        <span className="flex gap-1 text-[11px] text-gray-500 ">
          <p>12k view</p>
          <p>•</p>
          <p>3 days ago</p>
        </span>
      </Link>
    </>
  );
};

export default ChannelCard;
