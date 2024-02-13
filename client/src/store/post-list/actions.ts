import { createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "../../api";

export const fetchPosts = createAsyncThunk(
  "postList/fetchPosts",
  async (_, thunkAPI) => {
    try {
      return await PostService.getAll();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
