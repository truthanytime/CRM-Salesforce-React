import { FC, useEffect, useState } from 'react';
import { Typography, Divider, IconButton, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as NavBackIcon } from 'assets/icons/navBack.svg';
import { Modal, ModalContainer, ModalHeader, ModalMain, TextButton, PaginatedModalFooter } from 'components/ui';
import { useDataSource } from '../../../../store/dataSource/hooks';
import { useMigration } from '../../../../store/migration/hooks';
import { IntegratedDataSource } from '../../../../store/dataSource/types';
import { DataSourceSelector } from '../DataSourceSelector';
import { MigrationStatus } from '../MigrationStatus';
import { useDataRaptor } from 'store/dataRaptor/hooks';

interface DataSourceModalProps {
  open: boolean;
  toggleOpen: () => void;
}

const DataSourceModal: FC<DataSourceModalProps> = ({ open, toggleOpen }) => {
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [selectedDataSource, setSelectedDataSource] = useState<IntegratedDataSource | undefined>(undefined);
  const [selectedMigrationId, setSelectedMigrationId] = useState<string>('');
  const { updatePageStatus } = useDataRaptor();
  const {
    data: { createdMigration },
    postMigration,
  } = useMigration();

  const {
    data: { dataSources },
    getDataSources,
  } = useDataSource();

  useEffect(() => {
    getDataSources();
  }, [createdMigration, getDataSources]);

  useEffect(() => {
    if (createdMigration) {
      setSelectedMigrationId(createdMigration.dataMigrationId);
    }
  }, [createdMigration, setSelectedMigrationId]);

  const toggleModalHandler = () => {
    setIsFirst(true);
    toggleOpen();
  };

  const handleFinisDataIntegration = () => {
    updatePageStatus('data_list_view');
    setIsFirst(true);
    toggleOpen();
  };

  const selectDataSourceHandler = (dataSourceId: string) => {
    const foundDataSource = dataSources.find((dataSource) => dataSource.data_source_id === dataSourceId);
    if (foundDataSource?.data_source_id === selectedDataSource?.data_source_id) {
      setSelectedDataSource(undefined);
    } else {
      setSelectedDataSource(foundDataSource);
    }
  };

  const migrateDataHandler = async () => {
    if (selectedDataSource?.data_source_id) {
      if (selectedDataSource.migration_status && selectedDataSource.migration_id) {
        setSelectedMigrationId(selectedDataSource.migration_id);
      } else {
        postMigration(selectedDataSource.data_source_id);
      }
      setIsFirst(false);
    }
  };

  return (
    <Modal open={open} onClose={toggleModalHandler}>
      <ModalContainer>
        <ModalHeader>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            Data Source
          </Typography>
          <IconButton onClick={toggleModalHandler}>
            <CrossIcon />
          </IconButton>
        </ModalHeader>
        <Divider />
        <>
          <ModalMain>
            {isFirst ? (
              <DataSourceSelector
                dataSources={dataSources}
                selectDataSourceHandler={selectDataSourceHandler}
                selectedDataSource={selectedDataSource}
              />
            ) : (
              <MigrationStatus migrationId={selectedMigrationId} />
            )}
          </ModalMain>
          <Divider />
          <PaginatedModalFooter>
            <Box sx={{ width: 250 }}>
              {!isFirst && (
                <TextButton onClick={() => setIsFirst(true)} sx={{ fontWeight: 400 }}>
                  <NavBackIcon style={{ marginRight: 10 }} />
                  Back
                </TextButton>
              )}
            </Box>
            <Box sx={{ width: 250, display: 'flex', flexDirection: 'row-reverse' }}>
              {isFirst ? (
                <LoadingButton disabled={!selectedDataSource} variant="contained" onClick={migrateDataHandler}>
                  Migrate Data
                </LoadingButton>
              ) : (
                <LoadingButton variant="contained" onClick={handleFinisDataIntegration}>
                  Finish
                </LoadingButton>
              )}
            </Box>
          </PaginatedModalFooter>
        </>
      </ModalContainer>
    </Modal>
  );
};

export default DataSourceModal;
