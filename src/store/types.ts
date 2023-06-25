import { ThunkAction } from '@reduxjs/toolkit';

import rootReducer from './reducers';

type RootReducer = typeof rootReducer;

export type RootState = ReturnType<RootReducer>;

export type Actions = Parameters<RootReducer>[1];

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Actions>;

export interface ContactInformation {
  phoneNumber: string;
  mobileNumber?: string;
  email?: string;
  country: string;
  addressState: string;
  city: string;
  street: string;
  zip: string;
}

export const defaultContactInfo: ContactInformation = {
  phoneNumber: '',
  mobileNumber: '',
  email: '',
  country: '',
  addressState: '',
  city: '',
  street: '',
  zip: '',
};
