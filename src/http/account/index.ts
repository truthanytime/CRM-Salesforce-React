import { Account } from 'store/account/types';
import { apiCall } from '../index';

export const createAccount = (data: Partial<Account>): Promise<Account> =>
  apiCall({ method: 'post', url: '/account', data });

export const getAccounts = (): Promise<Account[]> => apiCall({ method: 'get', url: '/account' });

export const updateAccount = (id: number, data: Partial<Account>): Promise<Account> =>
  apiCall({ method: 'put', url: `/account/${id}`, data });

export const deleteAccount = (id: number): Promise<null> => apiCall({ method: 'delete', url: `/account/${id}` });

export const getAccount = (id: number): Promise<Account> => apiCall({ method: 'get', url: `/account/${id}` });
