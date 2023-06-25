import { FC, useState, Fragment } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
// Styled component for customizing the AccordionSummary
export const MyAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  '&.Mui-expanded': {
    margin: '0 0',
    minHeight: 'unset',
  },
}));
// DataFilterAccordion component
const DataFilterAccordion: FC = () => {
  return (
    <Box sx={{ marginTop: 3 }}>
      <Accordion sx={{ boxShadow: 'none', marginTop: 1 }} defaultExpanded>
        <MyAccordionSummary
          sx={{
            backgroundColor: 'darkBg.main',
            maxHeight: '32px',
            minHeight: '32px',
            borderRadius: '0.35rem',
            '&:before': { maxHeight: '32px', minHeight: '32px' },
            '&:after': { maxHeight: '32px', minHeight: '32px' },
          }}
          expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main', width: '24px', height: '20px' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="labelMedium14" sx={{ color: 'primary.main', fontSize: '12px' }} borderRadius={4}>
            COMPANY SIZE
          </Typography>
        </MyAccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="< $ 2 million>" />
            <FormControlLabel control={<Checkbox />} label="$ 2 million - $ 2 million" />
            <FormControlLabel control={<Checkbox />} label="$ 10 million - $ 50 million" />
            <FormControlLabel control={<Checkbox />} label="> $ 50 million" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ boxShadow: 'none', marginTop: 1, ':before': { position: 'unset' } }} defaultExpanded>
        <MyAccordionSummary
          sx={{ backgroundColor: 'darkBg.main', maxHeight: '32px', minHeight: '32px', borderRadius: '0.35rem' }}
          expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main', width: '24px', height: '20px' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="labelMedium14" sx={{ color: 'primary.main', fontSize: '12px' }}>
            EMPLOYEE SIZE
          </Typography>
        </MyAccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="< $ 2 million>" />
            <FormControlLabel control={<Checkbox />} label="$ 2 million - $ 2 million" />
            <FormControlLabel control={<Checkbox />} label="$ 10 million - $ 50 million" />
            <FormControlLabel control={<Checkbox />} label="> $ 50 million" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ boxShadow: 'none', marginTop: 1, ':before': { position: 'unset' } }} defaultExpanded>
        <MyAccordionSummary
          sx={{
            backgroundColor: 'darkBg.main',
            maxHeight: '32px',
            minHeight: '32px',
            borderRadius: '0.35rem',
            expanded: {
              margin: 'inherit',
            },
          }}
          expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main', width: '24px', height: '20px' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="labelMedium14" sx={{ color: 'primary.main', fontSize: '12px' }}>
            INDUSTRY
          </Typography>
        </MyAccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="< $ 2 million>" />
            <FormControlLabel control={<Checkbox />} label="$ 2 million - $ 2 million" />
            <FormControlLabel control={<Checkbox />} label="$ 10 million - $ 50 million" />
            <FormControlLabel control={<Checkbox />} label="> $ 50 million" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default DataFilterAccordion;
