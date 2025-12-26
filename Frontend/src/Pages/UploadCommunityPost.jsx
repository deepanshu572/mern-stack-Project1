import React from "react";
import { IoImages } from "react-icons/io5";
import SideNav from "../components/SideNav";

const UploadCommunityPost = () => {
  return (
      <div className="flex gap-3">
    <SideNav/>
    <div className="create w-full p-4 md:mt-[5rem] ">
      <h3 className="text-3xl font-bold">Upload Community Post</h3>
      <p className="text-xs pt-1 border-b border-[#393939e4] pb-2 text-[#5e5e5e]">
        Share text, images, polls, and more with your audience
      </p>
      <form className="form m-4">
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
        <label htmlFor="uploadShort" className="flex gap-1 py-3">
          <input
            type="file"
            accept="video/*"
            name="uploadShort"
            className="hidden"
            id="uploadShort"
          />

          <IoImages className="w-5 h-5  text-[#5e5e5e]" />
          <h3 className="text-sm">image (optionally)</h3>
        </label>
        <div className="wraper hidden upload_form bg-[#0b0b0b61] h-85  border border-dashed border-[#5e5e5e4d] rounded-lg p-8  flex flex-col items-center justify-center cursor-pointer hover:bg-[#111111af] transition-all duration-300 ease-in-out">
          <img
            className="w-full h-full max-h-60 object-contain "
            src="https://a.storyblok.com/f/133769/758x508/8a1ff60d00/home-news-4.jpg/m/1200x804/filters:quality(90)"
            alt=""
          />
        </div>

        <div className="flex justify-center">
          <button className=" bg-[green] rounded-sm px-[8px] py-[10px] w-full cursor-pointer  transition-all duration-300 ease-in-out">
            Publish Short
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UploadCommunityPost;
