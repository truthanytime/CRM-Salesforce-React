import { useCallback, useMemo } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { useActionCreator } from 'hooks';
import { UserType } from 'core/types';
import { AuthReturnHook } from './types';
import { RootState } from '../types';
import {
  login,
  setError,
  changePassword,
  setSuccess,
  logout as logoutAction,
  setNewPassword,
  initPasswordReset,
  confirmPasswordReset,
} from './actions';
import { clearAuthSession } from './utils';

export const useAuth = (): AuthReturnHook => {
  const authState = useSelector((state: RootState) => state.auth, shallowEqual);
  const dispatch = useDispatch();

  const roles = useMemo(() => {
    const userRoles = { isSuperAdmin: false, isAdmin: false, isOwner: false, isBusinessUser: false };
    if (authState.role === UserType.SUPER_AMIN) userRoles.isSuperAdmin = true;
    else if (authState.role === UserType.ADMIN) userRoles.isAdmin = true;
    else if (authState.role === UserType.OWNER) userRoles.isOwner = true;
    else if (authState.role === UserType.USER) userRoles.isBusinessUser = true;
    return userRoles;
  }, [authState.role]);

  const logout = useCallback(() => {
    clearAuthSession();
    dispatch(logoutAction());
  }, [dispatch]);

  return {
    ...authState,
    ...roles,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    login: useActionCreator(login),
    changePassword: useActionCreator(changePassword),
    logout,
    setNewPassword: useActionCreator(setNewPassword),
    initPasswordReset: useActionCreator(initPasswordReset),
    confirmPasswordReset: useActionCreator(confirmPasswordReset),
  };
};
