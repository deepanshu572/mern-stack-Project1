import { useContext } from "react";
import VideoCard from "../childComponent/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import axios from "axios";
import { getVideos } from "../redux/contentSlice";

const VideosData = () => {
  const videos = useSelector((state) => state.content.videos);
  const dispatch = useDispatch();
  const handleViews = async (id) => {
    try {
      const { data } = await axios.put(
        `${serverUrl}/api/toggles/video/${id}/AddViews`,
        {},
        { withCredentials: true },
      );
       const updatedVideos = videos.map((item) =>
      item._id === id
        ? { ...item, views: data?.video?.views }
        : item
    );
      dispatch(getVideos(updatedVideos));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="videoCard_wrapper">
        <div className=" flex flex-wrap justify-center sm:justify-start  w-full ml-auto sm:gap-[10px]  pt-[54px] sm:pt-[80px] lg:pt-[79px] ">
          {videos?.map((item, index) => {
            return (
              <VideoCard
                id={item?._id}
                action={handleViews}
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
