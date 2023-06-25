import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import {
  setError,
  setSuccess,
  setLoading,
  setMergeModalStatus,
  setPageStatus,
  setRowPageData,
  setMergedRow,
  setMergingRows,
} from './actions';

import { DuplicateDetectionState, DuplicateDetectionPageStatus } from './types';

export const initialState: DuplicateDetectionState = {
  error: false,
  loading: false,
  success: false,
  mergeModalStatus: false,
  pageStatus: DuplicateDetectionPageStatus.GROUPS,
  rowsPageData: [],
  mergedRow: {},
  mergingRows: [],
};

const duplicateDetectionReducer = createSlice({
  name: 'duplicateDetection',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DuplicateDetectionState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });
    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });
    builder.addCase(setLoading, (state, { payload }) => {
      state.loading = payload;
    });
    builder.addCase(setMergeModalStatus, (state, { payload }) => {
      state.mergeModalStatus = payload;
    });
    builder.addCase(setPageStatus, (state, { payload }) => {
      state.pageStatus = payload;
    });
    builder.addCase(setRowPageData, (state, { payload }) => {
      state.rowsPageData = [...payload];
    });
    builder.addCase(setMergedRow, (state, { payload }) => {
      state.mergedRow = { ...payload };
    });
    builder.addCase(setMergingRows, (state, { payload }) => {
      state.mergingRows = [...payload];
    });
  },
});

export default duplicateDetectionReducer.reducer;
