import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getContacts as getContactsApi,
  getContact as getContactApi,
  updateContact as updateContactApi,
  deleteContact as deleteContactApi,
} from 'http/contact';
import { Contact, UpdateContactData } from './types';

const SET_ERROR = 'contact/SET_ERROR';
const SET_SUCCESS = 'contact/SET_SUCCESS';
const GET_CONTACTS = 'contact/GET_CONTACTS';
const GET_CONTACT = 'contact/GET_CONTACT';
const UPDATE_CONTACT = 'contact/UPDATE_CONTACT';
const DELETE_CONTACT = 'contact/DELETE_CONTACT';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const getContacts = createAsyncThunk<Contact[]>(GET_CONTACTS, async () => {
  const contacts = await getContactsApi();
  return contacts;
});

export const getContact = createAsyncThunk<Contact, number>(GET_CONTACT, async (id) => {
  const contact = await getContactApi(id);
  return contact;
});

export const updateContact = createAsyncThunk<Contact, UpdateContactData>(
  UPDATE_CONTACT,
  async ({ contactId, data }) => {
    const contact = await updateContactApi(contactId, data);
    return contact;
  },
);

export const deleteContact = createAsyncThunk<void, number>(DELETE_CONTACT, async (id) => {
  await deleteContactApi(id);
});
