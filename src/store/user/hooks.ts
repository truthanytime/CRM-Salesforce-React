import { shallowEqual, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { useActionCreator } from 'hooks';
import { RootState } from 'store/types';
import { User, UserReturnHook } from './types';
import { setError, setSuccess, getCurrentUser, getUsers, updateUserAction } from './actions';

export const userSelector = createSelector(
  (state: RootState) => state.user.users,
  (state: RootState, userId?: number) => userId,
  (users: User[], userId?: number) => users.find((u) => u.userId === userId),
);

export const useUser = (): UserReturnHook => {
  const userState = useSelector((state: RootState) => state.user, shallowEqual);

  return {
    ...userState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    getCurrentUser: useActionCreator(getCurrentUser),
    getUsers: useActionCreator(getUsers),
    updateUser: useActionCreator(updateUserAction),
  };
};
