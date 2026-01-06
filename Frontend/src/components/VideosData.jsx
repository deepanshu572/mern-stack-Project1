import { useContext } from "react";
import VideoCard from "../childComponent/VideoCard";
import { useSelector } from "react-redux";

const VideosData = () => {
  const videos = useSelector((state) => state.content.videos);

  return (
    <>
      <div className="videoCard_wrapper">
        <div className=" flex flex-wrap justify-center sm:justify-start  w-full ml-auto sm:gap-[10px]  pt-[54px] sm:pt-[80px] lg:pt-[79px] ">
          {videos?.map((item, index) => {
            return (
              <VideoCard
              id={item?._id}
                image={item?.videoBanner}
                video={item?.video}
                title={item?.title}
                views={item?.views}
                description={item?.description}
                channel={item?.channel}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default VideosData;
