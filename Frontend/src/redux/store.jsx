import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './userSlice'
import { toggleSlice } from './toggleSlice'
export const store = configureStore({
      reducer:{
        usersData: userSlice.reducer,
        toggle: toggleSlice.reducer
      }
})