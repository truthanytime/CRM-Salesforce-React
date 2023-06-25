import { ActionReducerMapBuilder, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { createActivity, getActivities, setError, setLoading, setSuccessRead, setSuccessWrite } from './actions';
import { ActivityState } from './types';

export const initialState: ActivityState = {
  loading: false,
  error: false,
  successRead: false,
  successWrite: false,
  activities: [],
  activity: null,
};

const activityReducer = createSlice({
  name: 'activity',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ActivityState>): void => {
    builder.addCase(setLoading, (state, { payload }) => {
      state.loading = payload;
      if (payload) {
        state.activities = [];
      }
    });

    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccessRead, (state, { payload }) => {
      state.successRead = payload;
    });

    builder.addCase(setSuccessWrite, (state, { payload }) => {
      state.successWrite = payload;
    });

    builder.addMatcher(isAnyOf(getActivities.pending, createActivity.pending), (state) => {
      state.loading = true;
      state.activities = [];
      state.error = false;
      state.successRead = false;
      state.successWrite = false;
    });

    builder.addMatcher(isAnyOf(getActivities.rejected, createActivity.rejected), (state, { error }) => {
      state.statusMessage = error.message;
      state.error = true;
      state.loading = false;
      state.successRead = false;
      state.successWrite = false;
    });

    builder.addMatcher(isAnyOf(getActivities.fulfilled), (state, { payload }) => {
      if (payload instanceof Array) {
        state.activities = payload;
      } else {
        state.activity = payload;
      }
      state.successRead = true;
      state.loading = false;
    });

    builder.addMatcher(isAnyOf(createActivity.fulfilled), (state, { payload }) => {
      state.activity = payload;
      state.successWrite = true;
      state.loading = false;
    });
  },
});

export default activityReducer.reducer;
