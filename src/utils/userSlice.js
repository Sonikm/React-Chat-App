import { createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    userId: null,
  },
  reducers: {},
});

export const { fetchCurrentUserData } = userSlice.actions;
export default userSlice.reducer;
