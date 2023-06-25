import { ActionReducerMapBuilder, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { TenantState } from './types';
import { setError, setSuccess, getTenants, createTenant, updateTenant, getTenant } from './actions';
import { logout } from '../auth/actions';

export const initialState: TenantState = {
  loading: false,
  error: false,
  success: false,
  tenants: [],
  tenant: null,
};

const tenantStore = createSlice({
  name: 'tenant',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<TenantState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(getTenants.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.tenants = payload;
    });

    builder.addCase(createTenant.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = `Tenant "${payload.tenantName}" created successfully!`;
    });

    builder.addCase(updateTenant.fulfilled, (state) => {
      state.loading = false;
      state.success = 'Tenant updated successfully!';
    });

    builder.addCase(logout, () => initialState);

    builder.addCase(getTenant.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.tenant = payload;
    });

    builder.addMatcher(
      isAnyOf(getTenants.pending, createTenant.pending, updateTenant.pending, getTenant.pending),
      (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      },
    );

    builder.addMatcher(
      isAnyOf(getTenants.rejected, createTenant.rejected, updateTenant.rejected, getTenant.rejected),
      (state, { error }) => {
        state.loading = false;
        state.error = error?.message ?? true;
        state.success = false;
      },
    );
  },
});

export default tenantStore.reducer;
