import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "../App";
const ModelContent = ({ selectedItem, change, deleteFnc }) => {
  // console.log(selectedItem);
  const [toggle, setToggle] = useState(false);

  const [loadUpdate, setLoadUpdate] = useState(false);
  const [loadDelete, setLoadDelete] = useState(false);
  const [id, setId] = useState();
  const [channelId, setChannelId] = useState();
  const [title, setTitle] = useState();
  const [tags, setTags] = useState();
  const [desc, setDesc] = useState();
  const [comunityImg, setCommunityImg] = useState();
  const [selectedPlaylistVideo, setSelectedPlaylistVideo] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState([]);
  const [allPlaylistVideos, setAllPlaylistVideos] = useState([]);
  const [frontendImageVideo, setFrontendImageVideo] = useState({
    videoBanner: null,
  });
  const [backendImageVideo, setBackendImageVideo] = useState({
    videoBanner: null,
  });

  useEffect(() => {
    if (selectedItem?.item) {
      setChannelId(selectedItem?.channelId || "");
      setSelectedPlaylistVideo(selectedItem?.item?.selectedVideos || []);
      setSelectedPlaylistId(
        selectedItem?.item?.selectedVideos?.map((video) => video._id) || [],
      );
      setAllPlaylistVideos(selectedItem?.video || []);
      setTitle(selectedItem.item.title || "");
      setTags(selectedItem.item.tags || []);
      setDesc(selectedItem.item.description || "");
      setCommunityImg(selectedItem.item.image || "");
      setId(selectedItem.item._id || "");
      setFrontendImageVideo({
        videoBanner: selectedItem.item.videoBanner || null,
      });
      setBackendImageVideo({
        videoBanner: selectedItem.item.videoBanner || null,
      });
      setToggle(true);
    }
  }, [selectedItem]);

  const handleUpdateVideo = async () => {
    setLoadUpdate(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("tags", tags);
      formData.append("videoBanner", backendImageVideo?.videoBanner);
      const { data } = await axios.post(
        serverUrl + `/api/toggles/video/${id}/UpdateVideo`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      change(data.video);
      setLoadUpdate(false);
      setToggle(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteVideo = async (videoId) => {
    setLoadDelete(true);
    try {
      const { data } = await axios.put(
        serverUrl + `/api/toggles/video/${videoId}/DeleteVideo`,
        {},
        {
          withCredentials: true,
        },
      );
      deleteFnc(data.video);
      // console.log(data)
      setLoadDelete(false);
      setToggle(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteShort = async (shortId) => {
    setLoadDelete(true);
    try {
      const { data } = await axios.put(
        serverUrl + `/api/toggles/short/${shortId}/DeleteShort`,
        {},
        {
          withCredentials: true,
        },
      );
      deleteFnc(data.short);
      setLoadDelete(false);
      setToggle(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteCommunity = async (communityId) => {
    setLoadDelete(true);
    try {
      const { data } = await axios.put(
        serverUrl + `/api/toggles/community/${communityId}/DeleteCommunityPost`,
        {},
        {
          withCredentials: true,
        },
      );

      deleteFnc(data.comunity);
      setLoadDelete(false);
      setToggle(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateShort = async () => {
    setLoadUpdate(true);
    console.log(title, description, tags);
    try {
      const { data } = await axios.post(
        serverUrl + `/api/toggles/short/${id}/UpdateShort`,
        { title, description: desc, tags },
        {
          withCredentials: true,
        },
      );
      change(data.short);
      setLoadUpdate(false);
      setToggle(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = (e, type) => {
    const file = e.target.files[0];
    setBackendImageVideo((prev) => ({
      ...prev,
      [type]: file,
    }));
    setFrontendImageVideo((prev) => ({
      ...prev,
      [type]: URL.createObjectURL(file),
    }));
  };
  const handleVideoSelect = (video) => {
    setSelectedPlaylistVideo((prev) => {
      let updated;

      if (prev.some((item) => item?._id === video._id)) {
        updated = prev.filter((item) => item?._id !== video._id);
      } else {
        updated = [...prev, video];
      }

      setSelectedPlaylistId(updated.map((item) => item._id));

      return updated;
    });
  };

  const handleSelectedVideoDelete = (videoId) => {
    setSelectedPlaylistVideo((prev) =>
      prev.filter((item) => item?._id !== videoId),
    );
    setSelectedPlaylistId((prev) => prev.filter((item) => item !== videoId));
    alert("Are you sure you want to remove this video from the playlist?");
  };

  const handleUpdatePlaylist = async () => {
    setLoadUpdate(true);
    try {
      const { data } = await axios.post(
        serverUrl + `/api/toggles/playlist/${id}/UpdatePlaylist`,
        {
          channelId,
          title,
          description: desc,
          selectedVideos: selectedPlaylistId,
          selectedVideosData: selectedPlaylistVideo,
        },
        {
          withCredentials: true,
        },
      );
      setLoadUpdate(false);
      setToggle(false);
      change(data.playlist);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeletePlaylist = async (playlistId) =>{
     setLoadDelete(true);
    try{
      const {data} = await axios.put(serverUrl + `/api/toggles/playlist/${playlistId}/DeletePlaylist`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(data);
        deleteFnc(data.playlist);
      setLoadDelete(false);
      setToggle(false);
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <>
      {selectedItem?.name === "videos" && (
        <div
          className={`${toggle ? "block" : "hidden"}   transition-all duration-700 ease-in-out z-10 opacity-100
        fixed inset-0 bg-[#00000032] flex justify-center items-center  backdrop-blur-sm`}
        >
          <div className="create  mt-[3rem] mb-[4rem] bg-black md:mb-0 md:mt-[5rem] hide_scroll w-[95%]  p-5 rounded-xl overflow-hidden md:w-1/3 md:h-full  overflow-y-auto ">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold">Update video</h3>
              <RxCross2
                onClick={() => setToggle(false)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
            <p className="text-xs pt-1 border-b border-[#393939e4] pb-2 text-[#5e5e5e]">
              Choose a video to update from your device
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="form flex flex-col gap-3 w-full"
            >
              <div className="flex p-3 overflow-y-auto hide_scroll h-[50vh] w-full  flex-col">
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
                    placeholder="Add a title that describes your video"
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
                    value={desc}
                    required
                    onChange={(e) => setDesc(e.target.value)}
                    rows="4"
                    className="w-full text-sm p-2 rounded bg-[#0b0b0b61] border border-[#5e5e5e4d] focus:outline-none focus:border-[#9f9f9fb0]"
                    placeholder="Tell viewers about your video"
                  ></textarea>
                </div>
                <div className="inp">
                  <label
                    htmlFor="tags"
                    className="block text-sm capitalize font-medium mb-1"
                  >
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full text-sm p-2 rounded bg-[#0b0b0b61] border border-[#5e5e5e4d] focus:outline-none focus:border-[#9f9f9fb0]"
                    placeholder="Add tags separated by commas"
                  />
                </div>
                <div className="inp">
                  <label
                    htmlFor="visibility"
                    className="upload_form bg-[#0b0b0b61] border border-dashed border-[#5e5e5e4d] rounded-lg p-8 mt-4 flex flex-col items-center justify-center cursor-pointer hover:bg-[#111111af]  transition-all duration-300 ease-in-out"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      name="visibility"
                      id="visibility"
                      className="hidden"
                      onChange={(e) => handleImage(e, "videoBanner")}
                    />
                    {frontendImageVideo?.videoBanner != null ? (
                      <img
                        className="w-full h-full max-h-60 object-contain"
                        src={frontendImageVideo?.videoBanner}
                        alt=""
                      />
                    ) : (
                      <>
                        {/* <IoImages className="w-16 h-16 mx-auto text-[#5e5e5e]" /> */}
                        <h1 className="text-sm pt-2">
                          Click to upload thumbnail
                        </h1>
                      </>
                    )}
                  </label>
                </div>
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={handleUpdateVideo}
                  className={` ${loadUpdate ? "bg-gray-500" : "bg-[green] "} rounded-sm px-[5px] py-[7px] text-sm w-full cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out`}
                >
                  {loadUpdate ? <Loader /> : "Update"}
                </button>
                <button
                  onClick={() => handleDeleteVideo(id)}
                  className=" bg-[red] rounded-sm px-[5px] py-[7px] text-sm w-full cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out"
                >
                  {loadDelete ? <Loader /> : "Delete"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedItem?.name === "shorts" && (
        <div
          className={`${toggle ? "block" : "hidden"}   transition-all duration-700 ease-in-out z-10 opacity-100
        fixed inset-0 bg-[#00000032] flex justify-center items-center  backdrop-blur-sm`}
        >
          <div className="create  mt-[3rem] mb-[4rem] bg-black md:mb-0 md:mt-[5rem] hide_scroll w-[95%]  p-5 rounded-xl overflow-hidden md:w-1/3 md:h-full  overflow-y-auto ">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold">Update Shorts</h3>
              <RxCross2
                onClick={() => setToggle(false)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
            <p className="text-xs pt-1 border-b border-[#393939e4] pb-2 text-[#5e5e5e]">
              Choose a short to update from your device
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="form flex flex-col gap-3 w-full"
            >
              <div className="flex p-3 overflow-y-auto hide_scroll  w-full  flex-col">
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
                    placeholder="Add a title that describes your video"
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
                    value={desc}
                    required
                    onChange={(e) => setDesc(e.target.value)}
                    rows="4"
                    className="w-full text-sm p-2 rounded bg-[#0b0b0b61] border border-[#5e5e5e4d] focus:outline-none focus:border-[#9f9f9fb0]"
                    placeholder="Tell viewers about your video"
                  ></textarea>
                </div>
                <div className="inp">
                  <label
                    htmlFor="tags"
                    className="block text-sm capitalize font-medium mb-1"
                  >
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full text-sm p-2 rounded bg-[#0b0b0b61] border border-[#5e5e5e4d] focus:outline-none focus:border-[#9f9f9fb0]"
                    placeholder="Add tags separated by commas"
                  />
                </div>
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={handleUpdateShort}
                  className=" bg-[green] rounded-sm px-[5px] py-[7px] text-sm w-full cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out"
                >
                  {loadUpdate ? <Loader /> : "Update"}
                </button>
                <button
                  onClick={() => handleDeleteShort(id)}
                  className=" bg-[red] rounded-sm px-[5px] py-[7px] text-sm w-full cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out"
                >
                  {loadDelete ? <Loader /> : "Delete"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedItem?.name === "playlists" && (
        <div
          className={`${toggle ? "block" : "hidden"}   transition-all duration-700 ease-in-out z-10 opacity-100
        fixed inset-0 bg-[#00000032] flex justify-center items-center  backdrop-blur-sm`}
        >
          <div className="create  mt-[3rem] mb-[4rem] bg-black md:mb-0 md:mt-[5rem] hide_scroll w-[95%]  p-5 rounded-xl overflow-hidden md:w-1/3 md:h-full  overflow-y-auto ">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold">Update Playlist</h3>
              <RxCross2
                onClick={() => setToggle(false)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
            <p className="text-xs pt-1 border-b border-[#393939e4] pb-2 text-[#5e5e5e]">
              Choose a short to update from your device
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="form flex flex-col gap-3 w-full"
            >
              <div className="flex p-3 overflow-y-auto hide_scroll h-[50vh] w-full  flex-col">
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
                    placeholder="Add a title that describes your video"
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
                    value={desc}
                    required
                    onChange={(e) => setDesc(e.target.value)}
                    rows="4"
                    className="w-full text-sm p-2 rounded bg-[#0b0b0b61] border border-[#5e5e5e4d] focus:outline-none focus:border-[#9f9f9fb0]"
                    placeholder="Tell viewers about your video"
                  ></textarea>
                </div>
                {selectedPlaylistVideo && selectedPlaylistVideo.length > 0 && (
                  <div className="mt-2">
                    <h3>Selected Videos</h3>
                    <div className="flex">
                      {selectedPlaylistVideo?.map((video) => (
                        <div
                          key={video._id}
                          className="w-24 h-24 m-2 relative group"
                        >
                          {/* Overlay */}
                          <div
                            onClick={() => handleSelectedVideoDelete(video._id)}
                            className="flex items-center justify-center absolute inset-0 bg-[#0000008c] opacity-0 group-hover:opacity-100 transition duration-300"
                          >
                            <RxCross2 className="w-5 h-5 cursor-pointer text-white" />
                          </div>

                          {/* Image */}
                          <img
                            className="w-full h-full object-cover"
                            src={video.videoBanner}
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-2">
                  <h3>Add more Videos</h3>
                  <div className="flex">
                    {allPlaylistVideos?.map((item) => (
                      <div
                        onClick={() => handleVideoSelect(item)}
                        key={item._id}
                        className="box_select p-2 w-40 h-30 pt-8 shrink-0 cursor-pointer relative"
                      >
                        <img
                          className="w-full h-full object-cover rounded"
                          src={item?.videoBanner}
                          alt={item?.title}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={handleUpdatePlaylist}
                  className=" bg-[green] rounded-sm px-[5px] py-[7px] text-sm w-full cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out"
                >
                  {loadUpdate ? <Loader /> : "Update"}
                </button>
                <button
                  onClick={() => handleDeletePlaylist(id)}
                  className=" bg-[red] rounded-sm px-[5px] py-[7px] text-sm w-full cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out"
                >
                  {loadDelete ? <Loader /> : "Delete"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {selectedItem?.name === "communityPosts" && (
        <div
          className={`${toggle ? "block" : "hidden"}   transition-all duration-700 ease-in-out z-10 opacity-100
        fixed inset-0 bg-[#00000032] flex justify-center items-center  backdrop-blur-sm`}
        >
          <div className="create  mt-[3rem] mb-[4rem] bg-black md:mb-0 md:mt-[5rem] hide_scroll w-[95%]  p-5 rounded-xl overflow-hidden md:w-1/3 md:h-full  overflow-y-auto ">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl md:text-3xl font-bold">
                Update Community Post
              </h3>
              <RxCross2
                onClick={() => setToggle(false)}
                className="w-7 h-7 cursor-pointer"
              />
            </div>
            <p className="text-xs pt-1 border-b border-[#393939e4] pb-2 text-[#5e5e5e]">
              delete your community post permanently from here.{" "}
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="form flex flex-col gap-3 w-full"
            >
              <div className="flex p-3 overflow-y-auto hide_scroll  w-full  flex-col">
                <div className="img w-full md:h-75">
                  <img
                    src={comunityImg}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => handleDeleteCommunity(id)}
                  className="bg-[red] rounded-sm px-[5px] py-[7px] text-sm w-full cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out"
                >
                  {loadDelete ? <Loader /> : "Delete"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModelContent;
