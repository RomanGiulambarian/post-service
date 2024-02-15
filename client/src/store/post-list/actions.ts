import { createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "../../api";
import { PostResBody } from "../../api/interface";
import { UpdateThunkArg } from "./interface";

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

export const createPost = createAsyncThunk(
  "postList/createPost",
  async (postParams: PostResBody, thunkAPI) => {
    try {
      return await PostService.create(postParams);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updatePost = createAsyncThunk(
  "postList/updatePost",
  async (updateParams: UpdateThunkArg, thunkAPI) => {
    try {
      return await PostService.update(updateParams);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
