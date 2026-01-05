import React, { useState } from "react";
import { IoImages } from "react-icons/io5";
import SideNav from "../components/SideNav";
import axios from "axios";
import { serverUrl } from "../App";
import Loader from "../childComponent/Loader";
import { alertHandler } from "../components/customAlert";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
const UploadCommunityPost = () => {
  const channel = useSelector((state) => state.usersData.channelData);
  const chanelId = channel?._id;
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const [backendImage, setBackendImage] = useState(null);
  const [frontendImage, setfrontendImage] = useState(null);
  const [load, setLoad] = useState(false);

  const handleUploadCommunityPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("chanelId", chanelId);
    formData.append("description", desc);
    formData.append("image", backendImage);
    setLoad(true);

    try {
      const result =await  axios.post(
        serverUrl + "/api/upload/communityPost",
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
    //  dispatch(getCommmunity())
      alertHandler("community post Uploaded Sucessfullly!");
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setfrontendImage(URL.createObjectURL(file));
  };

  return (
    <div className="flex gap-3">
      <SideNav />
      <div className="create w-full p-4 md:mt-[5rem] ">
        <h3 className="text-3xl font-bold">Upload Community Post</h3>
        <p className="text-xs pt-1 border-b border-[#393939e4] pb-2 text-[#5e5e5e]">
          Share text, images, polls, and more with your audience
        </p>
        <form onSubmit={handleUploadCommunityPost} className="form m-4">
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
              onChange={(e) => setDesc(e.target.value)}
              className="w-full text-sm p-2 rounded bg-[#0b0b0b61] border border-[#5e5e5e4d] focus:outline-none focus:border-[#9f9f9fb0]"
              placeholder="Write somthing for your community post.."
            ></textarea>
          </div>
          <label htmlFor="uploadimage" className="flex gap-1 py-3">
            <input
              type="file"
              accept="image/*"
              name="image"
              className="hidden"
              id="uploadimage"
              onChange={(e) => handleImage(e)}
            />
            <IoImages className="w-5 h-5  text-[#5e5e5e]" />
            <h3 className="text-sm">image (optionally)</h3>
          </label>
          {frontendImage != null ? (
            <div className="wraper  upload_form bg-[#0b0b0b61] h-85  border border-dashed border-[#5e5e5e4d] rounded-lg p-8  flex flex-col items-center justify-center cursor-pointer hover:bg-[#111111af] transition-all duration-300 ease-in-out">
              <img
                className="w-full h-full max-h-60 object-contain "
                src={frontendImage}
                alt=""
              />
            </div>
          ) : (
            ""
          )}

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

export default UploadCommunityPost;
