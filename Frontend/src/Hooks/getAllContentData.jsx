import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import {
  getVideos,
  getPlaylist,
  getShorts,
  getCommmunity,
} from "../redux/contentSlice.jsx";

export const getAllContentData = async (req, res) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const result = await axios.post(serverUrl + "/api/content/allVideos", {
          withCredentials: true,
        });
        // console.log("videos data :", result.data.allVideos);
        dispatch(getVideos(result?.data?.allVideos));
      } catch (error) {
        console.log("Error fetching videos data:", error);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const result = await axios.post(serverUrl + "/api/content/allShorts", {
          withCredentials: true,
        });
        // console.log("Shorts data :", result.data.allShorts);
        dispatch(getShorts(result?.data?.allShorts));
      } catch (error) {
        console.log("Error fetching Shorts data:", error);
      }
    };
    fetchShorts();
  }, []);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const result = await axios.post(
          serverUrl + "/api/content/allPlaylist",
          {
            withCredentials: true,
          }
        );
        // console.log("Playlist data :", result.data.allPlaylist);
        dispatch(getPlaylist(result?.data?.allPlaylist));
      } catch (error) {
        console.log("Error fetching Playlist data:", error);
      }
    };
    fetchPlaylist();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await axios.post(serverUrl + "/api/content/allPost", {
          withCredentials: true,
        });
        // console.log("Post data :", result.data.allPost);
        dispatch(getCommmunity(result?.data?.allPost));
      } catch (error) {
        console.log("Error fetching Post data:", error);
      }
    };
    fetchPost();
  }, []);
};
