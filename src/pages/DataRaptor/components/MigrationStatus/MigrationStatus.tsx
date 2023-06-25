import { FC, useEffect, useRef } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { GridItem } from 'components/ui';
import { useMigration } from '../../../../store/migration/hooks';
import { LinearProgress } from '@mui/material';
import { DATA_MIGRATION_STATUS } from '../../../../core/constants';

const finalStatus: string[] = [
  DATA_MIGRATION_STATUS.DATA_MIGRATION_COMPLETED,
  DATA_MIGRATION_STATUS.DATA_MIGRATION_FAILED,
];
interface MigrationStatusProps {
  migrationId: string;
}

const MigrationStatus: FC<MigrationStatusProps> = ({ migrationId }) => {
  const {
    data: { migrationById },
    getMigrationById,
    getMigrations,
  } = useMigration();
  const timerRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (migrationId && !finalStatus.includes(migrationById.status)) {
        getMigrationById(migrationId);
      }
      if (migrationId && DATA_MIGRATION_STATUS.DATA_MIGRATION_COMPLETED === migrationById.status) {
        getMigrations();
      }
    }, 3000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [migrationId, getMigrationById, migrationById.status]);

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: 'neutral.main', textTransform: 'capitalize' }}>
          Migration status
        </Typography>
        {!finalStatus.includes(migrationById.status) && (
          <Typography variant="labelRegular12" sx={{ color: 'neutral.main' }}>
            You can close this modal, when the data has finished migrating will automatically be show on Data Raptor
            page
          </Typography>
        )}
        <Grid container marginTop={'1rem'}>
          <GridItem item xs={12}>
            {!finalStatus.includes(migrationById.status) && (
              <Box sx={{ textAlign: 'center', marginTop: '1rem' }}>
                <LinearProgress />
              </Box>
            )}
            <Box sx={{ textAlign: 'center', marginTop: '1rem' }}>
              <Typography variant="labelMedium14" sx={{ color: 'neutral.main' }}>
                Status: {migrationById.status}
              </Typography>
              <br />
              <Typography variant="labelMedium14" sx={{ color: 'neutral.main' }}>
                Status Date: {migrationById.statusDate}
              </Typography>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default MigrationStatus;
