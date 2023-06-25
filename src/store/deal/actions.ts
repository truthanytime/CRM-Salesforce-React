import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getDeals as getDealsApi,
  getDeal as getDealApi,
  deleteDeal as deleteDealApi,
  updateDeal as updateDealApi,
} from 'http/deal';
import { Deal, UpdateDealData } from './types';

const SET_ERROR = 'deal/SET_ERROR';
const SET_SUCCESS = 'deal/SET_SUCCESS';
const GET_DEALS = 'deal/GET_DEALS';
const GET_DEAL = 'deal/GET_DEAL';
const DELETE_DEAL = 'deal/DELETE_DEAL';
const UPDATE_DEAL = 'deal/UPDATE_DEAL';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const getDeals = createAsyncThunk<Deal[]>(GET_DEALS, async () => {
  const deals = await getDealsApi();
  return deals;
});

export const getDeal = createAsyncThunk<Deal, number>(GET_DEAL, async (id) => {
  const deal = await getDealApi(id);
  return deal;
});

export const updateDeal = createAsyncThunk<Deal, UpdateDealData>(UPDATE_DEAL, async ({ dealId, data }) => {
  const deal = await updateDealApi(dealId, data);
  return deal;
});

export const deleteDeal = createAsyncThunk<void, number>(DELETE_DEAL, async (id) => {
  await deleteDealApi(id);
});
