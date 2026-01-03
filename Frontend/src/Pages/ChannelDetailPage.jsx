import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import ChannelCard from "../components/ChannelCard";
import { useSelector } from "react-redux";
import { fetchChannelDetail  } from "../Hooks/getChannelDetail";
import { useParams } from "react-router";
import axios from "axios";
import { serverUrl } from "../App";

const ChannelDetailPage = () => {
  fetchChannelDetail();
  const { id } = useParams();

  const channelData = useSelector((state) => state.content.channelDetail);

  const [channelDetail, setChannelDetail] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [channelContent, setChannelContent] = useState();

  const getChannelContent = async (name) => {
   console.log(name + "getChannelVideos");
   try {
     const result = await axios.post(serverUrl + `/api/channel/${name}/${id}`, {
       withCredentials: true,
     });
     return result;
   } catch (error) {
     console.log(error);
   }
 };
  
  const handleDataFilter = async (index, name) => {
    setSelectedIndex(index);

    switch (name || "Home") {
      case "Home":
        console.log(name);
        const data =  await getChannelContent("videos");
        console.log(data);
        // channelContent(channelDetail?.Videos);
        break;
      case "Shorts":
        console.log(name);
        break;
      case "Playlist":
        console.log(name);
        break;

      case "Posts":
        console.log(name);
        break;
    }
  };


  useEffect(() => {
    if (channelData?.length > 0 || channelData !== null) {
      setChannelDetail(channelData);
    }
  });
  // console.log(channelData);
  return (
    <div className="flex">
      <SideNav />
      <div className="channel_wrap  w-full p-4 md:mt-[5rem]  ">
        <div className="channel_banner w-full h-[162px] ">
          {channelDetail?.bannerImage ? (
            <img
              className="w-full h-full object-cover"
              src={channelDetail?.bannerImage}
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
            {channelDetail?.avatar ? (
              <img
                className="w-full h-full object-cover object-top"
                src={channelDetail?.avatar}
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
              {channelDetail?.name}
            </h2>
            <span className="flex gap-2 text-gray-500">
              <b className={`text-[13px] `}>{channelDetail?.category}</b>
              <p className="text-[13px]">231k subscribers</p>
              <p className="text-[13px]">30 videos</p>
            </span>
            <p className=" channel_desc text-[13px] text-gray-500">
              {channelDetail?.description}
            </p>
            {/* <button className=" rounded-full p-2 px-5  text-[12px] ">
              Subscribed
            </button> */}
          </div>
        </div>
        <div className="channel_tabs ">
          <div className="channel_tab flex gap-[25px] pt-7 p-3">
            {["Home", "Shorts", "Playlist", "Community"].map((item, index) => (
              <p
                key={index}
                onClick={() => {
                  handleDataFilter(index, item);
                }}
                className={` ${
                  selectedIndex === index ? " border-b" : " text-gray-500"
                } channel_tab_item text-[13.6px] font-[500]  cursor-pointer`}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="channel_video p-3 flex gap-3 flex-wrap">
          {channelDetail?.length > 0 ? (
            channelDetail?.map((item, index) => {
              return <ChannelCard data={item} key={index} />;
            })
          ) : (
            <div className="flex text-center h-[20rem] w-full items-center justify-center flex-col">
              <img
                className="w-20 h-20"
                src="https://myntra-umber.vercel.app/assets/sad-Csmh6fkm.gif"
                alt=""
              />
              <p>Oops! We couldn’t find any videos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelDetailPage;
