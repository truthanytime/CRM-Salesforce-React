import { IconButton, Stack, Typography } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import { FC } from 'react';

import { Circle } from './ui';
import theme from 'core/theme';

type Props = {
  count: number;
  title: string;
  icon: string;
};

const StatisticCard: FC<Props> = ({ count, title, icon = 'info' }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      p={1.5}
      my={1}
      bgcolor={theme.palette.neutral.white}
      borderRadius={1}
    >
      <Stack direction="row" alignItems="center">
        <IconButton
          sx={{
            bgcolor: theme.palette.lightBg.main,
            borderRadius: 2,
            width: '24px',
            height: '24px',
          }}
        >
          {icon === 'info' && (
            <InfoOutlinedIcon
              sx={{
                width: '15px',
              }}
            ></InfoOutlinedIcon>
          )}
          {icon === 'completed' && (
            <CheckOutlinedIcon
              sx={{
                width: '15px',
              }}
            ></CheckOutlinedIcon>
          )}
          {icon === 'bookmark' && (
            <StarBorderOutlinedIcon
              sx={{
                width: '15px',
              }}
            ></StarBorderOutlinedIcon>
          )}
          {icon === 'copy' && (
            <ContentCopyIcon
              sx={{
                width: '15px',
              }}
            ></ContentCopyIcon>
          )}
          {icon === 'merge' && (
            <CallMergeIcon
              sx={{
                width: '15px',
              }}
            ></CallMergeIcon>
          )}
        </IconButton>
        <Typography variant="labelMedium12" ml={1}>
          {title}
        </Typography>
      </Stack>
      <Circle size="22px">
        <Typography variant="labelMedium12" color={theme.palette.neutral.darkGray}>
          {count}
        </Typography>
      </Circle>
    </Stack>
  );
};

export default StatisticCard;
