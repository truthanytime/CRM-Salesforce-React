export interface Migration {
  dataMigrationId: string;
  dataSourceId: string;
  status: string;
  statusDate: string;
  syncedAt: string;
  integration_state_id: {
    dataSourceId: string;
    name: string;
    integrationId: string;
  };
}

export interface MigrationState {
  loading: boolean | string;
  error: boolean | string;
  success: boolean | string;
  data: {
    migrations: Migration[];
    migrationById: Migration;
    createdMigration: Migration;
    deletedMigration: Migration;
    migratedTables: MigrationTable[];
    migratedTableField: TableField[];
    migratedTableData: any[];
    migrationId: string;
    migratedTableName: string;
  };
}

export interface MigrationTable {
  table_name: string;
  row_count: number;
  avg_confidence_score: number;
  updated_at: Date;
}
export interface TableField {
  Id: number;
  tableId: string;
  fieldName: string;
  xsd_type: string;
  type: string;
  primaryKey: boolean;
  foreignKey: boolean;
  foreignTableId: any;
}

export interface MigrationAndTableId {
  migrationId: string;
  tableId: string;
}

export interface TableDataParameters {
  migrationId: string;
  tableId: string;
  skip: number;
  take: number;
}

export interface MigrationReturnHook extends MigrationState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: Migration) => void;
  setLoading: (loading: string | boolean) => void;
  getMigrations: () => void;
  getMigrationById: (dataSourceId: string) => void;
  postMigration: (dataSourceId: string) => void;
  deleteMigrationById: (migrationId: string) => void;
  getMigrationTablesById: (migrationId: string) => void;
  getMigrationTableFieldsById: (migrationAndTableId: MigrationAndTableId) => void;
  getMigrationTableDataById: (tableDataParameters: TableDataParameters) => void;
  setMigrationId: (migrationId: string) => void;
  setMigrationTableName: (tableName: string) => void;
  initMigrationStates: () => void;
}
