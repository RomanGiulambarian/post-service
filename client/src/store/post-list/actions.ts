import { createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "../../api";

export const fetchPosts = createAsyncThunk("postList/fetchPosts", async () => {
  try {
    return await PostService.getAll();
  } catch (e) {
    console.log(e);
  }
});
