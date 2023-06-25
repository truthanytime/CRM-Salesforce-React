import { createAction, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';

import { getCurrentUser as getCurrentUserApi, getUsers as getUsersApi } from 'http/user/index';
import { UserType } from 'core/types';
import { AuthState } from 'store/auth/types';
import { UpdateUserData, User } from './types';
import { RootState } from '../types';
import { getTenant } from 'store/tenant/actions';

const SET_ERROR = 'user/SET_ERROR';
const SET_SUCCESS = 'user/SET_SUCCESS';
const GET_CURRENT_USER = 'user/GET_CURRENT_USER';
const GET_USERS = 'user/GET_USERS';
const UPDATE_USER = 'user/UPDATE_USER';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const getCurrentUser = createAsyncThunk<User | null, void, { state: { auth: AuthState } }>(
  GET_CURRENT_USER,
  async (_, { getState, dispatch }) => {
    const {
      auth: { role },
    } = getState();

    if (role === UserType.SUPER_AMIN) return null;

    const currentUser = await getCurrentUserApi();

    if (currentUser.tenantId) {
      dispatch(getTenant(currentUser.tenantId));
    }

    return currentUser;
  },
);

export const getUsers = createAsyncThunk<User[]>(GET_USERS, async () => {
  const users = await getUsersApi();
  return users;
});

export const updateUser = createAction<{ index: number; user: User }>(UPDATE_USER);

export const updateUserAction = (data: UpdateUserData) => (dispatch: Dispatch<any>, getState: () => RootState) => {
  const {
    user: { users },
  } = getState();

  const userIndex = users.findIndex((user) => user.userId === data.userId);

  if (userIndex < 0) return;

  const user = users[userIndex];
  const userUpdate = data.user ?? {};
  const profileUpdate = data.contactInfo ?? {};

  dispatch(
    updateUser({
      index: userIndex,
      user: { ...user, ...userUpdate, contactInfo: { ...user.contactInfo, ...profileUpdate } },
    }),
  );
};
