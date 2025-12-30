import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { getVideos } from "../redux/contentSlice.jsx";

export const getAllVideos = async (req, res) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const result = await axios.post(serverUrl + "/api/content/allVideos", {
          withCredentials: true,
        });
        console.log("videos data :", result.data.allVideos);
        dispatch(getVideos(result?.data?.allVideos));
      } catch (error) {
        console.log("Error fetching videos data:", error);
      }
    };
    fetchVideos();
  }, []);
};
