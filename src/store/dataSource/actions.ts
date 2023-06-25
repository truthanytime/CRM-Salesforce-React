import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getIntegratedDataSources as getIntegratedDataSourcesApi } from 'http/dataSource';
import { IntegratedDataSource } from './types';

const SET_ERROR = 'dataSource/SET_ERROR';
const SET_SUCCESS = 'dataSource/SET_SUCCESS';
const GET_INTEGRATED_DATA_SOURCES = 'dataSource/GET_INTEGRATED_DATA_SOURCES';
const SET_LOADING = 'dataSource/SET_LOADING';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const setLoading = createAction<string | boolean>(SET_LOADING);

export const getIntegratedDataSources = createAsyncThunk<IntegratedDataSource[]>(
  GET_INTEGRATED_DATA_SOURCES,
  async () => {
    return await getIntegratedDataSourcesApi();
  },
);
