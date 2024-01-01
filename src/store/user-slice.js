"use client";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    role: "",
  },
  reducers: {
    addToEmail(state, action) {
      state.email = action.payload;
    },
    addToRole(state, action) {
      state.role = action.payload;
    },
    removeEmail(state, action) {
      state.email = "";
    },
  },
});

export const userAction = userSlice.actions;
