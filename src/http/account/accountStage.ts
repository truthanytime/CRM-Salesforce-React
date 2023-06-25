import { apiCall } from '../index';

export interface AccountStage {
  accountStageId: number;
  accountStageName: string;
  description: string;
}

export const createAccountStage = (data: Partial<AccountStage>): Promise<AccountStage> =>
  apiCall({ method: 'post', url: '/accountStage', data });

export const getAccountStages = (): Promise<AccountStage[]> => apiCall({ method: 'get', url: '/accountStage' });

export const updateAccountStage = (id: number, data: Partial<AccountStage>): Promise<AccountStage> =>
  apiCall({ method: 'put', url: `/accountStage/${id}`, data });

export const deleteAccountStage = (id: number): Promise<null> =>
  apiCall({ method: 'delete', url: `/accountStage/${id}` });

export const getAccountStage = (id: number): Promise<AccountStage> =>
  apiCall({ method: 'get', url: `/accountStage/${id}` });
