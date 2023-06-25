import { createSlice, ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';

import { setError, setSuccess, getDeals, getDeal, deleteDeal, updateDeal } from './actions';
import { DealState } from './types';

export const initialState: DealState = {
  loading: false,
  error: false,
  success: false,
  deals: [],
  deal: null,
};

const dealReducer = createSlice({
  name: 'deal',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DealState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(getDeals.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.deals = payload;
    });

    builder.addCase(getDeal.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.deal = payload;
    });

    builder.addCase(updateDeal.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.deal = payload;
      state.success = 'Deal updated successfully!';
    });

    builder.addCase(deleteDeal.fulfilled, (state) => {
      state.loading = false;
      state.success = 'Deal deleted successfully!';
    });

    builder.addMatcher(isAnyOf(getDeals.pending, updateDeal.pending, getDeal.pending, deleteDeal.pending), (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    });

    builder.addMatcher(
      isAnyOf(getDeals.rejected, updateDeal.rejected, getDeal.rejected, deleteDeal.rejected),
      (state, { error }) => {
        state.loading = false;
        state.error = error?.message ?? true;
        state.success = false;
      },
    );
  },
});

export default dealReducer.reducer;
