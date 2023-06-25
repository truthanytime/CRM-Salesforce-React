import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useIntegration } from 'store/integration/hooks';
import { IntegrationOverview, IntegrationProperty } from './components';
import { Container } from './ui';

const IntegrationDetailPage: FC = () => {
  const { id: appId } = useParams();
  const { integration, getIntegration } = useIntegration();
  useEffect(() => {
    getIntegration(String(appId));
  }, [appId, getIntegration]);

  return (
    <Container>
      <IntegrationProperty {...integration} />
      <IntegrationOverview />
    </Container>
  );
};

export default IntegrationDetailPage;
