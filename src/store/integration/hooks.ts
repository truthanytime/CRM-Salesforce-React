import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { RootState } from 'store/types';
import { IntegrationReturnHook } from './types';
import {
  setError,
  setSuccess,
  getIntegrations,
  getIntegration,
  uninstall,
  setIntegrationStatus,
  authorize,
  authCallback,
} from './actions';

export const useIntegration = (): IntegrationReturnHook => {
  const integrationState = useSelector((state: RootState) => state.integration, shallowEqual);

  return {
    ...integrationState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    getIntegrations: useActionCreator(getIntegrations),
    getIntegration: useActionCreator(getIntegration),
    setIntegrationStatus: useActionCreator(setIntegrationStatus),
    authorize: useActionCreator(authorize),
    authCallback: useActionCreator(authCallback),
    uninstall: useActionCreator(uninstall),
  };
};
