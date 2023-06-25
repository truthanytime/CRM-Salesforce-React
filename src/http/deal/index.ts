import { Deal } from 'store/deal/types';
import { apiCall } from '../index';

export const createDeal = (data: Partial<Deal>): Promise<Deal> => apiCall({ method: 'post', url: '/deal', data });

export const getDeals = (): Promise<Deal[]> => apiCall({ method: 'get', url: '/deal' });

export const updateDeal = (id: number, data: Partial<Deal>): Promise<Deal> =>
  apiCall({ method: 'put', url: `/deal/${id}`, data });

export const deleteDeal = (id: number): Promise<null> => apiCall({ method: 'delete', url: `/deal/${id}` });

export const getDeal = (id: number): Promise<Deal> => apiCall({ method: 'get', url: `/deal/${id}` });
