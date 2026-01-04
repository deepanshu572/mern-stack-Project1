import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AllChannels: null,
};

export const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    getAllChannels: (state, action) => {
      state.AllChannels = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllChannels } = channelSlice.actions;

export default channelSlice.reducer;
