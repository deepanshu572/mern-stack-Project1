import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { IoImages } from "react-icons/io5";
import SideNav from "../components/SideNav";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { alertHandler } from "../components/customAlert";
import Loader from "../childComponent/Loader";
import { useNavigate } from "react-router";

const uploadVideo = () => {
  const channel = useSelector((state) => state.usersData.channelData);
  const navigate = useNavigate();
  const chanelId = channel?._id;
  const [load, setLoad] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [desc, setDesc] = useState("");
  const [backendImageVideo, setBackendImageVideo] = useState({
    video: null,
    videoBanner: null,
  });
  const [frontendImageVideo, setFrontendImageVideo] = useState({
    video: null,
    videoBanner: null,
  });

  const handleUploadVideo = async (e) => {
    e.preventDefault();
    setLoad(true);
    const formData = new FormData();
    formData.append("chanelId", chanelId);
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("tags", tags);
    formData.append("videoBanner", backendImageVideo?.videoBanner);
    formData.append("video", backendImageVideo?.video);
    try {
      const result = await axios.post(
        serverUrl + "/api/upload/video",
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
      alertHandler("Video Uploaded Sucessfullly!");
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };
  const handleImage = (e, type) => {
    const file = e.target.files[0];
    console.log(e.target.files[0], type);
    setBackendImageVideo((prev) => ({
      ...prev,
      [type]: file,
    }));
    setFrontendImageVideo((prev) => ({
      ...prev,
      [type]: URL.createObjectURL(file),
    }));
  };
  return (
    <div className="flex gap-3">
      <SideNav />
      <div className="create w-full p-4 mt-[3rem] mb-[4rem] md:mb-0 md:mt-[5rem] ">
        <h3 className="text-3xl font-bold">Upload video</h3>
        <p className="text-xs pt-1 border-b border-[#393939e4] pb-2 text-[#5e5e5e]">
          Choose a video to upload from your device
        </p>
        <form
          onSubmit={handleUploadVideo}
          className="form m-4 flex flex-col gap-3"
        >
          <label
            htmlFor="uploadVideo"
            className="upload_form bg-[#0b0b0b61]  border border-dashed border-[#5e5e5e4d] rounded-lg p-8 mt-4 flex flex-col items-center justify-center cursor-pointer hover:bg-[#111111af] transition-all duration-300 ease-in-out"
          >
            <input
              type="file"
              accept="video/*"
              name="uploadVideo"
              className="hidden"
              id="uploadVideo"
              required
              onChange={(e) => handleImage(e, "video")}
            />
            {frontendImageVideo?.video != null ? (
              <video
                loop
                autoPlay
                muted
                controls
                className="w-full h-full max-h-84 object-contain"
                src={frontendImageVideo?.video}
              ></video>
            ) : (
              <>
                <MdCloudUpload className="w-16 h-16 mx-auto text-[#5e5e5e]" />
                <h3 className="text-sm">Click to upload video</h3>
                <p className="text-xs text-[#5e5e5e]">MP4, WebM, MKV </p>
              </>
            )}
          </label>
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
                required
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
                  <IoImages className="w-16 h-16 mx-auto text-[#5e5e5e]" />
                  <h1 className="text-sm pt-2">Click to upload thumbnail</h1>
                </>
              )}
            </label>
          </div>
          <div className="flex justify-center">
            <button className=" bg-[green] rounded-sm px-[8px] py-[10px] w-full cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out">
              {load ? <Loader /> : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default uploadVideo;
