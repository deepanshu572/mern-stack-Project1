import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: null,
  shorts: null,
  playlist: null,
  commmunity: null,
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    getVideos: (state, action) => {
      state.videos = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getVideos } = contentSlice.actions;

export default contentSlice.reducer;
