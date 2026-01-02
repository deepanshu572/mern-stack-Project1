import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: null,
  shorts: null,
  playlist: null,
  commmunity: null,
  channelDetail: null,
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    getVideos: (state, action) => {
      state.videos = action.payload;
    },
    getShorts: (state, action) => {
      state.shorts = action.payload;
    },
    getPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    getCommmunity: (state, action) => {
      state.commmunity = action.payload;
    },
    getChannelDetail: (state, action) => {
      state.channelDetail = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getVideos,
  getShorts,
  getPlaylist,
  getCommmunity,
  getChannelDetail,
} = contentSlice.actions;

export default contentSlice.reducer;
