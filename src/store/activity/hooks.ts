import { useActionCreator } from 'hooks';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from 'store/types';
import { createActivity, getActivities, setError, setLoading, setSuccessRead, setSuccessWrite } from './actions';
import { ActivityReturnHook } from './types';

export const useActivity = (): ActivityReturnHook => {
  const activityState = useSelector((state: RootState) => state.activity, shallowEqual);

  return {
    ...activityState,
    setError: useActionCreator(setError),
    setSuccessRead: useActionCreator(setSuccessRead),
    setSuccessWrite: useActionCreator(setSuccessWrite),
    setLoading: useActionCreator(setLoading),
    getActivities: useActionCreator(getActivities),
    createActivity: useActionCreator(createActivity),
  };
};
