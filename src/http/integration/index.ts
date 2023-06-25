import { Integration } from 'store/integration/types';
import { apiCall } from '../index';

export const getIntegrations = (): Promise<Integration[]> => apiCall({ method: 'get', url: '/integration' });

export const getIntegration = (id: string): Promise<Integration> =>
  apiCall({ method: 'get', url: `/integration/${id}` });

export const authorize = (id: string): Promise<string> =>
  apiCall({ method: 'get', url: `/integration/${id}/authorize` });

export const uninstall = (id: string): Promise<void> =>
  apiCall({ method: 'delete', url: `/integration/${id}/uninstall` });

export const authCallback = (payload: string): Promise<void> =>
  apiCall({ method: 'post', url: `/integration/callback/${payload}` });
