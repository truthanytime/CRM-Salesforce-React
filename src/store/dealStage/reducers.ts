import { createSlice, ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';

import { setError, setSuccess, getDealStages, getDealStage, deleteDealStage, updateDealStage } from './actions';
import { DealStageState } from './types';

export const initialState: DealStageState = {
  loading: false,
  error: false,
  success: false,
  dealStages: [],
  dealStage: null,
};

const dealStageReducer = createSlice({
  name: 'dealStage',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DealStageState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(getDealStages.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.dealStages = payload;
    });

    builder.addCase(getDealStage.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.dealStage = payload;
    });

    builder.addCase(updateDealStage.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.dealStage = payload;
      state.success = 'DealStage updated successfully!';
    });

    builder.addCase(deleteDealStage.fulfilled, (state) => {
      state.loading = false;
      state.success = 'DealStage deleted successfully!';
    });

    builder.addMatcher(
      isAnyOf(getDealStages.pending, updateDealStage.pending, getDealStage.pending, deleteDealStage.pending),
      (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      },
    );

    builder.addMatcher(
      isAnyOf(getDealStages.rejected, updateDealStage.rejected, getDealStage.rejected, deleteDealStage.rejected),
      (state, { error }) => {
        state.loading = false;
        state.error = error?.message ?? true;
        state.success = false;
      },
    );
  },
});

export default dealStageReducer.reducer;
