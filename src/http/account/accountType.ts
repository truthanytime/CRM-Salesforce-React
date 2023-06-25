import { apiCall } from '../index';

export interface AccountType {
  accountTypeId: number;
  accountTypeName: string;
  description: string;
}

export const createAccountType = (data: Partial<AccountType>): Promise<AccountType> =>
  apiCall({ method: 'post', url: '/accountType', data });

export const getAccountTypes = (): Promise<AccountType[]> => apiCall({ method: 'get', url: '/accountType' });

export const updateAccountType = (id: number, data: Partial<AccountType>): Promise<AccountType> =>
  apiCall({ method: 'put', url: `/accountType/${id}`, data });

export const deleteAccountType = (id: number): Promise<null> =>
  apiCall({ method: 'delete', url: `/accountType/${id}` });

export const getAccountType = (id: number): Promise<AccountType> =>
  apiCall({ method: 'get', url: `/accountType/${id}` });
