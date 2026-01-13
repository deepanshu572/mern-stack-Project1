import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { getAllSubscription } from "../redux/channelsSlice";

export const getSubscribe = (req, res) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSubscribe = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/users/subscribeData", {
          withCredentials: true,
        });
        console.log("Current subscried Data:", result?.data?.subscriptions);
        dispatch(getAllSubscription(result?.data?.subscriptions));
      } catch (error) {
        console.log("Error fetching subscried data:", error);
      }
    };
    fetchSubscribe();
  }, []);
};
