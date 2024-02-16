import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthFields } from "../../components/login-form";
import { services } from "../..";

export const login = createAsyncThunk<string, AuthFields>(
  "auth/login",
  async ({ email, password }, thunkApi) => {
    try {
      const data = await services.authService.login(email, password);

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return {};
});
