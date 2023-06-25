import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { TenantReturnHook } from './types';
import { RootState } from '../types';
import { setError, setSuccess, getTenants, createTenant, updateTenant, getTenant } from './actions';

export const useTenant = (): TenantReturnHook => {
  const tenantState = useSelector((state: RootState) => state.tenant, shallowEqual);

  return {
    ...tenantState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    getTenants: useActionCreator(getTenants),
    createTenant: useActionCreator(createTenant),
    updateTenant: useActionCreator(updateTenant),
    getTenant: useActionCreator(getTenant),
  };
};
