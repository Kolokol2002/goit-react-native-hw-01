import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  userInfo: null,
  posts: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setUserInfo: (state, { payload: { displayName, email, photoURL } }) => {
      state.userInfo = { name: displayName, email: email, avatar: photoURL };
    },
    setAllPosts: (state, { payload }) => {
      state.posts = payload.posts;
    },
    setLogOut: (state) => {
      state.userInfo = null;
      state.posts = null;
    },
  },
});

export const { setUserInfo, setAllPosts, setLogOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
