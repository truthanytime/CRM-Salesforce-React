import { Box, Typography } from '@mui/material';
import { ReactComponent as Icon1 } from 'assets/icons/filterBlue.svg';
import { LinkList } from 'components/LinkList';
import { TextValue } from 'components/ui/text';
import { FC } from 'react';
import { FieldContainer, PropertyTitle } from '../../../ui';

// interface Props {}

const DataPrivacy: FC = () => {
  const FieldTitle: FC<{ children: string }> = ({ children }) => (
    <Typography component="p" variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
      {children}
    </Typography>
  );
  const FieldValue = TextValue;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <PropertyTitle>Data Privacy</PropertyTitle>
      <FieldValue>
        {
          "You understand that when using this integration, it's up to you to comply with applicable laws and regulations, as well as the "
        }
        <span>
          <a href="#">CustomerCity AUP </a>
        </span>
        {'and '}
        <span>
          <a href="#">Terms of Service</a>
        </span>
        {". Please review this app partner's documentation for more information."}
      </FieldValue>
      <FieldContainer>
        <FieldTitle>Privacy policy</FieldTitle>
        <FieldValue>
          {'Please see '}
          <span>
            <a href="#">{"CustomerCity's Privacy Policy"}</a>
          </span>
          {' for more information.'}
        </FieldValue>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Data hosting location</FieldTitle>
        <FieldValue>
          {
            "For information on where third-party apps store and process data or their compliance with local regulations, please see the provider's documentation and privacy policy."
          }
        </FieldValue>
      </FieldContainer>
    </Box>
  );
};
export default DataPrivacy;
