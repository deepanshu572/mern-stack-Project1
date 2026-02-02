import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SearchResultData from "../components/SearchResultData";
import SideNav from "../components/SideNav";

const SearchResult = () => {
  const videos = useSelector((state) => state.content.videos);

  const { query } = useParams();
  const [Query, setQuery] = useState('');
  const [searchData, setsearchData] = useState();

  useEffect(() => {
    if (videos || videos?.length > 0) {
      const data = videos.filter((item) =>
        item?.title?.toLowerCase().includes(query.toLowerCase()),
      );
      setsearchData(data)
    }
    setQuery(query);
  },[query]);
  console.log(Query);

  return (
    <>
    <div className="flex">
              <SideNav />
      <div className=" flex flex-col w-full sm:px-[12px] pt-[60px] sm:pt-[75px]  gap-2">
        {/* lg:w-[80%] lg:ml-auto pt-[60px] sm:pt-[70px] lg:pt-[61px]  */}

        {searchData?.length > 0 &&
          searchData?.map((val,index) => {
            return <SearchResultData key={index}  video={val}  />
          })}
      </div>
      </div>
    </>
  );
};

export default SearchResult;
