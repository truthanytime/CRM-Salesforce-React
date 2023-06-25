import { createSlice, ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';
import { APPLICATION_STATUS } from 'store/integration-status/types';

import {
  setError,
  setSuccess,
  getIntegrations,
  getIntegration,
  uninstall,
  setIntegrationStatus,
  authorize,
  authCallback,
} from './actions';
import { IntegrationState } from './types';

export const initialState: IntegrationState = {
  loading: false,
  error: false,
  success: false,
  integrations: [],
  integration: null,
  integrationStatus: 'not-installed',
  authorizeRedirectUrl: '',
};

const integrationReducer = createSlice({
  name: 'integration',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IntegrationState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(getIntegrations.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.integrations = payload;
    });

    builder.addCase(getIntegration.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.integration = payload;
      state.integrationStatus = payload.applicationStatus;
    });

    builder.addCase(setIntegrationStatus.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.integrationStatus = payload;
    });

    builder.addCase(authorize.pending, (state, { payload }) => {
      state.loading = true;
      state.success = false;
      state.authorizeRedirectUrl = '';
    });

    builder.addCase(authorize.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.authorizeRedirectUrl = payload;
    });

    builder.addCase(authorize.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error?.message ?? true;
      state.authorizeRedirectUrl = '';
    });

    builder.addCase(authCallback.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.integrationStatus = APPLICATION_STATUS.INSTALLED;
      state.authorizeRedirectUrl = '';
    });

    builder.addCase(authCallback.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.authorizeRedirectUrl = '';
    });

    builder.addCase(uninstall.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });

    builder.addMatcher(isAnyOf(getIntegrations.pending, getIntegration.pending, uninstall.pending), (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
      state.authorizeRedirectUrl = '';
    });

    builder.addMatcher(
      isAnyOf(getIntegrations.rejected, getIntegration.rejected, uninstall.rejected),
      (state, { error }) => {
        state.loading = false;
        state.error = error?.message ?? true;
        state.success = false;
      },
    );
  },
});

export default integrationReducer.reducer;
