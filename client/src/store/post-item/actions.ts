import { createAsyncThunk } from "@reduxjs/toolkit";
import { services } from "../..";

export const deletePost = createAsyncThunk(
  "postItem/deletePost",
  async (id: string, thunkAPI) => {
    try {
      return await services.postService.delete(id);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
