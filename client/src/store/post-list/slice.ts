import { createSlice } from "@reduxjs/toolkit";
import { PostListInitalState } from "./interface";
import { fetchPosts } from "./actions";
import { deletePost } from "../post-item/actions";

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
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default postListSlice.reducer;
