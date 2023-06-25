import { createSlice, ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';

import { setError, setSuccess, getContacts, getContact, updateContact, deleteContact } from './actions';
import { ContactState } from './types';

export const initialState: ContactState = {
  loading: false,
  error: false,
  success: false,
  contacts: [],
  contact: null,
};

const contactReducer = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ContactState>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });

    builder.addCase(getContacts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.contacts = payload;
    });

    builder.addCase(getContacts.pending, (state) => {
      state.contact = null;
      state.loading = true;
      state.error = false;
      state.success = false;
    });

    builder.addCase(getContacts.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error?.message ?? true;
      state.success = false;
    });

    builder.addCase(getContact.pending, (state, { payload }) => {
      state.contact = null;
      state.loading = true;
    });

    builder.addCase(getContact.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.contact = payload;
    });

    builder.addCase(updateContact.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.contact = payload;
      state.success = 'Contact updated successfully!';
    });

    builder.addCase(deleteContact.fulfilled, (state) => {
      state.loading = false;
      state.success = 'Contact deleted successfully!';
    });

    builder.addMatcher(isAnyOf(updateContact.pending, deleteContact.pending), (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    });

    builder.addMatcher(
      isAnyOf(getContacts.rejected, updateContact.rejected, getContact.rejected, deleteContact.rejected),
      (state, { error }) => {
        state.loading = false;
        state.error = error?.message ?? true;
        state.success = false;
      },
    );
  },
});

export default contactReducer.reducer;
