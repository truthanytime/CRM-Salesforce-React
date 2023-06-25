import { FC, HTMLInputTypeAttribute } from 'react';
import { Typography, Box, SxProps, Theme } from '@mui/material';

import { ReactComponent as EmailIcon } from 'assets/icons/email.svg';
import { ReactComponent as PhoneIcon } from 'assets/icons/phone.svg';
import { DetailContainer, DetailValueContainer, TextValue } from './ui';

interface UserDetailProps {
  label: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  sx?: SxProps<Theme>;
  small?: boolean;
}

const UserDetail: FC<UserDetailProps> = ({ label, value, type, sx, small = true }) => {
  const renderIcon = () => {
    switch (type) {
      case 'email':
        return (
          <Box>
            <EmailIcon />
          </Box>
        );
      case 'tel':
        return (
          <Box>
            <PhoneIcon />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <DetailContainer sx={sx}>
      <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
        {label}
      </Typography>

      <DetailValueContainer>
        {renderIcon()}

        <TextValue small={small}>{value}</TextValue>
      </DetailValueContainer>
    </DetailContainer>
  );
};

export default UserDetail;
