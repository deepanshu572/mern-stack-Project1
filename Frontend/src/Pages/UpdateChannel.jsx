import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import { alertHandler } from "../components/customAlert";
import { useDispatch, useSelector } from "react-redux";
import { getChannelData, getUserData } from "../redux/userSlice";
import Loader from "../childComponent/Loader";
const UpdateChannel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.usersData.usersData);
  const channel = useSelector((state) => state.usersData.channelData);
  const [load, setload] = useState(false);

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState(channel?.name);
  const [category, setCategory] = useState(channel?.category);
  const [desc, setDesc] = useState(channel?.description);
  const [backendImage, setBackendImage] = useState({
    avatar: channel?.avatar || null,
    banner: channel?.bannerImage || null,
  });
  const [frontendImage, setFrontendImage] = useState({
    avatar: channel?.avatar || user?.image|| null,
    banner: channel?.bannerImage || null,
  });

  const handleUpdateChannel = async (e) => {
    e.preventDefault();
    setload(true);
    const formData = new FormData();
    formData.append("channelId", channel?._id);
    formData.append("name", title);
    formData.append("description", desc);
    formData.append("category", category);
    formData.append("avatar", backendImage?.avatar);
    formData.append("banner", backendImage?.banner);
    try {
      const result = await axios.post(
        serverUrl + "/api/users/updateChannel",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
            alertHandler("Update Successfully")
        dispatch(getChannelData(result?.data?.channel));
      // getAllVideos()
      setload(false);
      navigate("/");
      setload(false);
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  const handleImage = (e, type) => {
    const file = e.target.files[0];
    // console.log(file)
    setBackendImage((prev) => ({
      ...prev,
      [type]: file,
    }));
    setFrontendImage((prev) => ({
      ...prev,
      [type]: URL.createObjectURL(file),
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      {step === 1 && (
        <div className="flex flex-col w-full md:w-1/3 md:bg-[#11101096] p-4 rounded-md">
          <h2>Customize Channel</h2>
          <p className="text-xs mb-2 text-[#5e5e5e]">
            update your profile picture, channel name.
          </p>
          <div className="profile flex flex-col items-center justify-center gap-4 mt-4">
            <label htmlFor="avatar">
              <input
                type="file"
                accept="image/*"
                name="avatar"
                id="avatar"
                className="hidden"
                onChange={(e) => handleImage(e, "avatar")}
              />
              <div className="profile_img w-20 h-20 rounded-full overflow-hidden">
                {frontendImage?.avatar != null ? (
                  <img
                    className="w-full h-full object-cover"
                    src={frontendImage?.avatar}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-full h-full object-cover"
                    src="https://i.pinimg.com/1200x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
                    alt=""
                  />
                )}
              </div>
              <p className="text-xs text-[#346eeb] mt-2 font-medium">
                {" "}
                update picture
              </p>
            </label>

            <div className="inp w-full">
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
                className="w-full text-sm p-2 rounded bg-[#0b0b0b61] border border-[#5e5e5e4d] focus:outline-none focus:border-[#9f9f9fb0]"
                placeholder="channel name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex justify-center w-full">
              <button
                onClick={() => setStep(2)}
                className=" bg-[green] text-sm rounded-sm px-[8px] py-[10px] w-full cursor-pointer  transition-all duration-300 ease-in-out"
              >
                Publish
              </button>
            </div>

            <Link
              className="text-xs text-[#346eeb] hover:underline cursor-pointer"
              to={"/"}
            >
              Back to home Page
            </Link>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col  w-full md:w-1/3 md:bg-[#11101096] p-4 rounded-md">
          <h2>How you’ll appear</h2>
          <p className="text-xs mb-2 text-[#5e5e5e]">
            Choose a profile picture, channel name.
          </p>
          <div className="profile flex flex-col items-center justify-center gap-4 mt-4">
            <div className="profile_img w-20 h-20 rounded-full overflow-hidden">
              {frontendImage?.avatar != null ? (
                <img
                  className="w-full h-full object-cover"
                  src={frontendImage?.avatar}
                  alt=""
                />
              ) : (
                <img
                  className="w-full h-full object-cover"
                  src="https://i.pinimg.com/1200x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
                  alt=""
                />
              )}
            </div>
            <h3>{title}</h3>

            <div className="flex justify-center w-full">
              <button
                onClick={() => setStep(3)}
                className=" bg-[green] text-sm rounded-sm px-[8px] py-[10px] w-full cursor-pointer  transition-all duration-300 ease-in-out"
              >
                Continue and Customize Channel
              </button>
            </div>

            <Link
              className="text-xs text-[#346eeb] hover:underline cursor-pointer"
              to={"/"}
            >
              Back
            </Link>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col  w-full md:w-1/3 md:bg-[#11101096] p-4 rounded-md">
          <h2>How you’ll appear</h2>
          <p className="text-xs mb-2 text-[#5e5e5e]">
            Choose a banner, channel name.
          </p>
          <form
            onSubmit={handleUpdateChannel}
            className="profile flex flex-col items-center justify-center gap-2 mt-4"
          >
            <label htmlFor="banner" className="w-full ">
              <input
                type="file"
                accept="image/*"
                name="banner"
                id="banner"
                className="hidden"
                onChange={(e) => handleImage(e, "banner")}
              />
              <div className="profile_img flex items-center flex-col justify-center rounded-sm bg-[#191919a8] w-full h-25 overflow-hidden border border-dashed">
                {frontendImage?.banner != null ? (
                  <img
                    className="w-full h-full object-cover"
                    src={frontendImage?.banner}
                    alt=""
                  />
                ) : (
                  <>
                    <FaCloudUploadAlt className="w-9 h-9" />
                    <p className="text-xs font-medium"> Upload Banner</p>
                  </>
                )}
              </div>
            </label>
            <div className="inp w-full">
              <label
                htmlFor="Description"
                className="block text-sm capitalize font-medium mb-1"
              >
                Description
              </label>
              <textarea
                type="text"
                name="Description"
                id="Description"
                className="w-full text-sm p-2 rounded bg-[#0b0b0b61] border border-[#5e5e5e4d] focus:outline-none focus:border-[#9f9f9fb0]"
                placeholder="Description name"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
            <div className="inp w-full">
              <label
                htmlFor="category"
                className="block text-sm capitalize font-medium mb-1"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                className="w-full text-sm p-2 rounded bg-[#0b0b0b61] border border-[#5e5e5e4d] focus:outline-none focus:border-[#9f9f9fb0]"
                placeholder="Category name"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="flex justify-center mt-2 gap-5 w-full items-center">
              <Link
                className="text-xs bg-[#5e5e5e] text-center rounded-sm w-1/2 px-[8px] py-[8px]  cursor-pointer"
                to={"/"}
              >
                Back
              </Link>
              <button className=" bg-[green] text-xs w-1/2 rounded-sm px-[8px] py-[8px]  cursor-pointer  transition-all duration-300 flex items-center justify-center ease-in-out">
                {load ? <Loader /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateChannel;
