import { Backdrop, Box, CircularProgress, Modal } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDataRaptor } from 'store/dataRaptor/hooks';
import { useMigration } from 'store/migration/hooks';

import Header from './components/Header';
import StatisticBar from './components/StatisticBar';
import DuplicateDetectionRowList from './components/DuplicateDetectionRows';
import DuplicateDetectionGroupList from './components/DuplicateDetectionGroups';
import { useDuplicateDetection } from 'store/duplicateDetection/hook';
import { DuplicateDetectionPageStatus } from 'store/duplicateDetection/types';
import MergeModal from './components/MergeModal/MergeModal';
interface StateInterface {
  violatedCount: number;
}

const DuplicateDetectionPage: FC = () => {
  const { loading, pageStatus, setPageStatus, mergeModalStatus, setMergeModalStatus } = useDuplicateDetection();
  const { state } = useLocation();
  const navigator = useNavigate();
  const { selectedTable } = useDataRaptor();
  const { data } = useMigration();

  const { migrationId, migratedTables } = data;

  useEffect(() => {
    const tempFunc = async () => {
      try {
        console.log('try');
      } catch {
        console.log('catch');
      }
    };
    tempFunc();
  }, [migrationId, selectedTable]);

  const handleBack = useCallback(() => {
    if (pageStatus === DuplicateDetectionPageStatus.GROUPS) {
      navigator('/d/data-raptor');
    } else {
      setPageStatus(DuplicateDetectionPageStatus.GROUPS);
    }
  }, [pageStatus]);

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    //search function 'll be implemented later
    console.log(e.target.value);
  }, []);

  const openMergeModal = useCallback(() => {
    setMergeModalStatus(true);
  }, []);

  const closeMergeModal = useCallback(() => {
    setMergeModalStatus(false);
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Header
          handleBack={handleBack}
          handleSearchTextChange={handleSearchInputChange}
          pageStatus={pageStatus}
          openMergeModal={openMergeModal}
        ></Header>

        {pageStatus === DuplicateDetectionPageStatus.GROUPS ? (
          <>
            <StatisticBar violatedCount={(state as StateInterface).violatedCount} mergedCount={0}></StatisticBar>
            <DuplicateDetectionGroupList></DuplicateDetectionGroupList>
          </>
        ) : (
          <DuplicateDetectionRowList></DuplicateDetectionRowList>
        )}

        <Modal open={mergeModalStatus} onClose={closeMergeModal}>
          <MergeModal closeMergeModal={closeMergeModal}></MergeModal>
        </Modal>

        <Backdrop sx={{ color: '#fff', zIndex: 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );
};

export default DuplicateDetectionPage;
