import SideNav from "../components/SideNav";
import { IoBookmarks } from "react-icons/io5";
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect, useState } from "react";
import ChannelPlaylistCard from "../childComponent/ChannelCards/ChannelPlaylistCard";
import { useSelector } from "react-redux";
import { FaXmark } from "react-icons/fa6";
import VideoCard from "../childComponent/VideoCard";

const SavedPlaylistData = () => {
  const channels = useSelector((state) => state.channels.AllChannels);
  const users = useSelector((state) => state.usersData.userData);
  const [user, setUser] = useState();
  const [channelDetail, setChannelDetail] = useState();
  const [savedPlaylist, setSavedPlaylist] = useState();
  const [playlistVideos, setPlaylistVideos] = useState();
  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    if (users?.length > 0 || users !== null) {
      setUser(users);
    }
  }, []);
  const handlePlaylistVideos = (vidoesData, title, channel) => {
    console.log(vidoesData, title, channel);
    setPlaylistVideos({ vidoesData, title, channel });
    settoggle(true);
  };

  const handlePlaylist = async (playlistId) => {
    try {
      const { data } = await axios.put(
        `${serverUrl}/api/toggles/playlist/${playlistId}/save`,
        {},
        { withCredentials: true },
      );
      setSavedPlaylist((prev) =>
        prev.map((item) => (item._id === playlistId ? data : item)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSavedPlaylist = async () => {
    try {
      const { data } = await axios.get(
        serverUrl + "/api/content/playlistData",
        {
          withCredentials: true,
        },
      );
      setSavedPlaylist(data?.playlist);
      console.log(data?.playlist);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleSavedPlaylist();
  }, []);


  return (
    <div className="flex">
      <SideNav />
      <div
        className={`  transition-all duration-700 ease-in-out
                          z-10
                          ${
                            toggle
                              ? " opacity-100"
                              : " opacity-0 pointer-events-none"
                          } fixed inset-0 bg-[#00000032] flex justify-center items-center z-[1090] backdrop-blur-sm`}
      >
        <div className=" bg-black hide_scroll  p-5 rounded-xl overflow-hidden sm:w-1/2 h-1/2 overflow-y-auto">
          <div className="flex justify-between border-b  pb-2 mb-4 border-b-gray-700 ">
            <h3 className=" text-sm">
              PlayList Videos - {playlistVideos?.title}{" "}
            </h3>

            <FaXmark
              className="cursor-pointer"
              onClick={() => settoggle(false)}
            />
          </div>

          <div className="flex items-center flex-wrap justify-center ">
            {toggle === true &&
            
             playlistVideos?.vidoesData?.map((item) => {
              
                  return (
                    <VideoCard
                      id={item?._id}
                      image={item?.videoBanner}
                      video={item?.video}
                      title={item?.title}
                      views={item?.views}
                      description={item?.description}
                      channel={playlistVideos?.channel}
                      
                    />
                  );
               
              })}
          </div>
        </div>
      </div>
      <div className=" w-full p-4 md:mt-[5rem]">
        <h4 className="p-4 pl-1 text-sm  flex items-center gap-2">
          {" "}
          <IoBookmarks className="fill-[#FF0033] w-5 h-6" /> Saved Playlist
        </h4>
        <div className="channel_video  p-3 mt-3 flex gap-3 flex-wrap relative">
          {savedPlaylist?.map((item, index) => {
            return (
              <ChannelPlaylistCard
                data={item}
                channel={item?.channel}
                key={index}
                user={user}
                action1={() =>
                  handlePlaylistVideos(item?.selectedVideos, item?.title, item?.channel)
                }
                action2={() => handlePlaylist(item?._id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SavedPlaylistData;
