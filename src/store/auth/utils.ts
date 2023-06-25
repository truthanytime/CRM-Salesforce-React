import { AUTH_SESSION_KEY } from 'core/constants';
import { AuthSession } from './types';

export const setAuthSession = (data: AuthSession, rememberMe = false): void => {
  if (rememberMe) {
    localStorage?.setItem(AUTH_SESSION_KEY, JSON.stringify(data));
  } else {
    sessionStorage?.setItem(AUTH_SESSION_KEY, JSON.stringify(data));
  }
};

export const getAutSession = (): AuthSession | null => {
  try {
    const savedSession = sessionStorage?.getItem(AUTH_SESSION_KEY) || localStorage?.getItem(AUTH_SESSION_KEY);
    if (savedSession) {
      return JSON.parse(savedSession);
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const clearAuthSession = (): void => {
  localStorage?.removeItem(AUTH_SESSION_KEY);
  sessionStorage?.removeItem(AUTH_SESSION_KEY);
};
