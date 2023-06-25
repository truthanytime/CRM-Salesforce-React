import { useActionCreator } from 'hooks';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from 'store/types';
import { setSocket } from './actions';
import { SocketReturnHook } from './types';

export const useSocket = (): SocketReturnHook => {
  const SocketState = useSelector((state: RootState) => state.socket, shallowEqual);

  return {
    ...SocketState,
    setSocket: useActionCreator(setSocket),
  };
};
