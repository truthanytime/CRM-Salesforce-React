import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { createGenericSlice, GenericState } from '../../firebase-redux/generic';
import { setError, setLoading, setSuccess } from './actions';
import { APPLICATION_STATUS, APPLICATION_STATUS_LABEL, IntegrationSession, mapStatusLabel } from './types';

export const initialState: GenericState<IntegrationSession> = {
  error: false,
  loading: true,
  success: false,
  data: <IntegrationSession>{
    applicationStatus: APPLICATION_STATUS.DEFAULT,
    statusLabel: APPLICATION_STATUS_LABEL.DEFAULT,
  },
};

const slice = createGenericSlice({
  name: 'integration-apps',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<GenericState<IntegrationSession>>): void => {
    builder.addCase(setLoading, (state, { payload }) => {
      state.loading = true;
      state.data.statusLabel = typeof payload === 'string' ? payload : APPLICATION_STATUS_LABEL.DEFAULT;
      state.error = false;
      state.success = false;
    });
    builder.addCase(setError, (state, { payload }) => {
      state.data.applicationStatus = APPLICATION_STATUS.NOT_INSTALLED;
      state.data.statusLabel = mapStatusLabel(APPLICATION_STATUS_LABEL.NOT_INSTALLED);
      state.error = true;
      state.loading = false;
      state.success = false;
    });
    builder.addCase(setSuccess, (state, { payload }) => {
      state.data.applicationStatus = payload.applicationStatus;
      state.data.statusLabel = payload.statusLabel;
      state.success = true;
      state.loading = false;
      state.error = false;
    });
  },
});
export const actions = slice.actions;
export default slice.reducer;
