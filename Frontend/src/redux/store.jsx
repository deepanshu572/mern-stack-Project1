import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { toggleSlice } from "./toggleSlice";
import { contentSlice } from "./contentSlice";
import { channelSlice } from "./channelsSlice";
export const store = configureStore({
  reducer: {
    usersData: userSlice.reducer,
    toggle: toggleSlice.reducer,
    content: contentSlice.reducer,
    channels: channelSlice.reducer,
  },
});
