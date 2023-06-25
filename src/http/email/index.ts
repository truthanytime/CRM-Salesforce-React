import { Email } from 'store/email/types';
import { apiCall } from '../index';

export const createEmail = (data: Partial<Email>): Promise<Email> => apiCall({ method: 'post', url: '/email', data });

export const getEmails = (): Promise<Email[]> => apiCall({ method: 'get', url: '/email' });

export const deleteEmail = (id: number): Promise<null> => apiCall({ method: 'delete', url: `/email/${id}` });

export const getEmail = (id: number): Promise<Email> => apiCall({ method: 'get', url: `/email/${id}` });

export const getGmailAccount = (): Promise<string> => apiCall({ method: 'get', url: `/email/gmail/account` });
