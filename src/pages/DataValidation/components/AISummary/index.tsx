import { FC } from 'react';
import { Typography, Box, LinearProgress } from '@mui/material';
interface SummaryInterface {
  tableName: string;
  summary: string | undefined;
}

const AISummary: FC<SummaryInterface> = ({ tableName, summary, ...props }) => {
  return (
    <Box {...props} px={4} py={1}>
      <Typography variant="b16">{tableName} records with data validation issues</Typography>
      <br></br>
      <Typography variant="p12" color="gray">
        {summary ? (
          summary
        ) : (
          <LinearProgress
            sx={{
              my: 1,
              width: 150,
            }}
          ></LinearProgress>
        )}
      </Typography>
    </Box>
  );
};

export default AISummary;
