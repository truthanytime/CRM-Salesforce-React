import { ContactInformation } from 'store/types';
import { CreateUserData, User } from 'store/user/types';
import { apiCall } from '../index';

export const getCurrentUser = (): Promise<User> => apiCall({ method: 'get', url: '/user/auth/current' });

export const updateUser = (id: number, data: Partial<User> | Partial<ContactInformation>) =>
  apiCall({ method: 'put', url: `/user/${id}`, data });

export const getUsers = (): Promise<User[]> => apiCall({ method: 'get', url: '/user' });

export const createUser = (data: CreateUserData): Promise<User> => apiCall({ method: 'post', url: '/user', data });

export const inactivateUser = (id: number): Promise<null> => apiCall({ method: 'put', url: `/user/${id}/inactivate` });

export const reactivateUser = (id: number): Promise<null> => apiCall({ method: 'put', url: `/user/${id}/reactivate` });

export const deleteUser = (id: number): Promise<null> => apiCall({ method: 'delete', url: `/user/${id}` });
