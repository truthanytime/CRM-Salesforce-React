import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Activity } from './types';
import {
  getActivities as getActivitiesApi,
  createActivity as createActivityApi,
  CreateActivityDto,
} from 'http/activity';

const SET_LOADING = 'activity/SET_LOADING';
const SET_ERROR = 'activity/SET_ERROR';
const SET_SUCCESS_READ = 'activity/SET_SUCCESS_READ';
const SET_SUCCESS_WRITE = 'activity/SET_SUCCESS_WRITE';
const GET_ACTIVITIES = 'activity/GET_ACTIVITIES';
const CREATE_ACTIVITY = 'activity/CREATE_ACTIVITIY';

export const setLoading = createAction<boolean>(SET_LOADING);
export const setError = createAction<boolean>(SET_ERROR);
export const setSuccessRead = createAction<boolean>(SET_SUCCESS_READ);
export const setSuccessWrite = createAction<boolean>(SET_SUCCESS_WRITE);

export const getActivities = createAsyncThunk<Activity[], number>(GET_ACTIVITIES, async (contactId: number) => {
  return await getActivitiesApi(contactId);
});

export const createActivity = createAsyncThunk<Activity, Partial<CreateActivityDto>>(CREATE_ACTIVITY, async (data) => {
  return await createActivityApi(data);
});
