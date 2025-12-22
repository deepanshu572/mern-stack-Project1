import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDataFromApi } from "../../Utils/api";


const VideoCard = ({ video , videoIdData }) => {

  const [channelData, setChannelData] = useState();
  function formatNumber(num) {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  }
  const svg = (
    <svg width="13px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM17.4571 9.45711L16.0429 8.04289L11 13.0858L8.20711 10.2929L6.79289 11.7071L11 15.9142L17.4571 9.45711Z"></path></svg>
  )

  useEffect(() => {
    ChannelDataFetch();
  }, [video])
  

  const ChannelDataFetch = (()=>{

    if(video.channelId){
      fetchDataFromApi(`channels?part=snippet&id=${video.channelId}`).then((res) => {
        setChannelData(res.items[0].snippet);
      });
  
  
    }
  });




  return (
    <>
      <Link to={`/videos/${videoIdData}`} className="card p-1 w-[25rem]   sm:w-[31vw] lg:w-[15rem]  ">
        <div className="card_video w-full h-[14rem] sm:w-full sm:h-[8rem] bg-white overflow-hidden self-center rounded-[10px]">
          {video?.thumbnails?.high?.url ? (
            <img
              src={video.thumbnails.high.url}
              alt="Thumbnail"
              className="w-full h-full object-cover"
            />
          ) : (
            ''
            // <img src="https://avatar.iran.liara.run/public/girl" alt="" />

          )}
        </div>
        <div className="flex gap-3 w-full sm:pt-[14px] h-[85px] sm:h-auto px-[12px] py-[13px] sm:p-2 ">
          <div className="left flex-shrink-0">
          {channelData ? (
            <img
            className="w-[35px] h-[35px] rounded-full"
            src={channelData?.thumbnails?.high?.url}
            alt=""
          />
          ) : (
               <img className="w-[35px] h-[35px] rounded-full" src="https://avatar.iran.liara.run/public/girl" alt="" />

          )}
            
          </div>
          <div className="right sm:w-[85%] ">
            <div className="card_heading text-[13px] sm:text-[11px] font-[500]">{video?.title}</div>
            <div className="card_desc text-[#727272] text-[10px]">
              {video?.description}
            </div>
          
          </div>
        </div>
      </Link>
    </>
  );
};

export default VideoCard;
