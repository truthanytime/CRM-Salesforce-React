import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getDealStages as getDealStagesApi,
  getDealStage as getDealStageApi,
  deleteDealStage as deleteDealStageApi,
  updateDealStage as updateDealStageApi,
} from 'http/dealStage';
import { DealStage, UpdateDealStageData } from './types';

const SET_ERROR = 'dealStage/SET_ERROR';
const SET_SUCCESS = 'dealStage/SET_SUCCESS';
const GET_DEALSTAGES = 'dealStage/GET_DEALSTAGES';
const GET_DEALSTAGE = 'dealStage/GET_DEALSTAGE';
const DELETE_DEALSTAGE = 'dealStage/DELETE_DEALSTAGE';
const UPDATE_DEALSTAGE = 'dealStage/UPDATE_DEALSTAGE';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const getDealStages = createAsyncThunk<DealStage[]>(GET_DEALSTAGES, async () => {
  const dealStages = await getDealStagesApi();
  return dealStages;
});

export const getDealStage = createAsyncThunk<DealStage, number>(GET_DEALSTAGE, async (id) => {
  const dealStage = await getDealStageApi(id);
  return dealStage;
});

export const updateDealStage = createAsyncThunk<DealStage, UpdateDealStageData>(
  UPDATE_DEALSTAGE,
  async ({ dealStageId, data }) => {
    const dealStage = await updateDealStageApi(dealStageId, data);
    return dealStage;
  },
);

export const deleteDealStage = createAsyncThunk<void, number>(DELETE_DEALSTAGE, async (id) => {
  await deleteDealStageApi(id);
});
