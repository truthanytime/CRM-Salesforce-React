import { ActionReducerMapBuilder, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { setError, setSuccess, getCurrentUser, getUsers, updateUser } from './actions';
import { UserState } from './types';

export const initialState: UserState = {
  loading: false,
  error: false,
  success: false,
  user: null,
  users: [],
};

const userStore = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });

    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    });

    builder.addCase(updateUser, (state, { payload }) => {
      state.users[payload.index] = payload.user;
    });

    builder.addMatcher(isAnyOf(getCurrentUser.pending, getUsers.pending), (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    });

    builder.addMatcher(isAnyOf(getCurrentUser.rejected, getUsers.rejected), (state, { error }) => {
      state.loading = false;
      state.error = error?.message ?? true;
      state.success = false;
    });
  },
});

export default userStore.reducer;
