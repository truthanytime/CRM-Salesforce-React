import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

import { Circle } from './ui';
import theme from 'core/theme';
import HighLight from './HighLigth';
import { useNavigate } from 'react-router-dom';
import { dashCase } from 'core/utils';

type Props = {
  count: number;
  title: string;
  highlight?: boolean;
};

const IndividualRuleCard: FC<Props> = ({ count, title, highlight = false }) => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      p={1.5}
      my={1}
      bgcolor={theme.palette.lightBg.main}
      borderRadius={1}
      onClick={() => {
        navigate(`/d/${dashCase(title)}`, {
          state: {
            violatedCount: count,
          },
        });
      }}
    >
      <Stack direction="row" alignItems="center">
        <Circle size="22px">
          <Typography variant="labelMedium12" color={theme.palette.primary.main}>
            {count}
          </Typography>
        </Circle>
        <Typography variant="labelMedium12" ml={1}>
          {title}
        </Typography>
      </Stack>
      <HighLight highlight={highlight} tooltip={(highlight ? 'hide ' : 'show ') + title + ' detections'}></HighLight>
    </Stack>
  );
};

export default IndividualRuleCard;
