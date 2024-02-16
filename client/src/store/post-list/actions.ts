import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostResBody } from "../../api/post-service/interface";
import { UpdateThunkArg } from "./interface";
import Service from "../../services";
import { services } from "../..";

export const fetchPosts = createAsyncThunk(
  "postList/fetchPosts",
  async (_, thunkAPI) => {
    try {
      return await services.postService.getAll();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const createPost = createAsyncThunk(
  "postList/createPost",
  async (postParams: PostResBody, thunkAPI) => {
    try {
      return await services.postService.create(postParams);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updatePost = createAsyncThunk(
  "postList/updatePost",
  async (updateParams: UpdateThunkArg, thunkAPI) => {
    try {
      return await services.postService.update(updateParams);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
