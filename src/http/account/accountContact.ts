import { Account } from 'store/account/types';
import { Contact } from 'store/contact/types';
import { apiCall } from '../index';

export interface AccountContact {
  accountContactId: number;
  accountId: number;
  contactId: number;
  isPrimary: boolean;
  startDate: Date;
  endDate?: Date;
  account?: Account;
  contact?: Contact;
}

export const createAccountContact = (data: Partial<AccountContact>): Promise<AccountContact> =>
  apiCall({ method: 'post', url: '/accountContact', data });

export const getAccountContacts = (): Promise<AccountContact[]> => apiCall({ method: 'get', url: '/accountContact' });

export const updateAccountContact = (id: number, data: Partial<AccountContact>): Promise<AccountContact> =>
  apiCall({ method: 'put', url: `/accountContact/${id}`, data });

export const deleteAccountContact = (id: number): Promise<null> =>
  apiCall({ method: 'delete', url: `/accountContact/${id}` });

export const getAccountContact = (id: number): Promise<AccountContact> =>
  apiCall({ method: 'get', url: `/accountContact/${id}` });

export const getContactsByAccountId = (id: number): Promise<AccountContact[]> =>
  apiCall({ method: 'get', url: `/accountContact/contacts/${id}` });

export const getAccountsByContactId = (id: number): Promise<AccountContact[]> =>
  apiCall({ method: 'get', url: `/accountContact/accounts/${id}` });
