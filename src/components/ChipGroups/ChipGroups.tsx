import { Box, Chip, Stack } from '@mui/material';
import theme from 'core/theme';
import { FC } from 'react';

type Props = { labels: string[] };

const ChipGroups: FC<Props> = ({ labels }) => {
  return (
    <Stack direction="row" spacing={1}>
      {labels.map((label, index) => (
        <Chip key={index} label={label} sx={{ bgcolor: theme.palette.lightBg.main, borderRadius: 2 }} />
      ))}
    </Stack>
  );
};

export default ChipGroups;
