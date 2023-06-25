import { Backdrop, Box, CircularProgress, Divider, Grid, Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { ReactComponent as ConfidenceScoreIcon } from 'assets/icons/confidenceScoreIcon.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { CustomGroupSelect } from 'components/CustomGroupSelect';
import { Item, SubGroup } from 'components/CustomGroupSelect/CustomGroupSelect';
import { PrimaryButton } from 'components/ui';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPageIndex } from 'store/dataRaptor/actions';
import { useDataRaptor } from 'store/dataRaptor/hooks';
import { APPLICATION_STATUS } from 'store/integration-status/types';
import { useIntegration } from 'store/integration/hooks';
import { useMigration } from 'store/migration/hooks';
import { TableField } from 'store/migration/types';
import { ConfidenceScoreGrid } from './components/ConfidenceScoreGrid';
import { DataFilterDraw } from './components/DataFilterDrawer';
import { DataRaptorList } from './components/DataRaptorList';
import { DataSourceModal } from './components/DataSourceModal';
import { RuleDrawer } from './components/RuleDrawer';
import { TENANT_UPDATES_EVENT_TYPES } from 'core/constants';
import io from 'socket.io-client';

import {
  DataRaptorEmptyDashboardSection,
  DataRaptorListSection,
  DataRaptorScoreSection,
  DataRaptorSection,
  VerticalDivider,
} from './ui';
import { useAuth } from 'store/auth/hooks';
import { useDataRaptorRule } from 'store/dataRaptorRule/hooks';

interface TenantUpdateEventDto {
  tenantId: string;
  table: string;
  ruleIds?: string[];
  type: string;
}

