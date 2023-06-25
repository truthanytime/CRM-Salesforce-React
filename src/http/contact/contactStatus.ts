import { apiCall } from '../index';

export interface ContactStatus {
  contactStatusId: number;
  contactStatusName: string;
  description: string;
}
export const createContactStatus = (data: Partial<ContactStatus>): Promise<ContactStatus> =>
  apiCall({ method: 'post', url: '/contactStatus', data });

export const getContactStatuss = (): Promise<ContactStatus[]> => apiCall({ method: 'get', url: '/contactStatus' });

export const updateContactStatus = (id: number, data: Partial<ContactStatus>): Promise<ContactStatus> =>
  apiCall({ method: 'put', url: `/contactStatus/${id}`, data });

export const deleteContactStatus = (id: number): Promise<null> =>
  apiCall({ method: 'delete', url: `/contactStatus/${id}` });

export const getContactStatus = (id: number): Promise<ContactStatus> =>
  apiCall({ method: 'get', url: `/contactStatus/${id}` });
