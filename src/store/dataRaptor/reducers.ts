import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import {
  addFilter,
  initStates,
  removeFilter,
  setError,
  setFields,
  setFilter,
  setPageIndex,
  setPageSize,
  setRowsPerPage,
  setSuccess,
  setTotalDataCount,
  updateConfidenceScoreSectionState,
  updatePageStatus,
  setSelectedTable,
  setSelectedMigration,
} from './actions';
import { DataRaptorState, FilterIndex } from './types';

export const initialState: DataRaptorState = {
  error: false,
  success: false,
  confidenceScoreSectionState: false,
  pageStatus: '',
  filters: [],
  fields: [],
  values: [],
  selectedTable: '',
  totalDataCount: 0,
  pageIndex: 0,
  pageSize: 25,
  rowsPerPage: [25, 50, 100],
  selectedMigration: '',
};

const dataraptorReducer = createSlice({
  name: 'dataraptor',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DataRaptorState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });
    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });
    builder.addCase(setSelectedMigration, (state, { payload }) => {
      state.selectedMigration = payload;
    });
    builder.addCase(setSelectedTable, (state, { payload }) => {
      state.selectedTable = payload;
    });
    builder.addCase(updateConfidenceScoreSectionState, (state) => {
      state.confidenceScoreSectionState = !state.confidenceScoreSectionState;
    });
    builder.addCase(updatePageStatus, (state, { payload }) => {
      if (state.pageStatus.trim() !== payload.trim()) {
        state.pageStatus = payload;
      }
    });
    builder.addCase(addFilter, (state, { payload }) => {
      let isExist = false;
      state.filters.forEach((filter: FilterIndex) => {
        if (filter.name === payload.name && filter.type === payload.type) {
          isExist = true;
        }
      });
      if (!isExist) state.filters.push(payload);
    });
    builder.addCase(setFilter, (state, { payload }) => {
      state.filters.forEach((filter: FilterIndex, index: number) => {
        if (filter.name === payload.name) {
          state.filters[index].operator = payload.operator;
          state.filters[index].compare = payload.compare;
        }
      });
    });
    builder.addCase(removeFilter, (state, { payload }) => {
      const newFilters: FilterIndex[] = [];
      state.filters.forEach((filter: FilterIndex) => {
        if (filter.name !== payload.name || filter.type !== payload.type) {
          newFilters.push(filter);
        }
      });
      state.filters = newFilters;
    });
    builder.addCase(setPageIndex, (state, { payload }) => {
      state.pageIndex = payload;
    });
    builder.addCase(setPageSize, (state, { payload }) => {
      state.pageSize = payload;
    });
    builder.addCase(setTotalDataCount, (state, { payload }) => {
      state.totalDataCount = payload;
    });
    builder.addCase(setRowsPerPage, (state, { payload }) => {
      state.rowsPerPage = payload;
    });
    builder.addCase(setFields, (state, { payload }) => {
      state.fields = payload;
    });
    builder.addCase(initStates, (state) => {
      state.error = false;
      state.success = false;
      state.confidenceScoreSectionState = false;
      state.pageStatus = '';
      state.filters = [];
      state.fields = [];
      state.values = [];
      state.totalDataCount = 0;
      state.pageIndex = 0;
      state.pageSize = 25;
      state.rowsPerPage = [25, 50, 100];
    });
  },
});

export default dataraptorReducer.reducer;
