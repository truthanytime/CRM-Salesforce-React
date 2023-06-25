import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { createGenericSlice, GenericState } from '../../firebase-redux/generic';
import { setError, setLoading, setSuccess, getIntegratedDataSources } from './actions';
import { DataSourceState } from './types';

export const initialState: GenericState<DataSourceState> = {
  error: false,
  loading: true,
  success: false,
  data: {
    dataSources: [],
  },
};

const slice = createGenericSlice({
  name: 'data-source',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<GenericState<DataSourceState>>): void => {
    builder.addCase(setLoading, (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    });
    builder.addCase(setError, (state) => {
      state.error = true;
      state.loading = false;
      state.success = false;
    });
    builder.addCase(setSuccess, (state) => {
      state.success = true;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getIntegratedDataSources.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.data.dataSources = payload;
    });
  },
});
export const actions = slice.actions;
export default slice.reducer;
