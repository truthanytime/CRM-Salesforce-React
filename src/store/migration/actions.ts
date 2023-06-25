import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteMigrationById as deleteMigrationByIdApi,
  getMigrationById as getMigrationByIdApi,
  getMigrationTableDataById as getMigrationTableDataByIdApi,
  getMigrationTableFieldsById as getMigrationTableFieldsByIdApi,
  getMigrationTablesById as getMigrationTablesByIdApi,
  getMigrationTableTotalDataCount as getMigrationTableTotalDataCountApi,
  getUserMigrations as getUserMigrationsApi,
  postMigration as postMigrationApi,
} from '../../http/migration/index';
import { Migration, MigrationAndTableId, MigrationTable, TableDataParameters, TableField } from './types';

const SET_ERROR = 'migration/SET_ERROR';
const SET_SUCCESS = 'migration/SET_SUCCESS';
const SET_LOADING = 'migration/SET_LOADING';
const GET_MIGRATIONS = 'migration/GET_MIGRATIONS';
const GET_MIGRATION_BY_ID = 'migration/GET_MIGRATION_BY_ID';
const POST_MIGRATION = 'migration/POST_MIGRATION';
const DELETE_MIGRATION_BY_ID = 'migration/DELETE_MIGRATION_BY_ID';
const GET_MIGRATION_TABLES_BY_ID = 'migration/GET_MIGRATION_TABLES_BY_ID';
const GET_MIGRATION_TABLE_FIELD_BY_ID = 'migration/GET_MIGRATION_TABLE_FIELD_BY_ID';
const GET_MIGRATION_TABLE_DATA_BY_ID = 'migration/GET_MIGRATION_TABLE_DATA_BY_ID';
const SET_MIGRATION_ID = 'migration/SET_MIGRATION_ID';
const SET_MIGRATION_TABLE_NAME = 'migration/SET_MIGRATION_TABLE_NAME';
const INIT_STATES = 'migration/INIT_STATES';

export const setSuccess = createAction<Migration>(SET_SUCCESS);
export const setError = createAction<string | boolean>(SET_ERROR);
export const setLoading = createAction<string | boolean>(SET_LOADING);
export const getMigrations = createAsyncThunk<Migration[]>(GET_MIGRATIONS, async () => {
  return getUserMigrationsApi();
});
export const getMigrationById = createAsyncThunk<Migration, string>(GET_MIGRATION_BY_ID, async (migrationId) => {
  return getMigrationByIdApi(migrationId);
});
export const postMigration = createAsyncThunk<Migration, string>(POST_MIGRATION, async (dataSourceId) => {
  return postMigrationApi(dataSourceId);
});
export const deleteMigrationById = createAsyncThunk<Migration, string>(DELETE_MIGRATION_BY_ID, async (migrationId) => {
  return deleteMigrationByIdApi(migrationId);
});
export const getMigrationTablesById = createAsyncThunk<MigrationTable[], string>(
  GET_MIGRATION_TABLES_BY_ID,
  async (migrationId) => {
    return getMigrationTablesByIdApi(migrationId);
  },
);
export const getMigrationTableFieldsById = createAsyncThunk<TableField[], MigrationAndTableId>(
  GET_MIGRATION_TABLE_FIELD_BY_ID,
  async (migrationAndTableId: MigrationAndTableId) => {
    return getMigrationTableFieldsByIdApi(migrationAndTableId.migrationId, migrationAndTableId.tableId);
  },
);
export const getMigrationTableDataById = createAsyncThunk<any[], TableDataParameters>(
  GET_MIGRATION_TABLE_DATA_BY_ID,
  async (tableDataParameters: TableDataParameters) => {
    return getMigrationTableDataByIdApi(
      tableDataParameters.migrationId,
      tableDataParameters.tableId,
      tableDataParameters.skip,
      tableDataParameters.take,
    );
  },
);
export const setMigrationId = createAction<string>(SET_MIGRATION_ID);
export const setMigrationTableName = createAction<string>(SET_MIGRATION_TABLE_NAME);
export const initStates = createAction(INIT_STATES);
