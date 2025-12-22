import React from "react";
import { useContext } from "react";
import { Context } from "../../context/ContextApi";
import VideoCard from "./VideoCard";

const VideosData = () => {
  const { Loading, SearchResult } = useContext(Context);

  const data = SearchResult?.items;
  return (
    <>
    <div className="videoCard_wrapper  lg:w-[81%] sm:pl-[0.8rem] lg:ml-auto">
    <div className=" flex flex-wrap justify-center sm:justify-start  w-full ml-auto sm:gap-[10px]  pt-[54px] sm:pt-[60px] lg:pt-[65px] ">
 
    {data?.length > 0 ? (
        data.map((val) => {
           
          return <VideoCard key={val?.id?.videoId} videoIdData={val?.id} video={val?.snippet} />;
        })
      ) : (
        <div>No results found.</div> // Render a fallback message if no results exist
      )}
      </div>
      </div>
    </>
  );
};

export default VideosData;
