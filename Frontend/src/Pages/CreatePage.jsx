import React, { useState } from "react";
import { FaVideo } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { RiPlayList2Fill } from "react-icons/ri";
import { useNavigate } from "react-router";
import SideNav from "../components/SideNav";

const CreatePage = () => {
  const uploads = [
    {
      icon: <FaVideo className="w-full h-full" />,
      title: "Upload Video",
      desc: "Upload a video from your device",
      path: "/create/video",
    },
    {
      icon: <FaPlay className="w-full h-full" />,
      title: "Create Shorts",
      desc: "Create a short video to engage your audience",
      path: "/create/shorts",
    },
    {
      icon: <FaPencilAlt className="w-full h-full" />,
      title: "Create Community Post",
      desc: "Share text, images, polls, and more with your audience",
      path: "/create/community-post",
    },
    {
      icon: <RiPlayList2Fill className="w-full h-full" />,
      title: "New Playlist",
      desc: "Organize your videos into a new playlist",
      path: "/create/playlist",
    },
  ];
  const [path, setPath] = useState(null);

  const navigate = useNavigate();
  const handlePath = (path) => {
    // alert(path);
    setPath(path);
  };

  const handleUploads = () => {
    navigate(path);
  };
  return (
    <div className="flex gap-3">
    <SideNav/>
    <div className="create p-4 mt-[3rem]  h-screen md:mt-[5rem]">
      <h3 className="text-3xl font-bold">Create</h3>
      <p className="text-xs pt-1 border-b border-[#393939e4] pb-2 text-[#5e5e5e]">
        Choose what type of content you want to create for your audience
      </p>
      <div className="box_selector flex flex-wrap justify-center  gap-4 mt-4 ">
        {uploads.map((val, index) => {
          return (
            <div
              key={index}
              onClick={() => handlePath(val.path)}
              className={
                `upload w-[45%] bg-[#0b0b0b61] shrink-0 border border-[#5e5e5e4d] rounded-lg p-4  cursor-pointer transition-all duration-300 ease-in-out flex justify-center text-center flex-col gap-4 items-center` +
                (path === val.path ? " border-[#9f9f9fb0]" : "")
              }
            >
              <div className="uploads_img md:w-12 md:h-12 w-15 h-15  p-3.5 bg-[#5e5e5e1a] flex items-center justify-center rounded-full">
                {val.icon}
              </div>
              <div className="upload_text">
                <h3 className="md:text-xl text-sm font-semibold">{val.title}</h3>
                <p className="text-xs hidden md:block text-[#5e5e5e]">{val.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="create_btn flex flex-col items-center justify-center mt-5 ">
        <div className="create_img">
          <img
            className="w-20 h-20"
            src="https://fplaytube.onrender.com/assets/create-CcBJqj2U.png"
            alt=""
          />
        </div>

        {path !== null ? (
          <>
            <h3 className="font-bold text-center">Ready to create?</h3>
            <p className="text-xs text-center text-[#5e5e5e]">
               click the create button to start creating content
            </p>

            <button
              onClick={handleUploads}
              className="p-2 bg-white text-black rounded-full mt-3 font-medium my-2 text-xs"
            >
              + Create
            </button>
          </>
        ) : (
          <>
            <h3 className="font-bold text-center">Create content on any device</h3>
            <p className="text-xs text-center text-[#5e5e5e]">
              Upload and record at home or on the go. Everything you make public
              will appear here.
            </p>
          </>
        )}
      </div>
    </div>

</div>  );
};

export default CreatePage;
