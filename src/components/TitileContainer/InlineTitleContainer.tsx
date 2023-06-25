import { FC, ReactNode } from 'react';
import { Typography } from '@mui/material';
import { InlineTitle } from './ui';

interface Props {
  children?: ReactNode;
  label?: string | ReactNode;
}

const InlineTitleContainer: FC<Props> = ({ label, children }) => {
  return (
    <InlineTitle>
      {label && (
        <Typography variant="p14" sx={{ fontWeight: 400, color: 'neutral.n400', width: 80 }}>
          {label}
        </Typography>
      )}
      {children}
    </InlineTitle>
  );
};

export default InlineTitleContainer;
