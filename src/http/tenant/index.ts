import { Tenant } from 'store/tenant/types';
import { apiCall } from '../index';

export const getTenants = (): Promise<Tenant[]> =>
  apiCall({
    method: 'get',
    url: '/tenant',
  });

export const createTenant = (data: Partial<Tenant>): Promise<Tenant> =>
  apiCall({
    method: 'post',
    url: '/tenant',
    data,
  });

export const updateTenant = (id: number, data: Partial<Tenant>): Promise<null> =>
  apiCall({
    method: 'put',
    url: `/tenant/${id}`,
    data,
  });

export const deleteTenant = (id: number): Promise<null> => apiCall({ method: 'delete', url: `/tenant/${id}` });

export const getTenant = (id: number): Promise<Tenant> => apiCall({ method: 'get', url: `/tenant/${id}` });
