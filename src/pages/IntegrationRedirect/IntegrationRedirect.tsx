import { Container } from '@mui/material';
import { FC, useEffect } from 'react';
import { useIntegration } from 'store/integration/hooks';

const IntegrationRedirectPage: FC = () => {
  const { authCallback, success } = useIntegration();

  const close = () => {
    window.close();
  };

  useEffect(() => {
    const params = window.location.search;
    const paths = window.location.pathname.split('/').filter((i) => !!i);
    const appId = paths[paths.length - 1];

    // get the URL parameters which will include the auth token
    if (appId + params) {
      authCallback(appId + params);
    }
  }, [authCallback]);

  useEffect(() => {
    if (success) {
      window.close();
    }
  }, [success]);

  return (
    <Container maxWidth="lg">
      <h1 onClick={close}>Installing please wait ...</h1>
    </Container>
  );
};

export default IntegrationRedirectPage;
