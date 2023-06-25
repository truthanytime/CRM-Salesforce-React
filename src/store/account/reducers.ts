import { createSlice, ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';

import { setError, setSuccess, getAccounts, getAccount, deleteAccount, updateAccount } from './actions';
import { AccountState } from './types';

export const initialState: AccountState = {
  loading: false,
  error: false,
  success: false,
  accounts: [],
  account: null,
};

const accountReducer = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AccountState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(getAccounts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.accounts = payload;
    });

    builder.addCase(getAccount.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.account = payload;
    });

    builder.addCase(updateAccount.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.account = payload;
      state.success = 'Account updated successfully!';
    });

    builder.addCase(deleteAccount.fulfilled, (state) => {
      state.loading = false;
      state.success = 'Account deleted successfully!';
    });

    builder.addMatcher(
      isAnyOf(getAccounts.pending, updateAccount.pending, getAccount.pending, deleteAccount.pending),
      (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      },
    );

    builder.addMatcher(
      isAnyOf(getAccounts.rejected, updateAccount.rejected, getAccount.rejected, deleteAccount.rejected),
      (state, { error }) => {
        state.loading = false;
        state.error = error?.message ?? true;
        state.success = false;
      },
    );
  },
});

export default accountReducer.reducer;
