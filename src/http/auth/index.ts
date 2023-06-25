import { AuthResponse } from 'store/auth/types';
import { apiCall } from '../index';

export const login = (email: string, password: string): Promise<AuthResponse> =>
  apiCall({
    method: 'post',
    url: '/auth/login',
    data: { email, password },
  });

export const changePassword = (email: string, password: string): Promise<null> =>
  apiCall({
    method: 'post',
    url: '/auth/change-password',
    data: { email, password },
  });

export const logout = (id: string): Promise<null> => apiCall({ method: 'post', url: `/auth/logout/${id}` });

export const setNewPassword = (email: string, password: string, session: string): Promise<{ accessToken: string }> =>
  apiCall({ method: 'post', url: '/auth/set-password', data: { email, password, session } });

export const initPasswordReset = (email: string): Promise<null> =>
  apiCall({ method: 'post', url: '/auth/password-reset/init', data: { email } });

export const confirmPasswordReset = (token: string, password: string): Promise<AuthResponse> =>
  apiCall({ method: 'post', url: '/auth/password-reset/confirm', data: { token, password } });
