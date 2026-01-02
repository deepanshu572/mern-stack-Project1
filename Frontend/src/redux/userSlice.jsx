import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  channelData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserData: (state, action) => {
      state.userData = action.payload;
    },
    getChannelData: (state, action) => {
      state.channelData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUserData, getChannelData } = userSlice.actions;

export default userSlice.reducer;
