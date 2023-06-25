import { FC, ReactElement, ReactNode } from 'react';
import { render as rtlRender, RenderOptions, RenderResult, queries, Queries } from '@testing-library/react';
import { configureStore, Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';

import rootReducer from 'store/reducers';
import { RootState } from 'store/types';
import theme from 'core/theme';

interface ExtraOptions {
  initialState?: RootState;
  store?: Store<RootState>;
  withRouter?: boolean;
}

const render = <Q extends Queries = typeof queries, C extends Element | DocumentFragment = HTMLElement>(
  ui: ReactElement,
  options: ExtraOptions & RenderOptions<Q, C> = {},
): RenderResult<Q, C> & { store: Store } => {
  const {
    initialState = undefined,
    store = configureStore({ reducer: rootReducer, preloadedState: initialState }),
    withRouter = true,
    ...renderOptions
  } = options;

  const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{withRouter ? <Router>{children}</Router> : <>{children}</>}</ThemeProvider>
      </Provider>
    );
  };

  return { ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }), store, history };
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
