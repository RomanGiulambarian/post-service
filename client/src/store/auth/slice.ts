import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./actions";
import { AuthInitalState } from "./interface";
import { services } from "../..";

const initialState: AuthInitalState = {
  accessToken: "",
  isLoading: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.accessToken = payload;
        localStorage.setItem("accessToken", payload);

        services.postService.setHeader("Authorization", payload);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;

        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          localStorage.removeItem("accessToken");
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        const accessToken = localStorage.getItem("acecssToken");

        if (accessToken) {
          localStorage.removeItem("accessToken");
        }
      });
  },
});

export default authSlice.reducer;
