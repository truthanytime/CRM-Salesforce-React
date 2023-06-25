import { apiCall } from '../index';

export interface ContactStage {
  contactStageId: number;
  contactStageName: string;
  description: string;
}
export const createContactStage = (data: Partial<ContactStage>): Promise<ContactStage> =>
  apiCall({ method: 'post', url: '/contactStage', data });

export const getContactStages = (): Promise<ContactStage[]> => apiCall({ method: 'get', url: '/contactStage' });

export const updateContactStage = (id: number, data: Partial<ContactStage>): Promise<ContactStage> =>
  apiCall({ method: 'put', url: `/contactStage/${id}`, data });

export const deleteContactStage = (id: number): Promise<null> =>
  apiCall({ method: 'delete', url: `/contactStage/${id}` });

export const getContactStage = (id: number): Promise<ContactStage> =>
  apiCall({ method: 'get', url: `/contactStage/${id}` });
