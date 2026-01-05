import React, { useEffect, useState , useContext } from "react";
import { Link } from "react-router-dom";
import { fetchDataFromApi } from "../../Utils/api";
import { Context } from "../../context/ContextApi";

const RelatedVideoData = ({item , channelData , index}) => {
    console.log(channelData);
    const [channelRelated, SetChannelRelated] = useState();
      const {  toggle } = useContext(Context);

      const FetchChanelData = () => {
        if (channelData) {
          fetchDataFromApi(
            `channels/?id=${channelData}&part=snippet,statistics&regionCode=IN&maxResults=20`
          ).then((res) => {
            SetChannelRelated(res?.items[0]);
          });
        } else {
          console.log("Channel not found");
        }
      };
      useEffect(() => {
        FetchChanelData();
      }, [channelData])
      
    
  return (
    <Link
      key={index}
      className={`card flex ${toggle ? "hover:bg-[#1a1a1a92] " : " hover:bg-[#f6f4f4dc]" } items-center gap-0 sm:gap-[14px] px-[0] sm:p-[2px] sm:px-4 py-[5px] flex-col sm:flex-row `}
      to={`/videos/${item?.id?.videoId}`}
      data-discover="true"
    >
      <div className="card_video w-[95%] h-[200px] sm:w-[169px] sm:h-[95px] rounded-[8px] flex-shrink-0 bg-white overflow-hidden self-center">
        {item ? (
          <img
            src={item?.snippet?.thumbnails?.high?.url}
            alt="Thumbnail"
            className="w-full h-full object-cover"
          />
        ) : (
                      <img src="https://avatar.iran.liara.run/public/girl" alt="" />

        )}
      </div>
      <div className="flex justify-start items-start w-full sm:w-auto gap-3 pt-[10px] px-[18px] pb-0 sm:px-[0] sm:pt-[14px]">
        <div className="left flex-shrink-0 sm:hidden"> 
          {/* <img className="w-[35px] h-[35px] rounded-full" src="https://yt3.ggpht.com/6oSvknFrtJUJmqQYy8gSXy_xGzZynm3zbG18OjtGoZO9-pS6EBwDP2xCUESotCgdrhMY8RmpQg=s800-c-k-c0x00ffffff-no-rj" alt=""/> */}
          {channelRelated ? (
            <img
              className="w-[35px] h-[35px] rounded-full"
              src={channelRelated?.snippet?.thumbnails?.high?.url}
              alt=""
            />
          ) : (
                        <img src="https://avatar.iran.liara.run/public/girl" alt="" />

          )}
          {}
         </div>
        <div className="right lg:w-[210px]">
          <div className="card_heading text-[13px] sm:text-[12px] font-[600]">
            {item?.snippet?.title}
          </div>
          <div className="wrap flex flex-col text-[#727272] text-[11px] mt-[5px] leading-[15px] ">
            <p className=" card_desc flex gap-3">{item?.snippet?.description}</p>
            {/* <div className="card_info flex gap-3 items-center text-[#727272] text-[13px]">
                          <p className="flex items-center gap-1">
                            <span className="text-sm">•</span>2023-12-28T00:41:41Z
                          </p>
                        </div> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelatedVideoData;
