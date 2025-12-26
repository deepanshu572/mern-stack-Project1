import React from "react";
import { Link } from "react-router";

const CreateChannel = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-col w-1/3 bg-[#11101096] p-4 rounded-md">
        <h2>How you’ll appear</h2>
        <p className="text-xs mb-2 text-[#5e5e5e]">
          Choose a profile picture, channel name.
        </p>
        <div className="profile flex flex-col items-center justify-center gap-4 mt-4">
          <label htmlFor="avatar">
            <input
              type="file"
              accept="image/*"
              name="avatar"
              id="avatar"
              className="hidden"
            />
            <div className="profile_img w-20 h-20 rounded-full overflow-hidden">
              <img className="w-full h-full object-cover" src="" alt="" />
            </div>
            <p className="text-xs text-[#346eeb] mt-2 font-medium">
              {" "}
              Upload picture
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
            />
          </div>
          <div className="flex justify-center w-full">
            <button className=" bg-[green] text-sm rounded-sm px-[8px] py-[10px] w-full cursor-pointer  transition-all duration-300 ease-in-out">
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
    </div>
  );
};

export default CreateChannel;
