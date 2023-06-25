import { configureStore, EnhancedStore, Middleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import rootReducer from './reducers';
import { Actions, RootState } from './types';

const configureAppStore = (preloadedState?: RootState): EnhancedStore<RootState, Actions> => {
  const devMiddlewares: Middleware[] = [];

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { logger } = require('redux-logger');

    devMiddlewares.push(logger);
  }

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(devMiddlewares),
    preloadedState,
    enhancers: [],
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
};

export const store = configureAppStore();
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
