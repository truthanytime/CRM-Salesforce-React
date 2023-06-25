import { FC, useState, ReactNode } from 'react';
import { ReactComponent as ChevronUpIcon } from 'assets/icons/chevronUp.svg';
import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';
import { Container, Head } from './ui';
import { Box, BoxProps, styled } from '@mui/material';

interface Props extends BoxProps {
  children?: ReactNode;
  defaultOpen?: boolean;
  title: string;
}

const DropDownPanel: FC<Props> = ({ children, defaultOpen = true, title, ...rest }) => {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  return (
    <Container>
      <Head color="primary" onClick={() => setOpen((o) => !o)} endIcon={open ? <ChevronUpIcon /> : <ChevronDownIcon />}>
        {title}
      </Head>
      <Box {...rest}>{open && children}</Box>
    </Container>
  );
};

export default DropDownPanel;

export const StyledDropDownPanel = styled(DropDownPanel)(() => ({
  padding: '16px 8px 4px',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));
