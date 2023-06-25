import { useActionCreator } from 'hooks';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from 'store/types';
import { setError, setLoading, setSuccess, getIntegratedDataSources } from './actions';
import { DataSourceReturnHook } from './types';

export const useDataSource = (): DataSourceReturnHook => {
  const DataSourceState = useSelector((state: RootState) => state.dataSource, shallowEqual);

  return {
    ...DataSourceState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    setLoading: useActionCreator(setLoading),
    getDataSources: useActionCreator(getIntegratedDataSources),
  };
};
