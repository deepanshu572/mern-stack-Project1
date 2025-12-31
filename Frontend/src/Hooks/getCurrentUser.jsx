import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { getUserData } from "../redux/userSlice";

export const getUser = async (req, res) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/users/user", {
          withCredentials: true,
        });
        console.log("Current User Data:", result);
        dispatch(getUserData(result?.data?.user));
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);
};
