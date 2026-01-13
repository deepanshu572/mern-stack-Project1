import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AllChannels: null,
  AllSubscription: null,
};

export const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    getAllChannels: (state, action) => {
      state.AllChannels = action.payload;
    },
    getAllSubscription: (state, action) => {
      state.AllSubscription = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllChannels, getAllSubscription } = channelSlice.actions;

export default channelSlice.reducer;
