import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  createEmail as createEmailApi,
  getEmails as getEmailsApi,
  getEmail as getEmailApi,
  deleteEmail as deleteEmailApi,
  getGmailAccount as getGmailAccountApi,
} from 'http/email';
import { Email } from './types';

const SET_ERROR = 'email/SET_ERROR';
const SET_SUCCESS = 'email/SET_SUCCESS';
const CREATE_EMAIL = 'email/CREATE_EMAIL';
const GET_EMAILS = 'email/GET_EMAILS';
const GET_EMAIL = 'email/GET_EMAIL';
const DELETE_EMAIL = 'email/DELETE_EMAIL';
const CONNECTED_ACCOUNT = 'email/CONNECTED_ACCOUNT';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const createEmail = createAsyncThunk<Email, Partial<Email>>(CREATE_EMAIL, async (data) => {
  const emails = await createEmailApi(data);
  return emails;
});

export const getEmails = createAsyncThunk<Email[]>(GET_EMAILS, async () => {
  const emails = await getEmailsApi();
  return emails;
});

export const getEmail = createAsyncThunk<Email, number>(GET_EMAIL, async (id) => {
  const email = await getEmailApi(id);
  return email;
});

export const deleteEmail = createAsyncThunk<void, number>(DELETE_EMAIL, async (id) => {
  await deleteEmailApi(id);
});

export const getConnectedAccount = createAsyncThunk<string, void>(CONNECTED_ACCOUNT, async () => {
  return await getGmailAccountApi();
});
