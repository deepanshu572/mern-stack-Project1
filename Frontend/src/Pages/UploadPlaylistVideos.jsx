import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import { useSelector } from "react-redux";
// import { getAllVideos } from "../Hooks/getAllContentData";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router";
import { getUser } from "../Hooks/getCurrentUser";
import { alertHandler } from "../components/customAlert";

const UploadPlaylistVideos = () => {
  const channel = useSelector((state) => state?.usersData?.channelData);

  const channelId = channel?._id;
  const navigate = useNavigate();
  console.log(channelId)

  const [video, setvideo] = useState([]);
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedVideos, setSelectedVideos] = useState([]);
  const handleVideoSelect = (e, videoId) => {
    if (e.target.checked) {
      setSelectedVideos((prev) => [...prev, videoId]);
    } else {
      setSelectedVideos((prev) => prev.filter((id) => id !== videoId));
    }
  };

  const handlePlaylistVideo = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
     
      const result = await axios.post(
        serverUrl + "/api/upload/playlist",
        {
          channelId,
          title,
          description,
          selectedVideos,
        },
        {
          withCredentials: true,
        }
      );
      console.log(result);
      alertHandler("playlist uploaded sucessfully!");
      navigate("/");
      setLoad(false);
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  return (
    <div className="flex gap-3">
      <SideNav />
      <div className="create mt-[3rem] mb-[5rem] md:mb-0 w-full p-4 md:mt-[5rem] ">
        <h3 className="text-3xl font-bold">Create New Playlist</h3>
        <p className="text-xs pt-1 border-b border-[#393939e4] pb-2 text-[#5e5e5e]">
          Add videos to your new playlist
        </p>
        <form
          onSubmit={handlePlaylistVideo}
          className="form m-4 flex flex-col gap-3"
        >
          <div className="inp">
            <label
              htmlFor="title"
              className="block text-sm capitalize font-medium mb-1"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm p-2 rounded bg-[#0b0b0b61] border border-[#5e5e5e4d] focus:outline-none focus:border-[#9f9f9fb0]"
              placeholder="Playlist Title (required)"
            />
          </div>
          <div className="inp">
            <label
              htmlFor="description"
              className="block text-sm capitalize font-medium mb-1"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="4"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-sm p-2 rounded bg-[#0b0b0b61] border border-[#5e5e5e4d] focus:outline-none focus:border-[#9f9f9fb0]"
              placeholder="Write somthing for your community post.."
            ></textarea>
          </div>
          <div className="select_vid">
            <h3>Select Videos</h3>
            <div className="flex items-center justify-start md:flex-wrap overflow-x-auto ">
              {channel?.videos?.map((item) => {
                return (
                  <label
                    htmlFor={`videos${item?._id}`}
                    className="box_select p-2 pt-8 shrink-0"
                  >
                    <input
                      type="checkbox"
                      name={`videos${item?._id}`}
                      onChange={(e) => handleVideoSelect(e, item?._id)}
                      id={`videos${item?._id}`}
                    />
                    <div className="video w-55 h-40">
                      <img
                        className="w-full h-full object-cover"
                        src={item?.videoBanner}
                        alt=""
                      />
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center">
            <button className=" bg-[green] rounded-sm px-[8px] py-[10px] w-full cursor-pointer  transition-all duration-300 ease-in-out">
              Create Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPlaylistVideos;
