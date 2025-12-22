import React, { useContext, useEffect, useState } from "react";
import ChannelCard from "../Component/channels/ChannelCard";
import { Context } from "../context/ContextApi";
import { fetchDataFromApi } from "../Utils/api";

const Channel = () => {
  const [channelVideo, setChannelVideo] = useState();
  const [dataHolder, setDataHolder] = useState();
  const [selectedIndex, setselectedIndex] = useState(0);

  const data = [
    { id: 1, name: "Home" },
    { id: 2, name: "Videos" },
    { id: 3, name: "Shorts" },
    { id: 4, name: "Live" },
  ];
  const { subscribeData , toggle , formatLikeCount } = useContext(Context);
  

  const FilterChanelType = (name) => {
    if (name === "Home") {
      setChannelVideo(dataHolder);
    } else if (name === "Videos") {
      alert("Videos");
      const data = dataHolder.filter((item) => {
        const title = item?.snippet?.title.split(" ");
        return title.some((word) => word.charAt(0) !== "#");
      });

      console.log(data);
      setChannelVideo(data);
    } else if (name === "Shorts") {
      alert("Shorts");
      const data = dataHolder.filter((item) => {
        const title = item?.snippet?.title.split(" ");
        return title.some((word) => word.charAt(0) === "#");
      });

      console.log(data);
      setChannelVideo(data);
    } else if (name === "Live") {
      alert("Live");
      const data = dataHolder.filter((item)=>{
        return item?.snippet?.liveBroadcastContent === "live";
      })
      setChannelVideo(data);
    }
  };

  const fetchSpecificChannel = (id) => {
    if (id) {
      fetchDataFromApi(
        `search?part=snippet&channelId=${id}&type=video&maxResults=4&order=date`
      ).then((res) => {
        console.log(res.items);
        setDataHolder(res.items);
        setChannelVideo(res.items);
      });
    } else {
      console.log("Channel not found");
    }
  };

  useEffect(() => {
    setselectedIndex(0)
    fetchSpecificChannel(subscribeData?.channelId);
  }, [subscribeData?.channelId]);

  console.log(channelVideo);
    var subscribe = formatLikeCount(subscribeData?.statistics?.subscriberCount || 0);
    var videoCount = formatLikeCount(subscribeData?.statistics?.videoCount || 0);



  return (
    <>
    
      <div className="channel_wrap lg:w-[81%] ml-auto pt-[3rem] ">
        <div className="channel_banner w-full h-[162px] ">
          {subscribeData ? (
            <img
              className="w-full h-full object-cover"
              src={subscribeData?.snippet?.thumbnails?.high?.url}
              alt=""
            />
          ) : (
            <img
              className="w-full h-full object-cover"
              src="https://yt3.googleusercontent.com/6ERPyDALiEB_YnLY_4PmzKF9TuumOhC-r9A3QWcDVYayu4zpvpG7oceXD4czyghoeJZbfg-nvA=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
              alt=""
            />
          )}
        </div>
        <div className="channel_desc_img flex sm:px-4 lg:px-0 items-center lg:items-center gap-3 flex-col lg:flex-row relative ">
          <div className="channel_img flex-shrink-0 w-[130px] h-[130px] absolute rounded-full overflow-hidden top-[-41%]  lg:relative ">
            {subscribeData ? (
              <img
                className="w-full h-full object-cover"
                src={subscribeData?.snippet?.thumbnails?.high?.url}
                alt=""
              />
            ) : (
              <img
                className="w-full h-full object-cover"
                src="https://yt3.googleusercontent.com/6ERPyDALiEB_YnLY_4PmzKF9TuumOhC-r9A3QWcDVYayu4zpvpG7oceXD4czyghoeJZbfg-nvA=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
                alt=""
              />
            )}
          </div>
          <div className="channel_info flex gap-2 p-[10px] mt-[2rem] lg:mt-0 lg:p-0 flex-col items-start ">
            <h2 className="channel_title font-[700] text-3xl ">
              {subscribeData?.snippet?.title}
            </h2>
            <span className="flex gap-2 text-gray-500">
              <b className={`text-[13px] ${toggle ? " text-[#fff]" : "text-black " }`}>
                {subscribeData?.snippet?.customUrl}
              </b>
              <p className="text-[13px]">{subscribe} subscribers</p>
              <p className="text-[13px]">{videoCount} videos</p>
            </span>
            <p className=" channel_desc text-[13px] text-gray-500">
              {subscribeData?.snippet?.description}
            </p>
            {/* <button className=" rounded-full p-2 px-5  text-[12px] ">
              Subscribed
            </button> */}
          </div>
        </div>
        <div className="channel_tabs ">
          <div className="channel_tab flex gap-[25px] pt-7 p-3">
            {data.map((item, index) => (
              <p
                key={index}
                onClick={() => {
                  FilterChanelType(item.name);
                  setselectedIndex(index);
                }}
                className={` ${
                  selectedIndex === index
                    ? toggle
                      ? "text-white  border-bt " // Subscribed + Dark mode
                      : "text-black border-bb "
                    : " text-gray-500"
                } channel_tab_item text-[13.6px] font-[500]  cursor-pointer`}
              >
                {item.name}
              </p>
            ))}
          </div>
        </div>
        <div className="channel_video p-3 flex gap-3 flex-wrap">
          {channelVideo?.length > 0 ? (
            channelVideo?.map((item, index) => {
              return <ChannelCard data={item} key={index} />;
            })
          ) : (
            <div className="flex text-center h-[20rem] w-full items-center justify-center flex-col">
            <img className="w-20 h-20" src="https://myntra-umber.vercel.app/assets/sad-Csmh6fkm.gif" alt="" />
            <p  >Oops! We couldn’t find any videos</p>
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Channel;
