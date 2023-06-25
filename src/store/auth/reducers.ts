import { ActionReducerMapBuilder, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { AuthState } from './types';
import {
  setError,
  login,
  changePassword,
  setSuccess,
  logout,
  setSession,
  setAuthSession,
  setNewPassword,
  initPasswordReset,
  confirmPasswordReset,
} from './actions';
import { getAutSession } from './utils';

export const initialState: AuthState = {
  loading: false,
  error: false,
  success: false,
  accessToken: null,
  session: null,
  id: null,
  email: null,
  role: null,
  rememberMe: false,
};

const getInitialState = (): AuthState => {
  const initialAuthSession = getAutSession();
  return {
    ...initialState,
    ...(initialAuthSession ?? {}),
  };
};

const authStore = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(changePassword.fulfilled, (state) => {
      state.loading = false;
      state.success = 'Changed password successfully!';
    });

    builder.addCase(logout, () => getInitialState());

    builder.addCase(setSession, (state, { payload }) => {
      state.session = payload.session;
      state.rememberMe = payload.rememberMe;
      state.email = payload.email;
    });

    builder.addCase(setAuthSession, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.id = payload.id;
      state.email = payload.email;
      state.role = payload.role;
      state.rememberMe = payload.rememberMe;
      state.session = null;
    });

    builder.addCase(initPasswordReset.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });

    builder.addMatcher(isAnyOf(login.fulfilled, setNewPassword.fulfilled, confirmPasswordReset.fulfilled), (state) => {
      state.loading = false;
    });

    builder.addMatcher(
      isAnyOf(
        login.pending,
        changePassword.pending,
        setNewPassword.pending,
        initPasswordReset.pending,
        confirmPasswordReset.pending,
      ),
      (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      },
    );

    builder.addMatcher(
      isAnyOf(
        login.rejected,
        changePassword.rejected,
        setNewPassword.rejected,
        initPasswordReset.rejected,
        confirmPasswordReset.rejected,
      ),
      (state, { error }) => {
        state.loading = false;
        state.error = error?.message ?? true;
        state.success = false;
      },
    );
  },
});

export default authStore.reducer;
