import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { timeAgo } from "../Utils/timeConvertor";
import { Link } from "react-router";
import ModelContent from "../childComponent/ModelContent";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";

const ContentDashBoard = () => {
  const [selectedContent, setSelectedContent] = useState("videos");
  const [modal, setModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const channelData = useSelector((state) => state.usersData.channelData);

  const [channel, setChannel] = useState(null);
  const [selectedItem, setSelectedItem] = useState({
    name: "",
    id: null,
    item: [],
  });
  useEffect(() => {
    if (channelData) {
      setChannel(channelData);
    }
  }, [channelData]);

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
  const UpdateFnc = (updateData) => {
    console.log(updateData);
    if (selectedItem.name === "videos") {
      setChannel((prev) => ({
        ...prev,
        videos: prev.videos.map((video) =>
          video._id === updateData?._id ? { ...video, ...updateData } : video,
        ),
      }));
    } else if (selectedItem.name === "shorts") {
      alert("shorts Updated");
      setChannel((prev) => ({
        ...prev,
        shorts: prev.shorts.map((short) =>
          short._id === updateData?._id ? { ...short, ...updateData } : short,
        ),
      }));
    } else if (selectedItem.name === "playlists") {
      setChannel((prev) => ({
        ...prev,
        playlists: prev.playlists.map((playlist) =>
          playlist._id === updateData?._id
            ? { ...playlist, ...updateData }
            : playlist,
        ),
      }));
    }
  };
  const DeleteFnc = (DeletedData) => {
    if (selectedItem.name === "videos") {
      setChannel((prev) => ({
        ...prev,
        videos: prev.videos.filter((video) => video._id !== DeletedData?._id),
      }));
    } else if (selectedItem.name === "shorts") {
      setChannel((prev) => ({
        ...prev,
        shorts: prev.shorts.filter((short) => short._id !== DeletedData?._id),
      }));
    } else if (selectedItem.name === "playlists") {
      setChannel((prev) => ({
        ...prev,
        playlists: prev.playlists.filter(
          (playlist) => playlist._id !== DeletedData?._id,
        ),
      }));
    } else if (selectedItem.name === "communityPosts") {
      setChannel((prev) => ({
        ...prev,
        communityPosts: prev.communityPosts.filter(
          (post) => post._id !== DeletedData?._id,
        ),
      }));
    }
  };

  const handleContentUpdate = (id, name, item, video, channelId) => {
    setSelectedItem({
      name: name,
      id: id,
      item,
      video,
      channelId,
    });
    setModal(true);
  };

  return (
    <>
      {modal && (
        <ModelContent
          selectedItem={selectedItem}
          change={UpdateFnc}
          deleteFnc={DeleteFnc}
        />
      )}

      <div className="p-2">
        {/* <ModelContent /> */}

        <h2 className=" text-3xl font-bold">Your contents</h2>
        <p class="text-xs mb-4 pt-1 border-b border-[#393939e4] pb-2 text-[#5e5e5e]">
          Here you can manage your channel content, including videos, shorts,
          playlists, and community posts. Click on the edit icon to update or
          delete your content.
        </p>

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
                    <button
                      onClick={() =>
                        handleContentUpdate(item?._id, "videos", item)
                      }
                    >
                      <CiEdit className="w-5 h-5 text-green-500" />
                    </button>
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
                    <div
                      onClick={() =>
                        handleContentUpdate(item?._id, "shorts", item)
                      }
                    >
                      <CiEdit className="w-5 h-5 text-green-500" />
                    </div>
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
                    <div
                      onClick={() =>
                        handleContentUpdate(
                          item?._id,
                          "playlists",
                          item,
                          channel?.videos,
                          channel?._id,
                        )
                      }
                    >
                      <CiEdit className="w-5 h-5 text-green-500" />
                    </div>
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
              <h3 className="p-1 px-4 text-[13px] w-[15rem]">View</h3>
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
                    <Link to={`/edit${item?._id}`}> </Link>
                    <div
                      onClick={() =>
                        handleContentUpdate(item?._id, "communityPosts", item)
                      }
                    >
                      <FaEye className="w-5 h-5 text-green-600" />
                    </div>
                  </h3>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ContentDashBoard;
