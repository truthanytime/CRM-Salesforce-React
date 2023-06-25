import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getAccounts as getAccountsApi,
  getAccount as getAccountApi,
  updateAccount as updateAccountApi,
  deleteAccount as deleteAccountApi,
} from 'http/account';
import { Account, UpdateAccountData } from './types';

const SET_ERROR = 'account/SET_ERROR';
const SET_SUCCESS = 'account/SET_SUCCESS';
const GET_ACCOUNTS = 'account/GET_ACCOUNTS';
const GET_ACCOUNT = 'account/GET_ACCOUNT';
const UPDATE_ACCOUNT = 'account/UPDATE_ACCOUNT';
const DELETE_ACCOUNT = 'account/DELETE_ACCOUNT';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const getAccounts = createAsyncThunk<Account[]>(GET_ACCOUNTS, async () => {
  const accounts = await getAccountsApi();
  return accounts;
});

export const getAccount = createAsyncThunk<Account, number>(GET_ACCOUNT, async (id) => {
  const account = await getAccountApi(id);
  return account;
});

export const updateAccount = createAsyncThunk<Account, UpdateAccountData>(
  UPDATE_ACCOUNT,
  async ({ accountId, data }) => {
    const account = await updateAccountApi(accountId, data);
    return account;
  },
);

export const deleteAccount = createAsyncThunk<void, number>(DELETE_ACCOUNT, async (id) => {
  await deleteAccountApi(id);
});
