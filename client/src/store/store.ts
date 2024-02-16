import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import postList from "./post-list/slice";
import modal from "./modal/slice";
import postItem from "./post-item/slice";
import auth from "./auth/slice";

export const store = configureStore({
  reducer: {
    postList,
    postItem,
    modal,
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
