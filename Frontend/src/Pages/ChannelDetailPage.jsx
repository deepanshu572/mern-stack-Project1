import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import ChannelVideoCard from "../childComponent/ChannelCards/ChannelVideoCard";
import ChannelCommunityCard from "../childComponent/ChannelCards/ChannelCommunityCard";
import ChannelShortsCard from "../childComponent/ChannelCards/ChannelShortsCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ChannelPlaylistCard from "../childComponent/ChannelCards/ChannelPlaylistCard";
import { getAllChannel } from "../Hooks/getAllChannel";

const ChannelDetailPage = () => {
  getAllChannel();
  const { id } = useParams();
  const channels = useSelector((state) => state.channels.AllChannels);
  const [channelDetail, setChannelDetail] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedName, setSelectedName] = useState("Home");

  const handleDataFilter = async (index, name) => {
    setSelectedIndex(index);
    setSelectedName(name);
  };

  useEffect(() => {
    if (channels?.length > 0 || channels !== null) {
      const AllChannel = channels.find((item) => item?._id === id);
      setChannelDetail(AllChannel);
    }
  }, [id]);

  const renderContent = (data, name, renderItem) => {
    if (!data || data.length === 0) {
      return (
        <div className="flex text-center h-[20rem] w-full items-center justify-center flex-col">
          <img
            className="w-20 h-20"
            src="https://myntra-umber.vercel.app/assets/sad-Csmh6fkm.gif"
            alt=""
          />
          <p>Oops! We couldn’t find any {name === "Home" ? "Videos" : name}</p>
        </div>
      );
    }
    return data.map(renderItem);
  };

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
              <p className="text-[13px]">
                {channelDetail?.subscribers?.length} subscribers
              </p>
              <p className="text-[13px]">
                {channelDetail?.videos?.length} videos
              </p>
            </span>
            <p className=" channel_desc text-[13px] text-gray-500">
              {channelDetail?.description}
            </p>
            {/* <button className=" rounded-full p-2 px-5  text-[12px] ">
              Subscribed
            </button> */}
          </div>
        </div>
        <div className="channel_tabs border-b border-gray-800 ">
          <div className="channel_tab flex gap-[25px] pt-7 p-3">
            {["Home", "Shorts", "Playlist", "Community"].map((item, index) => (
              <p
                key={index}
                onClick={() => {
                  handleDataFilter(index, item);
                }}
                className={` ${
                  selectedIndex === index ? " " : " text-gray-500"
                } channel_tab_item text-[13.6px] font-[500]  cursor-pointer`}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="channel_video p-3 mt-3 flex gap-3 flex-wrap">
          {selectedName === "Home" &&
            renderContent(channelDetail?.videos, "Home", (item, index) => (
              <ChannelVideoCard
                data={item}
                channel={channelDetail}
                key={index}
              />
            ))}

          {selectedName === "Shorts" &&
            renderContent(channelDetail?.shorts, "Shorts", (item, index) => (
              <ChannelShortsCard
                data={item}
                channel={channelDetail}
                key={index}
              />
            ))}

          {selectedName === "Playlist" &&
            renderContent(
              channelDetail?.playlists,
              "Playlists",
              (item, index) => (
                <ChannelPlaylistCard
                  data={item}
                  channel={channelDetail}
                  key={index}
                />
              )
            )}

          {selectedName === "Community" &&
            renderContent(
              channelDetail?.communityPosts,
              "Community",
              (item, index) => (
                <ChannelCommunityCard
                  data={item}
                  channel={channelDetail}
                  key={index}
                />
              )
            )}

          {/* <div className="flex text-center h-[20rem] w-full items-center justify-center flex-col">
              <img
                className="w-20 h-20"
                src="https://myntra-umber.vercel.app/assets/sad-Csmh6fkm.gif"
                alt=""
              />
              <p>Oops! We couldn’t find any videos</p>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChannelDetailPage;
