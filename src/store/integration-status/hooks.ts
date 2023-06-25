import { useActionCreator } from 'hooks';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from 'store/types';
import { setError, setLoading, setSuccess } from './actions';
import { IntegrationReturnHook } from './types';

export const useIntegrationStatus = (): IntegrationReturnHook => {
  const integrationState = useSelector((state: RootState) => state.integrationStatus, shallowEqual);

  return {
    ...integrationState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    setLoading: useActionCreator(setLoading),
  };
};
