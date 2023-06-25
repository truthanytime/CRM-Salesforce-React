import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getIntegrations as getIntegrationsApi,
  getIntegration as getIntegrationApi,
  authorize as authorizeApi,
  authCallback as authCallbackApi,
  uninstall as uninstallApi,
} from 'http/integration';
import { Integration } from './types';

const SET_ERROR = 'integration/SET_ERROR';
const SET_SUCCESS = 'integration/SET_SUCCESS';
const GET_INTEGRATIONS = 'integration/GET_INTEGRATIONS';
const GET_INTEGRATION = 'integration/GET_INTEGRATION';
const SET_INTEGRATION_STATUS = 'integration/SET_INTEGRATION_STATUS';
const UNINSTALL = 'integration/UNINSTALL_INTEGRATION';
const AUTHORIZE = 'integration/AUTHORIZE';
const AUTH_CALLBACK = 'integration/AUTH_CALLBACK';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const getIntegrations = createAsyncThunk<Integration[]>(GET_INTEGRATIONS, async () => {
  return await getIntegrationsApi();
});

export const getIntegration = createAsyncThunk<Integration, string>(GET_INTEGRATION, async (id) => {
  return await getIntegrationApi(id);
});

export const setIntegrationStatus = createAsyncThunk<string, string>(SET_INTEGRATION_STATUS, async (newStatus) => {
  return Promise.resolve(newStatus);
});

export const authCallback = createAsyncThunk<void, string>(AUTH_CALLBACK, async (payload) => {
  return await authCallbackApi(payload);
});

export const authorize = createAsyncThunk<string, { id: string; onSuccess?: () => void; onError?: () => void }>(
  AUTHORIZE,
  async ({ id, onSuccess, onError }) => {
    try {
      const res = await authorizeApi(id);
      if (onSuccess) onSuccess();
      return res;
    } catch (err) {
      if (onError) onError();
      throw err;
    }
  },
);

export const uninstall = createAsyncThunk<void, { id: string; onSuccess?: () => void; onError?: () => void }>(
  UNINSTALL,
  async ({ id, onSuccess, onError }) => {
    try {
      await uninstallApi(id);
      if (onSuccess) onSuccess();
    } catch (err) {
      if (onError) onError();
      throw err;
    }
  },
);
