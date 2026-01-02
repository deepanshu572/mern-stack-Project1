import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import SideNav from "../components/SideNav";
import axios from "axios";
import { serverUrl } from "../App";
import { getUser } from "../Hooks/getCurrentUser";
import { useSelector } from "react-redux";
import { alertHandler } from "../components/customAlert";
import { useNavigate } from "react-router";
import Loader from "../childComponent/Loader";
// import { getAllVideos } from "../Hooks/getAllContentData";
const UploadShorts = () => {
  getUser();
  const channel = useSelector((state) => state.usersData.channelData);
  const chanelId = channel?._id;
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [desc, setDesc] = useState("");
  const [backendVideo, setBackendVideo] = useState(null);
  const [frontendVideo, setfrontendVideo] = useState(null);

  const handleUploadShort = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("chanelId", chanelId);
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("tags", tags);
    formData.append("video", backendVideo);
    setLoad(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/upload/short",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);
      setLoad(false);
      // getAllVideos();
      alertHandler("shorts Uploaded Sucessfullly!");
      navigate("/");
    } catch (error) {
      setLoad(false);
      console.log(error);
    }
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendVideo(file);
    setfrontendVideo(URL.createObjectURL(file));
  };
  return (
    <div className="flex gap-3">
      <SideNav />
      <div className="create w-full p-4 md:mt-[5rem] ">
        <h3 className="text-3xl font-bold">Upload Short</h3>
        <p className="text-xs pt-1 border-b border-[#393939e4] pb-2 text-[#5e5e5e]">
          Choose a video to upload from your device
        </p>
        <form
          onSubmit={handleUploadShort}
          className="form m-4 flex w-full  gap-3 items-center"
        >
          <div className="left_box">
            <label
              htmlFor="uploadShort"
              className="upload_form bg-[#0b0b0b61] h-85 w-64  border border-dashed border-[#5e5e5e4d] rounded-lg p-8 mt-4 flex flex-col items-center justify-center cursor-pointer hover:bg-[#111111af] transition-all duration-300 ease-in-out"
            >
              <input
                type="file"
                accept="video/*"
                name="video"
                className="hidden"
                id="uploadShort"
                onChange={(e) => handleImage(e)}
              />
              {frontendVideo != null ? (
                <video
                  loop
                  autoPlay
                  muted
                  controls
                  className="w-full h-full max-h-84 object-contain"
                  src={frontendVideo}
                ></video>
              ) : (
                <>
                  <MdCloudUpload className="w-16 h-16 mx-auto text-[#5e5e5e]" />
                  <h3 className="text-sm">Click to upload Shorts video</h3>
                  <p className="text-xs text-[#5e5e5e]">
                    MP4 or MOV — Max 60s{" "}
                  </p>
                </>
              )}
              {/* <video
                loop
                autoplay
                muted
                controls
                className="w-full h-full max-h-84 object-contain"
                src="https://player.vimeo.com/progressive_redirect/playback/914803778/rendition/1080p/file.mp4?loc=external&log_user=0&signature=5344c0e4fea63ca54bb433621ca0be7b9470b475583fa68b26de2b6e380a390a"
              ></video> */}
            </label>
          </div>
          <div className="right_box w-1/2 flex flex-col gap-4 ">
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
                placeholder="Add a title that describes your short"
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
                value={desc}
                required
                onChange={(e) => setDesc(e.target.value)}
                className="w-full text-sm p-2 rounded bg-[#0b0b0b61] border border-[#5e5e5e4d] focus:outline-none focus:border-[#9f9f9fb0]"
                placeholder="Tell viewers about your short"
              ></textarea>
            </div>
            <div className="inp">
              <label
                htmlFor="title"
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
                placeholder="Add tags (separated by commas)"
              />
            </div>
            <div className="flex justify-center">
              <button className=" bg-[green] rounded-sm px-[8px] py-[10px] w-full cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out">
                {load ? <Loader /> : "Publish"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadShorts;
