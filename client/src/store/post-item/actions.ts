import { createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "../../api";

export const deletePost = createAsyncThunk(
  "postItem/deletePost",
  async (id: string, thunkAPI) => {
    try {
      return await PostService.delete(id);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
