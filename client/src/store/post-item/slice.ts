import { createSlice } from "@reduxjs/toolkit";
import { deletePost } from "./actions";
import { Post } from "../post-list/interface";

export interface PostItemInitalState extends Post {
  isLoading: boolean;
  error: boolean;
}

const initialState: PostItemInitalState = {
  userId: null,
  id: "",
  title: "",
  description: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
  media: [],
  isLoading: false,
  error: false,
};

export const postItemSlice = createSlice({
  name: "postItem",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePost.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default postItemSlice.reducer;
