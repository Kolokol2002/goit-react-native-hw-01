import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  userInfo: null,
  posts: null,
  isLoading: false,
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
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { setUserInfo, setAllPosts, setLogOut, setIsLoading } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
