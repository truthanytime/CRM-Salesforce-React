import { FC } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';

import theme from 'core/theme';
import { store } from 'store';
import AppRouter from 'router/AppRouter';
import AxiosInterceptors from 'http/interceptors';

AxiosInterceptors.setup(store);

const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
