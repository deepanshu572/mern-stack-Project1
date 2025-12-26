import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.toggle = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar } = toggleSlice.actions;

export default toggleSlice.reducer;
