import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getTenants as getTenantsApi,
  createTenant as createTenantApi,
  updateTenant as updateTenantApi,
  getTenant as getTenantApi,
} from 'http/tenant';
import { Tenant, UpdateTenantData } from './types';

const SET_ERROR = 'tenant/SET_ERROR';
const SET_SUCCESS = 'tenant/SET_SUCCESS';
const GET_TENANTS = 'tenant/GET_TENANTS';
const CREATE_TENANT = 'tenant/CREATE_TENANT';
const UPDATE_TENANT = 'tenant/UPDATE_TENANT';
const GET_TENANT = 'tenant/GET_TENANT';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const getTenants = createAsyncThunk<Tenant[]>(GET_TENANTS, async () => {
  const tenants = await getTenantsApi();
  return tenants;
});

export const createTenant = createAsyncThunk<Tenant, Partial<Tenant>>(CREATE_TENANT, async (data) => {
  const tenant = await createTenantApi(data);
  return tenant;
});

export const updateTenant = createAsyncThunk<void, UpdateTenantData>(UPDATE_TENANT, async ({ tenantId, data }) => {
  await updateTenantApi(tenantId, data);
});

export const getTenant = createAsyncThunk<Tenant, number>(GET_TENANT, async (id) => {
  const tenant = await getTenantApi(id);
  return tenant;
});
