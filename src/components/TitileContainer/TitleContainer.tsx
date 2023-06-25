import { FC, ReactNode } from 'react';
import { Box, InputLabel } from '@mui/material';
import { ReactComponent as DealRoundIcon } from 'assets/icons/dealRound.svg';
import { ReactComponent as AvatarRoundIcon } from 'assets/icons/avatar.svg';
import { ReactComponent as PhoneRoundIcon } from 'assets/icons/phone.svg';

type IconType = 'deal' | 'user' | 'phone' | 'email';

interface Props {
  children?: ReactNode;
  label?: string | ReactNode;
  icon?: IconType;
}

const TitleContainer: FC<Props> = ({ label, children, icon }) => {
  return (
    <div>
      {label && <InputLabel sx={{ marginBottom: 0.5 }}>{label}</InputLabel>}

      {icon ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {icon === 'deal' && <DealRoundIcon />}
          {icon === 'user' && <AvatarRoundIcon />}
          {icon === 'phone' && <PhoneRoundIcon />}

          {children}
        </Box>
      ) : (
        children
      )}
    </div>
  );
};

export default TitleContainer;
