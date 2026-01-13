import React, { useEffect, useRef, useState } from "react";
import SideNav from "../components/SideNav";
import { useDispatch, useSelector } from "react-redux";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { serverUrl } from "../App";
import axios from "axios";
import { getShorts } from "../redux/contentSlice";
import { Link } from "react-router";

const Shorts = () => {
  const dispatch = useDispatch();
  const shorts = useSelector((state) => state.content.shorts);
  const users = useSelector((state) => state.usersData.userData);
  const channels = useSelector((state) => state.usersData.channelData);
  const Allchannels = useSelector((state) => state.channels.AllChannels);
  const [user, setUser] = useState();
  const [channel, setchannel] = useState();

  const [shortsData, setShortsData] = useState();
  const [toggleControls, setToggleControls] = useState();
  const shortsRefs = useRef([]);

  useEffect(() => {
    if (shorts || shorts?.length > 0) {
      const shuffledRelatedShorts = [...shorts].sort(() => Math.random() - 0.5);
      setShortsData(shuffledRelatedShorts);
    }
    if (users || users?.length > 0) {
      setUser(users);
    }
    if (Allchannels || Allchannels?.length > 0) {
      setchannel(Allchannels);
    }
  }, []);

  useEffect(() => {
    if (!shortsData?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          const video = shortsRefs.current[index];

          if (!video) return;

          if (entry.isIntersecting) {
            video.muted = false;
            video.play();
            setToggleControls(null);
          } else {
            video.muted = true;
            video.pause();
            setToggleControls(index);
          }
        });
      },
      {
        threshold: 0.7, // 70% visible = play
      }
    );

    shortsRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [shortsData]);

  const togglePlayPause = (index) => {
    const video = shortsRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
        setToggleControls(null);
      } else {
        video.pause();
        setToggleControls(index);
      }
    }
    //   setToggleControls(!toggleControls)
  };

  const handleLikes = async (shortId) => {
    // console.log(shortId);
    try {
      const { data } = await axios.put(
        `${serverUrl}/api/toggles/short/${shortId}/likeToggle`,
        {},
        { withCredentials: true }
      );

      const updatedShorts = shorts.map((item) => {
        if (item._id.toString() === shortId) {
          return {
            ...item,
            like: data?.short?.like,
            dislike: data?.short?.dislike,
          };
        }
        return item;
      });

      setShortsData(updatedShorts);
      dispatch(getShorts(updatedShorts));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDisLikes = async (shortId) => {
    try {
      const { data } = await axios.put(
        `${serverUrl}/api/toggles/short/${shortId}/DislikeToggle`,
        {},
        { withCredentials: true }
      );
      const updatedShorts = shorts.map((item) => {
        if (item._id.toString() === shortId) {
          return {
            ...item,
            like: data?.short?.like,
            dislike: data?.short?.dislike,
          };
        }
        return item;
      });

      setShortsData(updatedShorts);
      dispatch(getShorts(updatedShorts));
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async (shortId) => {
    try {
      const { data } = await axios.put(
        `${serverUrl}/api/toggles/short/${shortId}/saveShort`,
        {},
        { withCredentials: true }
      );
      const updatedShorts = shorts.map((item) => {
        if (item._id.toString() === shortId) {
          return {
            ...item,
            saveBy: data?.short?.saveBy,
          };
        }
        return item;
      });

      setShortsData(updatedShorts);
      dispatch(getShorts(updatedShorts));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubscriber = async (channelId) => {
    try {
      const { data, user } = await axios.post(
        `${serverUrl}/api/users/subscribe`,
        { channelId },
        { withCredentials: true }
      );

      const updatedShorts = shortsData.map((item) => {
        if (item.channel._id === channelId) {
          return {
            ...item,
            channel: {
              ...item.channel,
              subscribers: data.channel.subscribers,
            },
          };
        }
        return item;
      });

      setShortsData(updatedShorts);
      dispatch(getShorts(updatedShorts));
      // dispatch(getUserData(user));
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(shortsData);

  return (
    <div className="flex">
      <SideNav />
      <div className=" hide_scroll w-full h-[85vh] overflow-y-scroll snap-y snap-mandatory p-4 md:mt-[5rem]">
        {shortsData?.map((item, index) => {
          return (
            <div className="min-h-full w-full flex md:items-center items-start justify-center snap-start relative pt-[40px] md:pt-[0px] mt-[3rem] ">
              <div
                onClick={() => togglePlayPause(index)}
                className="relative w-[420px] md:w-[250px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-xl border border-gray-700 cursor-pointer"
              >
                <video
                  className="h-full w-full"
                  ref={(el) => (shortsRefs.current[index] = el)}
                  data-index={index}
                  playsInline
                  loop
                  src={item?.video}
                ></video>
                <div className="flex absolute top-2 right-2 bg-[#7877778a] hover:bg-[#b1b1b19e] text-white w-10 h-10 items-center justify-center rounded-full">
                  {toggleControls === index ? <FaPlay /> : <FaPause />}
                </div>
                <div className="flex flex-col gap-1 absolute bottom-20 right-2 ">
                  <div
                    onClick={() => handleLikes(item?._id)}
                    className="flex_like mb-1 text-white  items-center justify-center  flex flex-col"
                  >
                    <div className="  bg-[#7877778a] hover:bg-[#b1b1b19e] w-8 h-8  rounded-full items-center justify-center  flex">
                      {item?.like.find((item) => item === user?._id) ? (
                        <AiFillLike />
                      ) : (
                        <AiOutlineLike />
                      )}
                    </div>
                    <p className="text-[11px] mt-0.5">{item?.like?.length} </p>
                  </div>
                  <div
                    onClick={() => handleDisLikes(item?._id)}
                    className="flex_like mb-1 text-white  items-center justify-center  flex flex-col"
                  >
                    <div className="  bg-[#7877778a] hover:bg-[#b1b1b19e] w-8 h-8  rounded-full items-center justify-center  flex">
                      {item?.dislike.find((item) => item === user?._id) ? (
                        <AiFillDislike />
                      ) : (
                        <AiOutlineDislike />
                      )}
                    </div>
                    <p className="text-[11px] mt-0.5">
                      {item?.dislike?.length}{" "}
                    </p>
                  </div>
                  <div className="flex_like mb-1 text-white  items-center justify-center  flex flex-col">
                    <div className="  bg-[#7877778a] hover:bg-[#b1b1b19e] w-8 h-8  rounded-full items-center justify-center  flex">
                      <FaRegCommentDots />
                    </div>
                    <p className="text-[11px] mt-0.5">22k</p>
                  </div>
                  <div className="flex_like mb-1 text-white  items-center justify-center  flex flex-col">
                    <div
                      onClick={() => handleSave(item?._id)}
                      className="  bg-[#7877778a] hover:bg-[#b1b1b19e] w-8 h-8  rounded-full items-center justify-center  flex"
                    >
                      {item?.saveBy.find((item) => item === user?._id) ? (
                        <FaBookmark />
                      ) : (
                        <FaRegBookmark />
                      )}
                    </div>
                    <p className="text-[11px] mt-0.5">save</p>
                  </div>
                  <div className="flex_like mb-1 text-white  items-center justify-center  flex flex-col">
                    <div className="  bg-[#7877778a] hover:bg-[#b1b1b19e] w-8 h-8  rounded-full items-center justify-center  flex">
                      <LuDownload />
                    </div>
                  </div>
                </div>

                <div className="flex flex_content absolute w-full bottom-0 h-20 p-5 px-2 bg-[#4442425c] items-start gap-2 mt-1 pt-3  ">
                  <div className=" shrink-0 w-6 h-6 overflow-hidden rounded-full mt-1">
                    <img
                      className="w-full h-full object-top object-cover"
                      src={item?.channel?.avatar}
                      alt=""
                    />
                  </div>

                  <div className="channel_txt flex flex-col w-full ">
                    <div className="flex items-center  justify-between">
                      <Link to={`/ChannelDetail/${item?.channel?._id}`}>
                        <h2 className="channel_title text-xs ">
                          {item?.channel?.name}
                        </h2>
                      </Link>

                      <button
                        className={` ${
                          item?.channel?.subscribers?.includes(user?._id)
                            ? "bg-[#000000c4] text-white border border-gray-600 "
                            : "bg-white text-black border "
                        }  p-1.5 rounded-full text-[9px] font-medium px-2`}
                        onClick={() => handleSubscriber(item?.channel?._id)}
                      >
                        {item?.channel?.subscribers?.includes(user?._id)
                          ? "Subscribed"
                          : "Subscribe"}
                      </button>
                    </div>
                    <p className="text-[10px] mt-1 title_elipse">
                      {item?.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shorts;
