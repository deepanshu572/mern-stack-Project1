import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { getChannelData } from "../redux/userSlice";

export const getchannel =  (req, res) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/users/channel", {
          withCredentials: true,
        });
        // console.log("Current channel Data:", result);
        dispatch(getChannelData(result?.data?.channel));
      } catch (error) {
        console.log("Error fetching channel data:", error);
      }
    };
    fetchChannel();
  }, []);
};
