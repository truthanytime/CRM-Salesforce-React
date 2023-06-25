import { apiCall } from '../index';

export interface ContactSource {
  contactSourceId: number;
  contactSourceName: string;
  description: string;
}
export const createContactSource = (data: Partial<ContactSource>): Promise<ContactSource> =>
  apiCall({ method: 'post', url: '/contactSource', data });

export const getContactSources = (): Promise<ContactSource[]> => apiCall({ method: 'get', url: '/contactSource' });

export const updateContactSource = (id: number, data: Partial<ContactSource>): Promise<ContactSource> =>
  apiCall({ method: 'put', url: `/contactSource/${id}`, data });

export const deleteContactSource = (id: number): Promise<null> =>
  apiCall({ method: 'delete', url: `/contactSource/${id}` });

export const getContactSource = (id: number): Promise<ContactSource> =>
  apiCall({ method: 'get', url: `/contactSource/${id}` });
