import { Backdrop, Box, CircularProgress } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDataRaptor } from 'store/dataRaptor/hooks';
import { useMigration } from 'store/migration/hooks';

import { DataValidationListSection } from './ui';
import Header from './components/Header';
import StatisticBar from './components/StatisticBar';
import AISummary from './components/AISummary';
import { DataValidationList } from './components/DataValidationList';
import { getOpenAISummaryforMigrationIdAndTableName } from 'http/openai';
import { getBookmarkedTableData } from 'http/migration';

interface StateInterface {
  violatedCount: number;
}

const DataValidationPage: FC = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<string>();
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [completedDataCount, setCompletedDataCount] = useState<number>(0);
  const navigator = useNavigate();
  const { selectedTable } = useDataRaptor();
  const { data } = useMigration();

  const { migrationId, migratedTables } = data;

  useEffect(() => {
    const tempFunc = async () => {
      try {
        const temp = await getOpenAISummaryforMigrationIdAndTableName(migrationId, selectedTable);
        setAiSummary(temp);
      } catch {
        setAiSummary('AI summary is not working now');
      }
    };

    const tempFunc2 = async () => {
      try {
        const bookmarkedData = await getBookmarkedTableData(migrationId, selectedTable);
        setBookmarks(bookmarkedData.map((item) => item.Id));
      } catch {
        setBookmarks([]);
      }
    };
    tempFunc();
    tempFunc2();
  }, [migrationId, selectedTable]);

  useEffect(() => {
    const table = migratedTables.find((item) => item.table_name === selectedTable);
    setCompletedDataCount(Number(table?.row_count) - (state as StateInterface).violatedCount);
  }, [migratedTables, selectedTable, state]);

  const handleBack = useCallback(() => {
    navigator('/d/data-raptor');
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    //search function 'll be implemented later
    console.log(e.target.value);
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Header handleBack={handleBack} handleSearchTextChange={handleSearchInputChange}></Header>
        <StatisticBar
          violatedCount={(state as StateInterface).violatedCount}
          completedCount={completedDataCount}
          bookmarkCount={bookmarks.length}
        ></StatisticBar>
        <AISummary tableName={selectedTable} summary={aiSummary}></AISummary>

        <DataValidationListSection>
          <DataValidationList
            toggleBookmark={(Id: string) => {
              const temp = [...bookmarks];
              const index = bookmarks.findIndex((item) => item === Id);
              if (index > -1) {
                temp.splice(index, 1);
                setBookmarks(temp);
              } else {
                temp.push(Id);
              }
              setBookmarks(temp);
            }}
          ></DataValidationList>
        </DataValidationListSection>

        <Backdrop sx={{ color: '#fff', zIndex: 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );
};

export default DataValidationPage;
