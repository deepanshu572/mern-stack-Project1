import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { getChannelDetail } from "../redux/contentSlice";
import { useParams } from "react-router";

export const fetchChannelDetail = async (req, res) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    const ChannelDetailGet = async () => {
      try {
        const result = await axios.get(
          serverUrl + `/api/content/channelDetail/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log("Channel Detail : ", result?.data?.channelDetail);
        dispatch(getChannelDetail(result?.data?.channelDetail));
      } catch (error) {
        console.log(error);
      }
    };
    ChannelDetailGet();
  }, [id]);
};
