import { createSlice } from "@reduxjs/toolkit";
import { PostListInitalState } from "./interface";
import { fetchPosts } from "./actions";

const initialState: PostListInitalState = {
  posts: [],
  isLoading: false,
  error: false,
};

export const postListSlice = createSlice({
  name: "postList",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.posts = [];
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.posts = payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        state.posts = [];
      });
  },
});

export default postListSlice.reducer;
