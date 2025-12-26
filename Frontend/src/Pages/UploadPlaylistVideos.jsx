import React from "react";
import SideNav from "../components/SideNav";

const UploadPlaylistVideos = () => {
  return (
      <div className="flex gap-3">
    <SideNav/>
    <div className="create w-full p-4 md:mt-[5rem] ">
      <h3 className="text-3xl font-bold">Create New Playlist</h3>
      <p className="text-xs pt-1 border-b border-[#393939e4] pb-2 text-[#5e5e5e]">
        Add videos to your new playlist
      </p>
      <form className="form m-4 flex flex-col gap-3">
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
            className="w-full text-sm p-2 rounded bg-[#0b0b0b61] border border-[#5e5e5e4d] focus:outline-none focus:border-[#9f9f9fb0]"
            placeholder="Write somthing for your community post.."
          ></textarea>
        </div>
        <div className="select_vid">
          <h3>Select Videos</h3>
          <div className="box_select">
            <div className="video">
              <img src="" alt="" />
            </div>
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
