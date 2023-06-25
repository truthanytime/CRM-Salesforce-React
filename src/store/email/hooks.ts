import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { RootState } from 'store/types';
import { EmailReturnHook } from './types';
import { setError, setSuccess, createEmail, getEmails, getEmail, deleteEmail, getConnectedAccount } from './actions';

export const useEmail = (): EmailReturnHook => {
  const emailState = useSelector((state: RootState) => state.email, shallowEqual);

  return {
    ...emailState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    createEmail: useActionCreator(createEmail),
    getEmails: useActionCreator(getEmails),
    getEmail: useActionCreator(getEmail),
    deleteEmail: useActionCreator(deleteEmail),
    getConnectedAccount: useActionCreator(getConnectedAccount),
  };
};
