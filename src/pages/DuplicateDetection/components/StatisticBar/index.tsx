import { Grid } from '@mui/material';
import { FC } from 'react';
import { StatisticCard } from 'components/StatisticCard';

interface StatisticBarInterface {
  violatedCount: number;
  mergedCount: number;
}

const StatisticBar: FC<StatisticBarInterface> = ({ violatedCount = 0, mergedCount = 0 }) => {
  return (
    <Grid container spacing={2} marginTop={1} marginLeft={2}>
      <Grid item xs={3}>
        <StatisticCard icon="copy" title="DUPLICATES" count={violatedCount}></StatisticCard>
      </Grid>
      <Grid item xs={3}>
        <StatisticCard icon="merge" title="MERGED" count={mergedCount}></StatisticCard>
      </Grid>
    </Grid>
  );
};

export default StatisticBar;
