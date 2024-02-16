import { createSlice } from "@reduxjs/toolkit";

type ModalSlice = { modalName: string | null };

const initialState: ModalSlice = {
  modalName: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open(state, { payload }) {
      state.modalName = payload;
    },

    close(state) {
      state.modalName = null;
    },
  },
});

export const { open, close } = modalSlice.actions;
export default modalSlice.reducer;
