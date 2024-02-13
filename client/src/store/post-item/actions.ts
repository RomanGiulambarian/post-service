import { createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "../../api";

export const deletePost = createAsyncThunk(
  "postItem/deletePost",
  async (params: string) => {
    try {
      return await PostService.delete(params);
    } catch (e) {
      console.log(e);
    }
  }
);
