import { Box, Typography } from '@mui/material';
import { CustomLinkLabel } from 'components/CustomLinkLabel';
import { TextLinkButton } from 'components/ui';
import { TextValue } from 'components/ui/text';
import { FC } from 'react';
import { FieldContainer, PropertyTitle } from '../../../ui';

interface Props {
  requirementPermissions: string;
  subscriptionTitle: string;
  subscriptions: string;
  subscriptionLink: string;
}

const Requirement: FC<Props> = ({ requirementPermissions, subscriptionTitle, subscriptions, subscriptionLink }) => {
  const FieldTitle: FC<{ children: string }> = ({ children }) => (
    <Typography component="p" variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
      {children}
    </Typography>
  );
  const FieldValue = TextValue;
  const isCompatiblePlan = true;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <PropertyTitle>Requirements</PropertyTitle>
      <FieldContainer>
        <FieldTitle>CustomerCity Subscription</FieldTitle>
        <CustomLinkLabel
          href={'https://customercitydev.com'}
          captionText={`${isCompatiblePlan ? '' : 'Not'} Compatible with your`}
          linkText="CustomerCity plan"
          withIcon
        />
        <TextLinkButton href="https://customercitydev.com" style={{ justifyContent: 'start' }}>
          See all compatible plans
        </TextLinkButton>
        {/* <CustomLinkLabel href={'https://customercitydev.com'} linkText="See all compatible plans" withIcon /> */}
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>CustomerCity Account Permissions</FieldTitle>
        <FieldValue>{requirementPermissions}</FieldValue>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>{subscriptionTitle}</FieldTitle>
        <CustomLinkLabel href={subscriptionLink} linkText={subscriptions} withIcon />
      </FieldContainer>
    </Box>
  );
};
export default Requirement;
