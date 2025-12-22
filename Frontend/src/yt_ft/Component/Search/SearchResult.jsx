import React, { useContext, useEffect, useState } from 'react'
import { fetchDataFromApi } from "../../Utils/api";
import { useParams } from 'react-router-dom';
import { Context } from '../../context/ContextApi';
import SearchResultData from './SearchResultData';

const SearchResult = () => {
  const { SetLoading } = useContext(Context);

  const { serchQuery } = useParams();

  const [query, setQuery] = useState();

  useEffect(() => {
    SerchDataFetch();
   
  }, [serchQuery]);

    
  const SerchDataFetch = () => {
    SetLoading(true)
    fetchDataFromApi(`search/?part=snippet&type=video&q=${serchQuery}&regionCode=IN&maxResults=20`).then((res) => {
      // console.log(res);
      setQuery(res);
      SetLoading(false);
    })
  }
   const data = query?.items || null ;
   
  
   

  return (
    <>

<div className=" flex flex-col w-full sm:px-[12px] lg:w-[80%] lg:ml-auto pt-[60px] sm:pt-[70px]  gap-2">
{/* lg:w-[80%] lg:ml-auto pt-[60px] sm:pt-[70px] lg:pt-[61px]  */}

{data?.length > 0 && data.map((val) => {
  return <SearchResultData key={val?.id?.videoId} video={val}  />
})}
  
  </div>
    </>
  )
}

export default SearchResult