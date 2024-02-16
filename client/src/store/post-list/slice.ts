import { createSlice } from "@reduxjs/toolkit";
import { PostListInitalState } from "./interface";
import { createPost, fetchPosts, updatePost } from "./actions";
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
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, title, description, media, updatedAt } = action.payload;
        const existingPost = state.posts.find((post) => post.id === id);

        if (existingPost) {
          existingPost.title = title;
          existingPost.description = description;
          existingPost.updatedAt = updatedAt;
          existingPost.media = media;
        }
      })
      .addCase(updatePost.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default postListSlice.reducer;
