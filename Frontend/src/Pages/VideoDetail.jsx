import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { IoMdArrowRoundDown } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { PiVideo } from "react-icons/pi";
import { timeAgo } from "../Utils/timeConvertor";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import RelatedVideoData from "../childComponent/VideoDetail/RelatedVideoData";
import ChannelShortsCard from "../childComponent/ChannelCards/ChannelShortsCard";
import { getShorts, getVideos } from "../redux/contentSlice";
import axios from "axios";
import { serverUrl } from "../App";
import { getAllContentData } from "../Hooks/getAllContentData";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";

const VideoDetail = () => {
  const videos = useSelector((state) => state.content.videos);
  const shorts = useSelector((state) => state.content.shorts);
  const users = useSelector((state) => state.usersData.userData);

  const [user, setUser] = useState();
  const [videoData, setVideoData] = useState();
  const [AllVideoData, setAllVideoData] = useState();
  const [relatedVideo, setRelatedVideo] = useState();
  const [relatedshorts, setRelatedshorts] = useState();
  const [ToggleComment, setToggleComment] = useState(false);
  const [newComment, setNewComment] = useState();
  const [newReply, setNewReply] = useState();
  const [commentData, setCommentData] = useState([]);
  const [selectedCommentId, setSelectedCommentId] = useState([]);
  const { toggle, Settoggle } = useState(true);
  const { id } = useParams();

      const dispatch = useDispatch();

  useEffect(() => {
    if (videos?.length > 0 || videos !== null) {
      setAllVideoData(videos);

      const video = videos.find((item) => item?._id === id);
      const AllrelatedVideos = videos.filter(
        (item) => item?.tags == video?.tags
      );
      const AllrelatedShorts = shorts.filter(
        (item) => item?.tags == video?.tags
      );
      const shuffledRelatedShorts = [...AllrelatedShorts].sort(
        () => Math.random() - 0.5
      );
      const shuffledrelatedVideos = [...AllrelatedVideos].sort(
        () => Math.random() - 0.5
      );
      setVideoData(video);
      setRelatedVideo(shuffledrelatedVideos);
      setRelatedshorts(shuffledRelatedShorts);
      setCommentData(video?.comments);
    }
  }, [id]);

  useEffect(() => {
    if (users || users?.length > 0) {
      setUser(users);
    }
  }, [id]);

  const handleSubscriber = async (channelId) => {
    try {
      const { data, user } = await axios.post(
        `${serverUrl}/api/users/subscribe`,
        { channelId },
        { withCredentials: true }
      );
      if (videoData?.channel?._id === channelId) {
        setVideoData((prev) => {
          return {
            ...prev,
            channel: {
              ...prev.channel,
              subscribers: data.channel.subscribers,
            },
          };
        });
        dispatch(getVideos(videoData));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async (videoId) => {
    try {
      const { data } = await axios.put(
        `${serverUrl}/api/toggles/video/${videoId}/savevideo`,
        {},
        { withCredentials: true }
      );
      if (videoData?._id === videoId) {
        setVideoData((prev) => {
          return {
            ...prev,
            saveBy: data?.video?.saveBy,
          };
        });
        console.log(videoData);
        dispatch(getVideos(videoData));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLikes = async (videoId) => {
    try {
      const { data } = await axios.put(
        `${serverUrl}/api/toggles/video/${videoId}/likeToggle`,
        {},
        { withCredentials: true }
      );

      if (videoData?._id === videoId) {
        setVideoData((prev) => {
          return {
            ...prev,
            like: data?.video?.like,
            dislike: data?.video?.dislike,
          };
        });
        dispatch(getVideos(videoData));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDisLikes = async (videoId) => {
    try {
      const { data } = await axios.put(
        `${serverUrl}/api/toggles/video/${videoId}/DislikeToggle`,
        {},
        { withCredentials: true }
      );

      if (videoData?._id === videoId) {
        setVideoData((prev) => {
          return {
            ...prev,
            like: data?.video?.like,
            dislike: data?.video?.dislike,
          };
        });
        setAllVideoData((prev) => {
          return {
            ...prev,
            like: data?.video?.like,
            dislike: data?.video?.dislike,
          };
        });
        dispatch(getVideos(AllVideoData));
        console.log("===========", AllVideoData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleComments = async (videoId) => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/toggles/video/${videoId}/AddComment`,
        { message: newComment },
        { withCredentials: true }
      );
      console.log(data);
      setCommentData(data?.video?.comments);
      setNewComment("");
    } catch (err) {
      console.log(err);
    }
  };
  const handleReply = async (videoId, commentId) => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/toggles/video/${videoId}/AddReply`,
        { message: newReply, commentId },
        { withCredentials: true }
      );
      console.log(data?.video?.comments);

      setCommentData(data?.video?.comments);

      setNewReply("");
    } catch (err) {
      console.log(err);
    }
  };
  const handleVideoViews = async (id) => {
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
    console.log(updatedVideos)
      dispatch(getVideos(updatedVideos));
      setRelatedVideo(updatedVideos)
    } catch (err) {
      console.log(err);
    }
  };
  const handleShortViews = async (id) => {
    try {
      const { data } = await axios.put(
        `${serverUrl}/api/toggles/short/${id}/AddViews`,
        {},
        { withCredentials: true },
      );
      console.log(data)
       const updatedShorts = shorts.map((item) =>
      item._id === id
        ? { ...item, views: data?.short?.views }
        : item
    );

      dispatch(getShorts(updatedShorts));
      setRelatedshorts(updatedShorts)
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <div className="flex justify-center w-full pt-[2.7rem] sm:px-[3rem] sm:pt-[5.2rem] flex-col sm:flex-col lg:flex-row">
        <div className="wraper relative lg:w-[44rem] ">
          <div className="fixed w-full yt_player z-1080   sm:relative sm:h-[24rem]  lg:w-[44rem]  h-[14.7rem]  flex-shrink-0">
            <video
              className="react-player rounded-2xl bg-black  relative z-1080  object-contain w-full h-full"
              src={videoData?.video}
              muted
              controls
            ></video>
            <div className={`blank sm:hidden bg-black `}></div>
          </div>

          <div className="yt_desc mt-[15rem] sm:mt-0 px-[18px] sm:px-0 py-[10px]">
            <div className="top">
              <h3 className=" font-[600] text-[13px] sm:text-[16px]">
                {videoData?.title}
              </h3>

              <div className="yt_time flex items-center gap-[6px] py-[2px] ">
                <p className={`text-white  text-[12px] `}>
                  {videoData?.views} Views
                </p>
                <div
                  className={`w-[2px] h-[2px] rounded-full text-black bg-[#e3e3e3] `}
                ></div>
                <p className={` text-white text-[12px]`}>
                  {timeAgo(videoData?.createdAt)}
                </p>
              </div>
            </div>
            <div className="wrapper_dets flex sm:items-center flex-col sm:flex-row sm:justify-between ">
              <div className="chanel_dets flex items-center justify-between py-[7px] sm:gap-[20px] ">
                <Link
                  to={`/ChannelDetail/${videoData?.channel?._id}`}
                  className="chanel_left flex items-center gap-[12px] "
                >
                  <img
                    className=" w-[40px] shrink-0 h-[40px] object-cover object-top rounded-full "
                    src={videoData?.channel?.avatar}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <h4 className=" text-[13px] font-[500] ">
                      {videoData?.channel?.name}
                    </h4>
                    <p className="text-[11px] text-[#aaa]">
                      {videoData?.channel?.subscribers?.length} subscribers
                    </p>
                  </div>
                </Link>
                <div className="chanel_right">
                  <button
                    className={` cursor-pointer ${
                      videoData?.channel?.subscribers?.includes(user?._id)
                        ? "bg-[#21212161] text-white  "
                        : "bg-white text-black border border-gray-600"
                    }  p-2 rounded-full text-xs  font-medium px-4`}
                    onClick={() => handleSubscriber(videoData?.channel?._id)}
                  >
                    {videoData?.channel?.subscribers?.includes(user?._id)
                      ? "Subscribed"
                      : "Subscribe"}
                  </button>
                </div>
              </div>
              <div className="bottom flex items-center justify-between py-[10px] gap-[9px] overflow-x-scroll sm:gap-[10px] ">
                <div
                  className={` rounded-full icon_sec_wrap flex items-center  gap-2 px-[10px] py-[4px]  bg-[#21212161] text-[#fff]rounded-[27px] `}
                >
                  <div
                    onClick={() => handleLikes(videoData?._id)}
                    className="icon1  flex items-center cursor-pointer gap-2 text-[12px]"
                  >
                    {videoData?.like?.find((item) => item === user?._id) ? (
                      <BiSolidLike />
                    ) : (
                      <BiLike />
                    )}
                    <p>{videoData?.like?.length}</p>
                  </div>
                  <p>|</p>
                  <div
                    onClick={() => handleDisLikes(videoData?._id)}
                    className="icon2 cursor-pointer"
                  >
                    {videoData?.dislike?.find((item) => item === user?._id) ? (
                      <BiSolidDislike />
                    ) : (
                      <BiDislike />
                    )}
                  </div>
                </div>
                <div
                  className={`icon3 flex items-center gap-2 px-[8px] py-[6px] text-[12px]   rounded-[20px] bg-[#21212161] text-[#fff]`}
                >
                  <RiShareForwardLine />
                  <p>Share</p>
                </div>
                <div
                  onClick={() => handleSave(videoData?._id)}
                  className={`icon3 flex cursor-pointer items-center gap-1  px-[8px] py-[6px]  text-[12px]  rounded-[20px] bg-[#21212161] text-[#fff]`}
                >
                  {videoData?.saveBy?.find((item) => item === user?._id) ? (
                    <FaBookmark />
                  ) : (
                    <FaRegBookmark />
                  )}

                  <p>
                    {" "}
                    {videoData?.saveBy?.find((item) => item === user?._id)
                      ? "Saved"
                      : "Save"}
                  </p>
                </div>
                <div
                  className={`icon3 flex items-center gap-2  px-[8px] py-[6px]  text-[12px]  rounded-[20px] 
                   bg-[#21212161] text-[#fff]`}
                >
                  <IoMdArrowRoundDown />

                  <p>Download</p>
                </div>
              </div>
            </div>
            <div
              className={`Description  p-3 py-2 w-full  mt-2
                 bg-[#21212161] text-[#fff] 
               rounded-[10px]   `}
            >
              <h3 className=" text-sm ">Description</h3>
              <p
                className={`text-xs my-2 mb-0 text-gray-300 whitespace-pre-line ${
                  ToggleComment ? " " : "line-clamp-1"
                } `}
              >
                {videoData?.description}
              </p>
              <button
                onClick={() => setToggleComment(!ToggleComment)}
                class="text-xs text-blue-400 mt-1 cursor-pointer hover:underline"
              >
                {ToggleComment ? " Show less" : "Show more"}
              </button>
            </div>
            <div className="comments p-3 mt-3 ">
              <h3 className="text-sm">{commentData?.length} Comments</h3>
              <div className="comment_box flex w-full  gap-2 pt-4">
                <div className="comment_img w-8 h-8 shrink-0">
                  <img
                    className="w-full rounded-full h-full object-cover object-top"
                    src={user?.image}
                    alt=""
                  />
                </div>
                <div className="comment_input w-full ">
                  <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    type="text"
                    placeholder="Add a comment..."
                    className=" outline-none text-sm p-2 w-full border-b border-b-gray-600"
                  />
                  <div className="flex gap-2 w-full justify-end p-2">
                    <button className="hover:bg-[#21212161] cursor-pointer text-[#fff] p-2 rounded-2xl px-3 text-xs ">
                      cancel
                    </button>
                    <button
                      onClick={() => handleComments(videoData?._id)}
                      className="hover:bg-[#212121ab] bg-[#21212161] cursor-pointer text-[#fff] p-2 rounded-2xl px-3 text-xs "
                    >
                      comment
                    </button>
                  </div>
                </div>
              </div>
              <div className="comment_wrap">
                {commentData?.length > 0
                  ? commentData?.map((item) => {
                      return (
                        <>
                          <div className="comment_box_reply flex gap-2 mt-3 ">
                            <div className="comment_img w-7 h-7 shrink-0">
                              <img
                                className="w-full rounded-full h-full object-cover object-top"
                                src={item?.author?.image}
                                alt=""
                              />
                            </div>
                            <div className=" flex gap-1 items-center">
                              <h4 className="text-xs">
                                {" "}
                                @{item?.author?.username}
                              </h4>
                              <small className="text-[9px] text-[#858585]">
                                {/* {t(item?.createdAt)} */}
                                {timeAgo(item?.createdAt)}
                              </small>
                            </div>
                          </div>
                          <div className="comment p-2 ">
                            <p className="text-xs pl-7">{item?.message}</p>
                          </div>
                          <div className="btns flex items-center gap-2  pl-9">
                            <div className="btn_wrap text-xs flex items-center gap-2">
                              <button>
                                {" "}
                                <BiLike className="w-3 h-3" />
                              </button>{" "}
                              1
                            </div>
                            <div className="btn_wrap text-xs flex items-center gap-2">
                              <button>
                                {" "}
                                <BiDislike className="w-3 h-3" />
                              </button>{" "}
                              2
                            </div>
                            <div
                              onClick={() => setSelectedCommentId(item?._id)}
                              className="btn_wrap text-xs cursor-pointer flex items-center gap-2 hover:bg-[#21212161] rounded-2xl p-1"
                            >
                              <button>
                                {" "}
                                <RiShareForwardLine className="w-3 h-3" />
                              </button>{" "}
                              Reply
                            </div>
                          </div>
                          {selectedCommentId === item?._id ? (
                            <div className="reply w-[94%] ml-auto">
                              <div className="comment_box flex w-full  gap-3 pt-4">
                                <div className="comment_img w-7 h-7 shrink-0">
                                  <img
                                    className="w-full rounded-full h-full object-cover object-top"
                                    src={user?.image}
                                    alt={user?.image}
                                  />
                                </div>
                                <div className="comment_input w-full ">
                                  <input
                                    type="text"
                                    onChange={(e) =>
                                      setNewReply(e.target.value)
                                    }
                                    value={newReply}
                                    placeholder="Add a reply..."
                                    className=" outline-none text-xs p-2 w-full border-b border-b-gray-800"
                                  />
                                  <div className="flex gap-2 w-full justify-end p-2">
                                    <button
                                      onClick={() => setSelectedCommentId("")}
                                      className="hover:bg-[#21212161] cursor-pointer text-[#fff] p-2 rounded-2xl px-3 text-xs "
                                    >
                                      cancel
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleReply(videoData?._id, item?._id)
                                      }
                                      className="hover:bg-[#212121ab] bg-[#21212161] cursor-pointer text-[#fff] p-2 rounded-2xl px-3 text-xs "
                                    >
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {item?.replies?.map((reply) => {
                            console.log("==================")
                            console.log(reply) 
                            console.log("==================")
                            return (
                              <div className="reply_more pl-9 mt-4">
                                <div className="comment_box_reply flex gap-2 ">
                                  <div className="comment_img w-7 h-7 shrink-0">
                                    <img
                                      className="w-full rounded-full h-full object-cover object-top"
                                      src={reply?.author?.image}
                                      alt=""
                                    />
                                  </div>
                                  <div className=" flex gap-1 items-center">
                                    <h4 className="text-xs"> @ {reply?.author?.username}</h4>
                                    <small className="text-[9px] text-[#858585]">
                                      {timeAgo(reply?.createdAt)}
                                    </small>
                                  </div>
                                </div>
                                <div className="comment p-2 ">
                                  <p className="text-xs pl-7">
                                    {reply?.message}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
        <div className="yt_player_content md:w-[40%]">
          <div className="yt_related_data w-full flex item-center gap-[2px] flex-col  ">
            <h4 className="p-4 pt-0 flex items-center gap-2">
              <SiYoutubeshorts className="fill-[#FF0033] w-6 h-8" /> Related
              Shorts
            </h4>
            <div className=" hide_scroll flex items-center pt-0 p-4 gap-3 w-full overflow-x-auto">
              {relatedshorts?.map((item, index) => {
                return (
                  <ChannelShortsCard
                    action={handleShortViews}
                    data={item}
                    key={index}
                    channel={item?.channel}
                  />
                );
              })}
            </div>
            <h4 className="p-4  flex items-center gap-2">
              {" "}
              <PiVideo className="fill-[#FF0033] w-6 h-8" /> Related Videos
            </h4>
            {relatedVideo?.map((item, index) => {
              return <RelatedVideoData data={item} action={handleVideoViews} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
