import { createAction } from '@reduxjs/toolkit';
import { IntegrationSession } from './types';

const SET_ERROR = 'integration-status/SET_ERROR';
const SET_SUCCESS = 'integration-status/SET_SUCCESS';
const SET_LOADING = 'integration-status/SET_LOADING';

export const setSuccess = createAction<IntegrationSession>(SET_SUCCESS);
export const setError = createAction<string | boolean>(SET_ERROR);
export const setLoading = createAction<string | boolean>(SET_LOADING);
