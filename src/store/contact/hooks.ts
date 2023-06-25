import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { RootState } from 'store/types';
import { ContactReturnHook } from './types';
import { setError, setSuccess, getContacts, getContact, updateContact, deleteContact } from './actions';

export const useContact = (): ContactReturnHook => {
  const contactState = useSelector((state: RootState) => state.contact, shallowEqual);

  return {
    ...contactState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    getContacts: useActionCreator(getContacts),
    getContact: useActionCreator(getContact),
    updateContact: useActionCreator(updateContact),
    deleteContact: useActionCreator(deleteContact),
  };
};
