import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const VideoCard = ({id ,image ,video , title , description}) => {

  return (
    <>
      <Link to={`/video/${id}`} className="card p-1 w-[25rem]   sm:w-[31vw] lg:w-[15rem]  ">
        <div className="card_video w-full h-[14rem] sm:w-full sm:h-[8rem] bg-white overflow-hidden self-center rounded-[10px]">
          
       <img className="w-full h-full object-cover" src={image} alt="" />

        </div>
        <div className="flex gap-3 w-full sm:pt-[14px] h-[85px] sm:h-auto px-[12px] py-[13px] sm:p-2 ">
          <div className="left flex-shrink-0">
         
               <img className="w-[35px] h-[35px] rounded-full" src="https://yt3.ggpht.com/ytc/AIdro_kD2EVax1FrVyRDkBXzK7H5PcE0b9osnB0gW2AAdFk0O8g=s800-c-k-c0x00ffffff-no-rj" alt="" />

         
            
          </div>
          <div className="right sm:w-[85%] ">
            <div className="card_heading text-[13px] sm:text-[11px] font-[500]">{title}</div>
            <div className="card_desc text-[#727272] text-[10px]">
             {description}
            </div>
          
          </div>
        </div>
      </Link>
    </>
  );
};

export default VideoCard;