const DataRaptorPage: FC = () => {
  const [dataSourceModalOpen, setDataSourceModalOpen] = useState(false);
  const [showRuleDrawer, setShowRuleDrawer] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rowsData, setRowsData] = useState<any[]>([]);
  const navigator = useNavigate();
  const {
    confidenceScoreSectionState,
    pageStatus,
    pageSize,
    pageIndex,
    updatePageStatus,
    setTotalDataCount,
    initDataRaptorStates,
    totalDataCount,
    setSelectedTable,
    setSelectedMigration,
    selectedMigration,
    selectedTable,
  } = useDataRaptor();
  const {
    data,
    getMigrationTablesById,
    getMigrations,
    setMigrationId,
    getMigrationTableFieldsById,
    setMigrationTableName,
    getMigrationTableDataById,
    initMigrationStates,
  } = useMigration();

  const { getRulesByMigrationAndTable } = useDataRaptorRule();
  const { migrations, migrationId, migratedTables, migratedTableName, migratedTableField, migratedTableData } = data;
  const { integrations, getIntegrations } = useIntegration();
  const { accessToken } = useAuth();
  const selectData: SubGroup[] = [
    {
      header: 'CRM INTEGRATION',
      items: items,
    },
  ];

  const clearStates = () => {
    initDataRaptorStates();
    initMigrationStates();
  };

  // When you navigate this page, get migrations first.
  useEffect(() => {
    console.log('INIT');
    clearStates();
    getIntegrations();
    console.log('GET_MIGRATIONS');
    getMigrations();
  }, []);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    if (!apiUrl) return;
    const newSocket = io(apiUrl, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    newSocket.on('tenant-update', (payload: TenantUpdateEventDto) => {
      if (payload.table !== selectedTable) return;
      if (
        payload.type === TENANT_UPDATES_EVENT_TYPES.RULE_APPLIED ||
        payload.type === TENANT_UPDATES_EVENT_TYPES.DATA_SYNCHRONIZED
      ) {
        getMigrationTableDataById({
          tableId: selectedTable,
          migrationId: selectedMigration,
          skip: pageIndex,
          take: pageSize,
        });
        getRulesByMigrationAndTable({ migrationId: selectedMigration, table: selectedTable });
      }
    });
    newSocket.emit('join-tenant-updates-group', {});
    return () => {
      newSocket.disconnect();
      newSocket.off();
    };
  }, [accessToken, selectedTable, selectedMigration, getMigrationTableDataById, pageIndex, pageSize]);

  useEffect(() => {
    console.log('INTEGRATION', integrations);
    if (integrations.length) {
      let isSalesforceIntegrated = false;
      integrations.forEach((integration) => {
        if (
          integration.applicationName === 'Salesforce' &&
          integration.applicationStatus === APPLICATION_STATUS.INSTALLED
        ) {
          isSalesforceIntegrated = true;
        }
      });
      if (isSalesforceIntegrated) {
        if (pageStatus === '') {
          navigateTo('empty_dashboard');
        }
      } else {
        navigator('/d/integration');
      }
    }
  }, [integrations]);

  // After get migrations, if there is migrations, set migration id.
  useEffect(() => {
    console.log('MIGRATIONS');
    if (migrations.length) {
      console.log('SET_MIGRATION_ID');
      let dataMigrationId;
      for (const migration of migrations) {
        if (migration.dataMigrationId) {
          dataMigrationId = migration.dataMigrationId;
        }
      }
      if (dataMigrationId) {
        setMigrationId(dataMigrationId);
        setSelectedMigration(dataMigrationId);
        navigateTo('data_list_view');
      } else {
        navigateTo('/d/integration');
      }
    }
  }, [migrations]);

  // After set migration id, get migrated tables
  useEffect(() => {
    console.log('MIGRATION_ID');
    if (migrationId.length) {
      console.log('GET_MIGRATION_TABLES_BY_ID');
      getMigrationTablesById(migrationId);
    }
  }, [migrationId]);

  // After get migrated tables, set tablenames to the select list.
  useEffect(() => {
    console.log('MIGRATED_TABLES');
    if (migratedTables.length) {
      console.log('SET_ITEMS');
      const newItems: Item[] = [];
      for (const tableName of data.migratedTables) {
        newItems.push({ name: tableName.table_name, value: tableName.table_name });
      }
      setItems(newItems);
      setLoading(false);
      setMigrationTableName(data.migratedTables[0].table_name);
      setSelectedTable(data.migratedTables[0].table_name);
    }
  }, [migratedTables]);

  // When select table name, get headers and total counts.
  useEffect(() => {
    console.log('MIGRATED_TABLE_NAME');
    if (migratedTableName.length) {
      console.log('GET_MIGRATION_TABLE_DATA_TOTAL_COUNT');
      const rowCount = data.migratedTables.find(
        (migratedTable) => migratedTable.table_name === migratedTableName,
      )?.row_count;
      setTotalDataCount(rowCount ? rowCount : 0);
      console.log('GET_MIGRATION_TABLE_FIELDS_BY_ID');
      getMigrationTableFieldsById({ migrationId: migrationId, tableId: migratedTableName });
    }
  }, [migratedTableName]);

  // When get headers and total counts, set headers to datagrid
  useEffect(() => {
    if (migratedTableField.length) {
      console.log('SET_NEW_COLUMNS');
      const newColumns: GridColDef[] = [];
      migratedTableField.forEach((field: TableField, index: number) => {
        newColumns.push({
          field: field.fieldName,
          headerName: field.fieldName,
          headerClassName: 'super-app-theme--header-middle',
          cellClassName: 'super-app-theme--cell',
          // width: 300,
        });
      });
      setColumns(newColumns);
    }
    if (totalDataCount && migratedTableField) {
      setLoading(false);
      setPageIndex(0);
      getMigrationTableDataById({
        migrationId: migrationId,
        tableId: migratedTableName,
        skip: 0,
        take: pageSize,
      });
    }
  }, [migratedTableField, totalDataCount]);

  // After get migrated table data, append id for all record and set to datagrid
  useEffect(() => {
    if (migratedTableData.length) {
      console.log('SET_ROWS_DATA');
      const newRowsData: any[] = [];
      migratedTableData.forEach((value: any, index: number) => {
        newRowsData.push({ id: pageIndex * pageSize + index + 1, ...value });
      });
      setRowsData(newRowsData);
    }
  }, [migratedTableData]);

  const navigateTo = (page: string) => {
    updatePageStatus(page);
  };

  const toggleDataSourceModal = () => {
    setDataSourceModalOpen((prevState) => !prevState);
  };

  const toggleRuleDrawer = () => {
    setShowRuleDrawer((prevState) => !prevState);
  };

  const handleTableNameChange = (newTableName: string) => {
    setMigrationTableName(newTableName);
    setSelectedTable(newTableName);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Grid container spacing={2} sx={{ backgroundColor: 'neutral.white', padding: '24px 32px 16px' }}>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" alignItems="flex-end">
              <Typography variant="h2" sx={{ color: 'neutral.main' }}>
                Data Raptor
              </Typography>
              <VerticalDivider />
              <Typography variant="labelRegular12" sx={{ color: 'neutral.n400', marginBottom: 0.5 }} component="p">
                Data health and anomaly detection solution
              </Typography>
            </Stack>
          </Grid>
          {pageStatus === 'data_list_view' && (
            <>
              <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="p14" sx={{ color: 'neutral.n400' }}>
                      Table
                    </Typography>
                    <CustomGroupSelect
                      data={selectData}
                      tableName={migratedTableName}
                      setTableName={handleTableNameChange}
                    />
                  </Stack>
                  <Divider orientation="vertical" sx={{ height: 24 }} />
                  <PrimaryButton onClick={toggleRuleDrawer}>Rules</PrimaryButton>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DataFilterDraw />
              </Grid>
            </>
          )}
        </Grid>

        <DataSourceModal open={dataSourceModalOpen} toggleOpen={toggleDataSourceModal} />

        <DataRaptorSection>
          {pageStatus === 'data_list_view' && (
            <>
              <DataRaptorListSection>
                <DataRaptorList data={rowsData} />
              </DataRaptorListSection>
              {confidenceScoreSectionState && (
                <DataRaptorScoreSection>
                  <ConfidenceScoreGrid toggleRuleDrawer={toggleRuleDrawer} />
                </DataRaptorScoreSection>
              )}
            </>
          )}
          {pageStatus === 'empty_dashboard' && (
            <DataRaptorEmptyDashboardSection>
              <ConfidenceScoreIcon width={'100%'} />
              <Typography
                variant="labelRegular12"
                component="p"
                sx={{ color: 'neutral.n400', my: 3, textAlign: 'center', maxWidth: '100%' }}
              >
                You haven&apos;t added any records yet
              </Typography>
              <PrimaryButton startIcon={<PlusIcon />} onClick={() => setDataSourceModalOpen(true)}>
                Add Records
              </PrimaryButton>
            </DataRaptorEmptyDashboardSection>
          )}
          {pageStatus === 'data_integration_dashboard' && (
            <DataRaptorEmptyDashboardSection>
              <ConfidenceScoreIcon width={'100%'} />
              <PrimaryButton startIcon={<PlusIcon />} onClick={() => navigateTo('data_list_view')} sx={{ my: 3 }}>
                Manage rules
              </PrimaryButton>
            </DataRaptorEmptyDashboardSection>
          )}
        </DataRaptorSection>
        <Backdrop sx={{ color: '#fff', zIndex: 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <RuleDrawer displayed={showRuleDrawer} toggle={toggleRuleDrawer} />
      </Box>
    </>
  );
};

export default DataRaptorPage;
