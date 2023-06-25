import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunc = (...args: any[]) => any;

const useActionCreator = <T extends AnyFunc>(action: T): ((...funcArgs: Parameters<T>) => ReturnType<T>) => {
  const dispatch = useDispatch<T>();

  const actionCall = useCallback(
    (...args: Parameters<T>): ReturnType<T> => {
      return dispatch(action(args[0]));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [action, dispatch],
  );

  return actionCall;
};

export default useActionCreator;
