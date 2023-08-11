import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  currentUser: {},
  allUsers: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      console.log(payload);
      state.currentUser = payload?.currentUser;
      state.allUsers = payload?.allUsers;
    },
    setLogOut: (state) => {
      state.currentUser = {};
      state.allUsers = [];
    },
  },
});

export const { setUserInfo, setLogOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
