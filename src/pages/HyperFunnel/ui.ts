import { styled, Box } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

export const Container = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

export const VerticalDivider = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: 1,
  height: 24,
  position: 'relative',
  '&::before': {
    content: '" "',
    height: 24,
    position: 'absolute',
    top: 8,
    width: 1,
    backgroundColor: theme.palette.neutral.n200,
  },
}));

export const HyperFunnelContainer = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '2.5rem',
}));

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'unset',
  marginBottom: theme.spacing(2),
  '& .MuiPaper-root': {
    border: 'unset',
  },
}));

export const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: '#F6F8FB',
}));

export const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));
