import { Store } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import http from './index';
import { RootState } from 'store/types';
import { clearAuthSession } from 'store/auth/utils';
import { logout, setError } from 'store/auth/actions';

export default {
  setup: (store: Store<RootState>): void => {
    const addAuthorizationToken = async (config: AxiosRequestConfig) => {
      const {
        auth: { accessToken },
      } = store.getState();

      if (accessToken) {
        const expirationTime = jwtDecode<JwtPayload>(accessToken).exp as number;

        if (expirationTime < Date.now() / 1000) {
          clearAuthSession();
          store.dispatch(logout());
          store.dispatch(setError('Session has expired, please login again!'));
          throw new axios.CancelToken((cancel) => cancel('Session has expired, please login again!'));
        }

        config.headers = {
          ...(config.headers ?? {}),
          Authorization: `Bearer ${accessToken}`,
        };
      }

      return config;
    };

    http.interceptors.request.use(addAuthorizationToken);
  },
};
