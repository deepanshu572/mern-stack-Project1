import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import {fetchDataFromApi} from '../Utils/api'
export const Context = createContext();

export const AppContext = (props) =>{
    const [Loading , SetLoading] = useState(false);
    const [SearchResult , SetSearchResult] = useState();
    const [SelectCategories , SetSelectCategories] = useState("10");
    const [MobileMenu , SetMobileMenu] = useState(false);
    const [subscribeData , SetsubscribeData] = useState();
      const [Channel, SetChannel] = useState();
      const [RelatedChannel, SetRelatedChannel] = useState();
      const [toggle, SetToggle] = useState(true);
    
    useEffect(() => {
        FetchSelectedCategoryData()
    },[SelectCategories])

    const FetchSelectedCategoryData = ()=>{
        SetLoading(true);
        fetchDataFromApi(`videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${SelectCategories}`).then((contents)=>{
           console.log(contents);
        //    console.log(contents.items);
           SetSearchResult(contents);
           SetLoading(false);

        })
    }
    function subscribeFetcher(data) {
        
        localStorage.setItem("data", JSON.stringify(data)); 
      }

      
        function formatLikeCount(num) {
          if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
          } else if (num >= 1_000) {
            return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
          }
          return num.toString();
        }
      const FetchChanelData = (channelId) => {
        if (channelId) {
          fetchDataFromApi(
            `channels/?id=${channelId}&part=snippet,statistics&regionCode=IN&maxResults=20`
          ).then((res) => {
            SetChannel(res?.items[0]);
            SetRelatedChannel(res?.items[0])
          });
        } else {
          console.log("Channel not found");
        }
      };
        const MobileToggle = () => {
    SetMobileMenu(!MobileMenu);
  };

      const ToggleData = ()=>{
        SetToggle(!toggle)
       console.log(toggle);

      }
   

    return (
        <Context.Provider value={{Loading, SetLoading, MobileToggle, formatLikeCount, SearchResult, toggle, ToggleData , SetSearchResult, SelectCategories, SetSelectCategories, MobileMenu, SetMobileMenu ,subscribeFetcher , subscribeData ,SetsubscribeData , FetchChanelData , SetChannel ,Channel ,RelatedChannel }}>
            {props.children}
        </Context.Provider>
    )
    
}
