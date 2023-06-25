import { DealStage } from 'store/dealStage/types';
import { apiCall } from '../index';

export const createDealStage = (data: Partial<DealStage>): Promise<DealStage> =>
  apiCall({ method: 'post', url: '/dealStage', data });

export const getDealStages = (): Promise<DealStage[]> => apiCall({ method: 'get', url: '/dealStage' });

export const updateDealStage = (id: number, data: Partial<DealStage>): Promise<DealStage> =>
  apiCall({ method: 'put', url: `/dealStage/${id}`, data });

export const deleteDealStage = (id: number): Promise<null> => apiCall({ method: 'delete', url: `/dealStage/${id}` });

export const getDealStage = (id: number): Promise<DealStage> => apiCall({ method: 'get', url: `/dealStage/${id}` });
