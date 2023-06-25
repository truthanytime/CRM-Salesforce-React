import { IntegratedDataSource } from 'store/dataSource/types';
import { apiCall } from '../index';

export const getIntegratedDataSources = (): Promise<IntegratedDataSource[]> =>
  apiCall({
    method: 'get',
    url: '/datasource/available',
  });
