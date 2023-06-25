import { useIsMounted } from 'utils/dom';
import React, { useCallback } from 'react';

const LOADING = 'loading';
interface LoadingAction {
  type: typeof LOADING;
}

const DONE = 'done';
interface DoneAction {
  type: typeof DONE;
  data: any;
}

const ERROR = 'error';
interface ErrorAction {
  type: typeof ERROR;
  error: any;
}

const RESET = 'reset';
interface ResetAction {
  type: typeof RESET;
}

type Action = LoadingAction | DoneAction | ErrorAction | ResetAction;

interface State<T> {
  loading: boolean;
  data: T | null;
  error: any;
  wasSuccessful: boolean;
}

// Wrap in create function to pass generic type to state
const createReducer =
  <T>() =>
  (state: State<T>, action: Action): State<T> => {
    switch (action.type) {
      case LOADING: {
        return { loading: true, data: null, error: null, wasSuccessful: false };
      }
      case DONE: {
        return {
          loading: false,
          data: action.data,
          error: null,
          wasSuccessful: true,
        };
      }
      case ERROR: {
        return {
          loading: false,
          data: null,
          error: action.error,
          wasSuccessful: false,
        };
      }
      case RESET: {
        return { loading: false, data: null, error: null, wasSuccessful: false };
      }
    }
  };

export function useAsync<T>(asyncCallback: (...args: any[]) => Promise<T | null>) {
  const initialState: State<T> = {
    data: null,
    loading: true,
    error: null,
    wasSuccessful: false,
  };

  const [state, dispatch] = React.useReducer(createReducer<T>(), initialState);

  React.useEffect(() => {
    let mounted = true;
    dispatch({ type: LOADING });

    asyncCallback()
      .then((data) => mounted && dispatch({ type: DONE, data }))
      .catch((error) => mounted && dispatch({ type: ERROR, error }));

    return () => {
      mounted = false;
    };
  }, [asyncCallback]);

  return state;
}

/**
 * Similar to useAsync, but the request is not sent immediately.
 *
 * @param asyncCallback
 * @returns
 */
export function useDeferredAsync<T, K extends (...args: any[]) => Promise<T | null>>(asyncCallback: K) {
  const { current: mounted } = useIsMounted();
  const initialState: State<T> = {
    data: null,
    loading: false,
    error: null,
    wasSuccessful: false,
  };

  const [state, dispatch] = React.useReducer(createReducer<T>(), initialState);

  const send = useCallback(
    (...args: any[]) => {
      if (!mounted) {
        return;
      }

      dispatch({ type: LOADING });

      asyncCallback(...args)
        .then((data) => mounted && dispatch({ type: DONE, data }))
        .catch((error) => mounted && dispatch({ type: ERROR, error }));
    },
    [mounted, asyncCallback],
  ) as K;

  const reset = useCallback(() => {
    if (!mounted) {
      return;
    }

    dispatch({
      type: RESET,
    });
  }, [mounted]);

  return {
    send,
    reset,
    ...state,
  };
}
