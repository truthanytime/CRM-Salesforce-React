import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { createGenericSlice, GenericState } from '../../firebase-redux/generic';
import {
  deleteMigrationById,
  getMigrationById,
  getMigrations,
  getMigrationTableDataById,
  getMigrationTableFieldsById,
  getMigrationTablesById,
  initStates,
  postMigration,
  setError,
  setLoading,
  setMigrationId,
  setMigrationTableName,
  setSuccess,
} from './actions';
import { MigrationState } from './types';

export const initialState: GenericState<MigrationState> = {
  error: false,
  loading: true,
  success: false,
  data: {
    migrations: [],
    migrationById: {},
    createdMigration: {},
    migrationId: '',
    migratedTableName: '',
    deletedMigration: {},
    migratedTables: [],
    migratedTableField: [],
    migratedTableData: [],
  },
};

const slice = createGenericSlice({
  name: 'migration',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<GenericState<MigrationState>>): void => {
    builder.addCase(setLoading, (state) => {
      state.loading = true;
      state.error = false;
      state.success = false;
    });
    builder.addCase(setError, (state) => {
      state.error = true;
      state.loading = false;
      state.success = false;
    });
    builder.addCase(setSuccess, (state) => {
      state.success = true;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getMigrationById.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(getMigrationById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.data.migrationById = payload;
    });
    builder.addCase(getMigrationById.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.data.migrationById = {};
    });
    builder.addCase(getMigrations.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(getMigrations.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.data.migrations = payload;
    });
    builder.addCase(getMigrations.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.data.migrations = [];
    });
    builder.addCase(postMigration.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(postMigration.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.data.createdMigration = payload;
    });
    builder.addCase(postMigration.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.data.createdMigration = {};
    });
    builder.addCase(deleteMigrationById.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(deleteMigrationById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.data.deletedMigration = payload;
    });
    builder.addCase(deleteMigrationById.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.data.deletedMigration = {};
    });
    builder.addCase(getMigrationTablesById.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(getMigrationTablesById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.data.migratedTables = payload
        .filter((pay) => pay.row_count > 0)
        .sort((a, b) => a.table_name.localeCompare(b.table_name));
    });
    builder.addCase(getMigrationTablesById.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.data.migratedTables = [];
    });
    builder.addCase(getMigrationTableFieldsById.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(getMigrationTableFieldsById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.data.migratedTableField = payload;
    });
    builder.addCase(getMigrationTableFieldsById.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.data.migratedTableField = [];
    });
    builder.addCase(getMigrationTableDataById.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(getMigrationTableDataById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.data.migratedTableData = payload;
    });
    builder.addCase(getMigrationTableDataById.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.data.migratedTableData = [];
    });
    builder.addCase(setMigrationId, (state, { payload }) => {
      state.data.migrationId = payload;
    });
    builder.addCase(setMigrationTableName, (state, { payload }) => {
      state.data.migratedTableName = payload;
    });
    builder.addCase(initStates, (state) => {
      state.data.migrations = [];
      state.data.migrationById = {};
      state.data.createdMigration = {};
      state.data.migrationId = '';
      state.data.migratedTableName = '';
      state.data.deletedMigration = {};
      state.data.migratedTables = [];
      state.data.migratedTableField = [];
      state.data.migratedTableData = [];
    });
  },
});
export const actions = slice.actions;
export default slice.reducer;
