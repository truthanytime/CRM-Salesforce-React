import { Box, Divider } from '@mui/material';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC } from 'react';
import { Integration } from 'store/integration/types';
import DataPrivacy from './components/DataPrivacy';
import Detail from './components/Detail';
import PropertyHead from './components/PropertyHead';
import Requirement from './components/Requirement';
import Resources from './components/Resources';
import Support from './components/Support';
import { BackToRoute, Container, PropertyContainer } from './ui';

type Props = Partial<Integration>;

const IntegrationProperty: FC<Props> = ({
  applicationId,
  applicationName,
  applicationIcon,
  applicationDescription,
  applicationStatus,
  ...property
}) => {
  const {
    providerName = '',
    providerLink = '',
    categories = [],
    features = [],
    languages = '',
    totalInstalls = '',
    subscriptionTitle = '',
    subscriptions = '',
    subscriptionLink = '',
    requirementPermissions = '',
  } = property;
  const detailProps = { providerName, providerLink, totalInstalls, categories, features, languages };
  const requirementProps = { subscriptionTitle, subscriptions, subscriptionLink, requirementPermissions };
  return (
    <Container>
      <BackToRoute to={PRIVATE_ABS_ROUTE_PATHS.integration}>
        <ArrowLeft />
        {'Back to Integration'}
      </BackToRoute>
      <PropertyHead
        integrationId={applicationId || ''}
        applicationIcon={applicationIcon || ''}
        applicationName={applicationName || ''}
        applicationDescription={applicationDescription || ''}
        initialStatus={applicationStatus || ''}
      />
      <Box padding="31px 24px">
        <Divider />
      </Box>
      <PropertyContainer>
        {detailProps && <Detail {...detailProps} />}
        <Divider />
        {requirementProps && <Requirement {...requirementProps} />}
        <Divider />
        <Resources />
        <Divider />
        <Support />
        <Divider />
        <DataPrivacy />
        <Divider />
      </PropertyContainer>
      {/* {loading && <Loader />} */}
    </Container>
  );
};

export default IntegrationProperty;
