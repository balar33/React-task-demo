import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addNewUser: (state, action) => {
      state.users = action.payload;
    },
    saveLogedUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { addNewUser, saveLogedUser } = userSlice.actions;

export default userSlice.reducer;
