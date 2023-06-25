import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import {
  setError,
  setSuccess,
  setLoading,
  createRule,
  getRulesByMigrationAndTable,
  setSelectedRuleId,
  deleteRuleById,
  updateRuleById,
} from './actions';
import { DataRaptorRuleState } from './types';

export const initialState: DataRaptorRuleState = {
  success: false,
  error: false,
  loading: false,
  deleteRuleByIdError: false,
  deleteRuleByIdSuccess: false,
  deleteRuleByIdLoading: false,
  updateRuleByIdError: false,
  updateRuleByIdSuccess: false,
  updateRuleByIdLoading: false,
  data: {},
};

const dataRaptorRuleReducer = createSlice({
  name: 'data-raptor-rule',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DataRaptorRuleState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(setLoading, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(setSelectedRuleId, (state, { payload }) => {
      state.data.selectedRuleId = payload;
    });

    builder.addCase(createRule.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    });

    builder.addCase(createRule.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error?.message ?? true;
      state.success = false;
    });

    builder.addCase(createRule.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.data.createdRule = payload;
    });

    builder.addCase(getRulesByMigrationAndTable.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    });

    builder.addCase(getRulesByMigrationAndTable.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error?.message ?? true;
      state.success = false;
    });

    builder.addCase(getRulesByMigrationAndTable.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.data.rulesByMigrationAndTable = payload.sort((a, b) => a.name.localeCompare(b.name));
    });

    builder.addCase(deleteRuleById.pending, (state) => {
      state.deleteRuleByIdLoading = true;
      state.deleteRuleByIdError = false;
      state.deleteRuleByIdSuccess = false;
    });

    builder.addCase(deleteRuleById.rejected, (state, { error }) => {
      state.deleteRuleByIdLoading = false;
      state.deleteRuleByIdError = error?.message ?? true;
      state.deleteRuleByIdSuccess = false;
    });

    builder.addCase(deleteRuleById.fulfilled, (state) => {
      state.deleteRuleByIdLoading = false;
      state.deleteRuleByIdError = false;
      state.deleteRuleByIdSuccess = true;
    });

    builder.addCase(updateRuleById.pending, (state) => {
      state.updateRuleByIdLoading = true;
      state.updateRuleByIdError = false;
      state.updateRuleByIdSuccess = false;
    });

    builder.addCase(updateRuleById.rejected, (state, { error }) => {
      state.updateRuleByIdLoading = false;
      state.updateRuleByIdError = error?.message ?? true;
      state.updateRuleByIdSuccess = false;
    });

    builder.addCase(updateRuleById.fulfilled, (state) => {
      state.updateRuleByIdLoading = false;
      state.updateRuleByIdError = false;
      state.updateRuleByIdSuccess = true;
    });
  },
});

export default dataRaptorRuleReducer.reducer;
