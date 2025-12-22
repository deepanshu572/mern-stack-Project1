import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../Utils/api";

const AllChannels = () => {
  const [AllChannel, setAllChannel] = useState([]);
  var data = JSON.parse(localStorage.getItem("subscriptions"));

  const FetchChanelData = () => {
    if (!data || data.length === 0) {
      console.log("No data");
      return;
    }

    data.forEach((channelId) => {
      if (channelId) {
        fetchDataFromApi(
          `channels/?id=${channelId}&part=snippet,statistics&regionCode=IN&maxResults=20`
        ).then((res) => {
          const channelData = res?.items?.[0];
          if (channelData) {
            setAllChannel((prev) => [
              ...prev,
              {
                ...channelData,
                channelId, // same as channelId: channelId
              },
            ]);
          }
        });
      } else {
        console.log("Channel not found");
      }
    });
  };

  useEffect(() => {
    FetchChanelData();
  }, []);

  console.log(AllChannel);

  return (
    <>
      <div className="all_channel lg:w-[81%] ml-auto pt-[3rem]">
        <div className="head">
          <h2>All subscriptions</h2>
        </div>
        <div>
          {/* <div>{AllChannel?.[0]?.id}</div> */}

          {AllChannel ? (
            AllChannel?.map((item, index) => {
              // console.log(item)
              return (
                <div key={index}>
                  <div>
                    <img src="" alt="" />
                  </div>
                </div>
              );
            })
          ) : (
            <span></span>
          )}
          {/* {AllChannel && AllChannel?.length > 0 ? (
          AllChannel?.map((item, index) => (
            <div key={index}>data {index}</div>
          ))
        ) : (
          <span>No subscriptions found</span>
        )} */}
        </div>
      </div>
    </>
  );
};

export default AllChannels;
