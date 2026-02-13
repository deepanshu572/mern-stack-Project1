import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { timeAgo } from "../Utils/timeConvertor";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";

const ContentDashBoard = ({ channel }) => {
  const [selectedContent, setSelectedContent] = useState("videos");
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log(channel);
  const arr = [
    {
      name: "Videos",
      path: "videos",
    },
    {
      name: "Shorts",
      path: "shorts",
    },
    {
      name: "Playlist",
      path: "playlists",
    },
    {
      name: "community",
      path: "communityPosts",
    },
  ];
  return (
    <div className="p-2">
      <h3 className="mb-4 text-2xl font-bold">Your contents</h3>
      <div className="flex_tab flex border-b border-b-[#393939] gap-5 w-full">
        {arr?.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                setSelectedContent(item?.path);
                setSelectedIndex(index);
              }}
              className={`text-sm px-1 pt-1 cursor-pointer ${selectedIndex == index ? "border-b-2 border-b-[#b61111]" : "text-gray-500  border-b-2 border-b-transparent"} pb-1 capitalize`}
            >
              {item?.name}
            </button>
          );
        })}
      </div>
      {selectedContent == "videos" && (
        <div className="border w-full mt-3 border-[#2d2d2dc2] ">
          <div className="flex_items bg-gray-900 flex gap-1 items-center justify-between w-full py-1 ">
            <h3 className="p-1 px-4 text-[13px] w-[15rem]">Thumbnails</h3>
            <h3 className="p-1 px-4 text-[13px] w-[15rem]">Title</h3>
            <h3 className="p-1 px-4 text-[13px] w-[15rem]">Views</h3>
            <h3 className="p-1 px-4 text-[13px] w-[15rem]">Edit</h3>
          </div>
          {channel?.videos?.map((item) => {
            return (
              <div className="flex_items gap-1 border-b border-b-[#393939]  flex items-center justify-between w-full py-1 px-1">
                <div className="img w-[15rem] ">
                  <img
                    className=" w-[6rem] h-full object-cover"
                    src={item?.videoBanner}
                    alt=""
                  />
                </div>
                <h3 className="p-1 px-4 text-[13px] w-[15rem] line-clamp-2">
                  {item?.title}
                </h3>
                <h3 className="p-1 px-4 text-[13px] w-[15rem]">
                  {item?.views}
                </h3>
                <h3 className="p-1 px-4 text-[13px] w-[15rem]">
                  <Link to={`/edit${item?._id}`}>
                    <CiEdit className="w-5 h-5 text-green-500" />
                  </Link>
                </h3>
              </div>
            );
          })}
        </div>
      )}
      {selectedContent == "shorts" && (
        <div className="border mt-3 border-[#2d2d2dc2] ">
          <div className="flex_items bg-gray-900 flex gap-1 items-center justify-between w-full py-1 ">
            <h3 className="p-1 px-4 text-[13px] w-[15rem]">Thumbnails</h3>
            <h3 className="p-1 px-4 text-[13px] w-[15rem]">Title</h3>
            <h3 className="p-1 px-4 text-[13px] w-[15rem]">Views</h3>
            <h3 className="p-1 px-4 text-[13px] w-[15rem]">Edit</h3>
          </div>
          {channel?.shorts?.map((item) => {
            return (
              <div className="flex_items gap-1 border-b border-b-[#393939]  flex items-center justify-between w-full py-1 px-1">
                <div className="img w-[15rem] ">
                  <video
                    className=" w-[6rem] h-[4rem] object-contain"
                    src={item?.video}
                  ></video>
                </div>
                <h3 className="p-1 px-4 text-[13px] w-[15rem] ">
                  {item?.title}
                </h3>
                <h3 className="p-1 px-4 text-[13px] w-[15rem]">
                  {item?.views}
                </h3>
                <h3 className="p-1 px-4 text-[13px] w-[15rem]">
                  <Link to={`/edit${item?._id}`}>
                    <CiEdit className="w-5 h-5 text-green-500" />
                  </Link>
                </h3>
              </div>
            );
          })}
        </div>
      )}
      {selectedContent == "playlists" && (
        <div className="border mt-3 border-[#2d2d2dc2] ">
          <div className="flex_items bg-gray-900 flex gap-1 items-center justify-between w-full py-1 ">
            <h3 className="p-1 px-4 text-[13px] w-[15rem]">Thumbnails</h3>
            <h3 className="p-1 px-4 text-[13px] w-[15rem]">Title</h3>
            <h3 className="p-1 px-4 text-[13px] w-[15rem]">Total Videos</h3>
            <h3 className="p-1 px-4 text-[13px] w-[15rem]">Edit</h3>
          </div>
          {channel?.playlists?.map((item) => {
            return (
              <div className="flex_items gap-1 border-b border-b-[#393939]  flex items-center justify-between w-full py-1 px-1">
                <div className="img w-[15rem] ">
                  <img
                    className=" w-[6rem] h-full object-cover"
                    src={item?.selectedVideos[0]?.videoBanner}
                    alt=""
                  />
                </div>
                <h3 className="p-1 px-4 text-[13px] w-[15rem] ">
                  {item?.title}
                </h3>
                <h3 className="p-1 px-4 text-[13px] w-[15rem]">
                  {item?.selectedVideos?.length}
                </h3>
                <h3 className="p-1 px-4 text-[13px] w-[15rem]">
                  <Link to={`/edit${item?._id}`}>
                    <CiEdit className="w-5 h-5 text-green-500" />
                  </Link>
                </h3>
              </div>
            );
          })}
        </div>
      )}
      {selectedContent == "communityPosts" && (
        <div className="border mt-3 border-[#2d2d2dc2] ">
          <div className="flex_items bg-gray-900 flex gap-1 items-center justify-between w-full py-1 ">
            <h3 className="p-1 px-4 text-[13px] w-[15rem]">Thumbnails</h3>
            <h3 className="p-1 px-4 text-[13px] w-[15rem]">Title</h3>
            <h3 className="p-1 px-4 text-[13px] w-[15rem]">Date</h3>
            <h3 className="p-1 px-4 text-[13px] w-[15rem]">Delete</h3>
          </div>
          {channel?.communityPosts?.map((item) => {
            return (
              <div className="flex_items gap-1 border-b border-b-[#393939]  flex items-center justify-between w-full py-1 px-1">
                <div className="img w-[15rem] ">
                  <img
                    className=" w-[6rem] h-full object-cover"
                    src={item?.image}
                    alt=""
                  />
                </div>
                <h3 className="p-1 px-4 text-[13px] w-[15rem] line-clamp-2 ">
                  {item?.description}
                </h3>
                <h3 className="p-1 px-4 text-[13px] w-[15rem]">
                  {timeAgo(item?.createdAt)}
                </h3>
                <h3 className="p-1 px-4 text-[13px] w-[15rem]">
                  <Link to={`/edit${item?._id}`}>
                    {" "}
                    <MdDelete className="w-5 h-5 text-red-600" />
                  </Link>
                </h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContentDashBoard;
