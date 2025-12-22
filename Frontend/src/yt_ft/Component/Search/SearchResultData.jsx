import React, { useEffect, useState , useContext } from "react";
import { Link } from "react-router-dom";
import { fetchDataFromApi } from "../../Utils/api";
import { Context } from "../../context/ContextApi";

const SearchResultData = ({ video }) => {
  const [ChannelData, setChannelData] = useState();
  const {  toggle } = useContext(Context);

  const ChannelDataFetch = () => {
    fetchDataFromApi(
      `channels/?id=${video?.snippet?.channelId}&part=snippet,statistics&regionCode=IN&maxResults=20`
    ).then((res) => {
      console.log(res.items[0]);
      setChannelData(res.items[0] || null);
    });
  };
  useEffect(() => {
    ChannelDataFetch();
  }, [video]);

  return (
    <>
      <Link
        to={`/videos/${video?.id?.videoId}`}
        className={`card ${toggle ? "hover:bg-[#1a1a1a92] " : " hover:bg-[#f6f4f4dc]" }  w-[95%] sm:w-full m-auto sm:m-0 flex flex-col sm:flex-row `}
        href="#"
        data-discover="true"
      >
        <div className="card_video w-full h-[220px] sm:w-[350px] sm:h-[197px] flex-shrink-0 ">
          {video?.snippet?.thumbnails?.high?.url ? (
            <img
              src={video.snippet.thumbnails.high.url}
              alt="Thumbnail"
              className="w-full h-full object-cover rounded-[10px]"
            />
          ) : (
            <p>No thumbnail available</p>
          )}
        </div>
        <div className="flex items-center w-full sm:items-start sm:gap-3 sm:pt-[14px]">
          <div className="left flex-shrink-0 p-2 ">
            {ChannelData ? (
              <img
                className="w-[35px] h-[35px] rounded-full"
                src={ChannelData?.snippet?.thumbnails?.high?.url || null}
                alt=""
              />
            ) : (
              <p className="text-[#727272] text-[13px]">No </p>
            )}
          </div>
          <div className="right p-2">
            <div className="card_heading text-[14px] font-[500] sm:text-[14px]">
              {video?.snippet?.title}
            </div>
            <div className="card_desc text-[#727272] text-[10px] sm:text-[13px]">
              {video?.snippet?.description}
            </div>
            <div className="card_info flex gap-3 items-center text-[#727272] text-[13px]">
              {/* <p>{formattedViews} views</p> */}
              {/* <p className="flex items-center gap-1">
                <span className="text-sm">•</span>{video?.snippet?.publishedAt}
              </p> */}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SearchResultData;
