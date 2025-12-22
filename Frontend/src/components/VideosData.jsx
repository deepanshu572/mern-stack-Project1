import { useContext } from "react";
import VideoCard from "../childComponent/VideoCard";

const VideosData = () => {
  return (
    <>
      <div className="videoCard_wrapper  lg:w-[81%] sm:pl-[0.8rem] lg:ml-auto">
        <div className=" flex flex-wrap justify-center sm:justify-start  w-full ml-auto sm:gap-[10px]  pt-[54px] sm:pt-[60px] lg:pt-[79px] ">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
            return <VideoCard />
          })}
        </div>
      </div>
    </>
  );
};

export default VideosData;
