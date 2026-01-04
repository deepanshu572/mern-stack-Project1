import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { getAllChannels } from "../redux/channelsSlice";
import { useDispatch } from "react-redux";

export const getAllChannel = async (req, res) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllChannel = async () => {
      try {
        const result = await axios.post(
          serverUrl + "/api/channel/Allchannels",
          {
            withCredentials: true,
          }
        );
        dispatch(getAllChannels(result?.data?.Allchannels));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllChannel();
  }, []);
};
