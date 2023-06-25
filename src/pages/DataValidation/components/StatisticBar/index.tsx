import { Grid } from '@mui/material';
import { FC } from 'react';
import { StatisticCard } from 'components/StatisticCard';

interface StatisticBarInterface {
  violatedCount: number;
  bookmarkCount: number;
  completedCount: number;
}

const StatisticBar: FC<StatisticBarInterface> = ({ violatedCount = 0, bookmarkCount = 0, completedCount = 0 }) => {
  return (
    <Grid container spacing={2} marginTop={1} marginLeft={2}>
      <Grid item xs={3}>
        <StatisticCard icon="info" title="DATA VALIDATION" count={violatedCount}></StatisticCard>
      </Grid>
      <Grid item xs={3}>
        <StatisticCard icon="completed" title="COMPLETED DATA" count={completedCount}></StatisticCard>
      </Grid>
      <Grid item xs={3}>
        <StatisticCard icon="bookmark" title="BOOKMARKS" count={bookmarkCount}></StatisticCard>
      </Grid>
    </Grid>
  );
};

export default StatisticBar;
