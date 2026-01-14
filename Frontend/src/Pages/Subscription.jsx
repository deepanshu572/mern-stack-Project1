import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PiVideo } from "react-icons/pi";
import { SiYoutubeshorts } from "react-icons/si";
import { LuBox } from "react-icons/lu";
import SideNav from "../components/SideNav";
import { getSubscribe } from "../Hooks/getAllSubscription";
import VideoCard from "../childComponent/VideoCard";
import ChannelShortsCard from "../childComponent/ChannelCards/ChannelShortsCard";
const Subscription = () => {
  getSubscribe();

  const [subscribedData, setSubscribedData] = useState();
  const [subscribedChannel, setSubscribedChannel] = useState();
  const subscribed = useSelector((state) => state.channels.AllSubscription);

  useEffect(() => {
    if (subscribed || subscribed?.length > 0) {
      setSubscribedData(subscribed);
      setSubscribedChannel(subscribed);
    }
  }, [subscribed]);

  const handleSubscribedData = (id) => {
    if (id == "true") {
      setSubscribedData(subscribed);
    } else {
      const FilteredSubscribed = subscribed.filter((item) => item?._id == id);
      setSubscribedData(FilteredSubscribed);
    }
  };

  console.log(subscribedData);
  return (
    <div className="flex">
      <SideNav />
      <div className="subscribed_wrap w-full p-4 mt-[3rem] md:mt-[5rem] ">
        <div className="subscribed_top_item flex items-center gap-4">
          <div className="subscribed_item_box flex flex-col items-center gap-1">
            <div
              onClick={() => handleSubscribedData("true")}
              className="subscribed_img w-15 h-15 flex items-center justify-center rounded-full overflow-hidden"
            >
              <LuBox className="w-10 h-10" />
            </div>
            <div className="subscribed_text text-xs">All</div>
          </div>
          {subscribedChannel?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleSubscribedData(item?._id)}
                className="subscribed_item_box flex flex-col items-center justify-center gap-1 "
              >
                <div className="subscribed_img w-15 h-15 cursor-pointer rounded-full overflow-hidden">
                  <img
                    className="w-full h-full  transition-all duration-300 ease-in-out object-cover hover:scale-[1.2] object-top"
                    src={item?.avatar}
                    alt={item?.name}
                  />
                </div>
                <div className="subscribed_text card_heading w-[55px]  text-xs">
                  {" "}
                  {item?.name}
                </div>
              </div>
            );
          })}
        </div>
        <h4 className="p-4 pl-1 text-sm mt-3 flex items-center gap-2">
          {" "}
          <SiYoutubeshorts className="fill-[#FF0033] w-6 h-8" /> Subscribed shorts
        </h4>
        <div className="subscibed_content flex overflow-x-auto justify-center sm:justify-start  w-full ml-auto sm:gap-[10px]  pt-[8px]">
          {subscribedData?.map((item, index) => {
            return item?.shorts.map((el) => {
              return (
                <ChannelShortsCard
                  data={el}
                  channel={el?.channel}
                  key={index}
                />
              );
            });
          })}
        </div>
        <h4 className="p-4 pl-1 text-sm mt-3 flex items-center gap-2">
          {" "}
          <PiVideo className="fill-[#FF0033] w-6 h-8" /> Subscribed Videos
        </h4>
        <div className="subscibed_content flex flex-wrap justify-center sm:justify-start  w-full ml-auto sm:gap-[10px]  pt-[8px]">
          {subscribedData?.map((item, index) => {
            return item?.videos.map((el) => {
              return (
                <VideoCard
                  id={el?._id}
                  image={el?.videoBanner}
                  video={el?.video}
                  title={el?.title}
                  views={el?.views}
                  description={el?.description}
                  channel={el?.channel}
                />
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
