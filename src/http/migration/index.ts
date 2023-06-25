import { Migration, MigrationTable, TableField } from 'store/migration/types';
import { apiCall } from '../index';

export const getUserMigrations = (): Promise<Migration[]> => apiCall({ method: 'get', url: '/dataMigration' });

export const getMigrationById = (migrationId: string): Promise<Migration> =>
  apiCall({ method: 'get', url: `/dataMigration/${migrationId}` });

export const postMigration = (dataSourceId: string): Promise<Migration> =>
  apiCall({ method: 'post', url: `/dataMigration/`, data: { dataSourceId: dataSourceId } });

export const deleteMigrationById = (migrationId: string): Promise<Migration> =>
  apiCall({ method: 'get', url: `/dataMigration/${migrationId}` });

export const getMigrationTablesById = (migrationId: string): Promise<MigrationTable[]> =>
  apiCall({ method: 'get', url: `/dataMigration/${migrationId}/tables` });

export const getMigrationTableFieldsById = (migrationId: string, tableId: string): Promise<TableField[]> =>
  apiCall({ method: 'get', url: `/dataMigration/${migrationId}/table/${tableId}/fields` });

export const getMigrationTableDataById = (
  migrationId: string,
  tableId: string,
  skip: number,
  take: number,
): Promise<any[]> =>
  apiCall({ method: 'get', url: `/dataMigration/${migrationId}/table/${tableId}/data?skip=${skip}&take=${take}` });

export const getMigrationTableTotalDataCount = (migrationId: string, tableId: string): Promise<number> =>
  apiCall({ method: 'get', url: `/dataMigration/${migrationId}/table/${tableId}/totalCounts` });

export const updateRecordOnMigrationTable = (migrationId: string, tableId: string, data: any[]) =>
  apiCall({
    method: 'post',
    url: `/dataMigration/${migrationId}/table/${tableId}/recordUpdate`,
    data: { updates: data },
  });

export const getBookmarkedTableData = (migrationId: string, tableId: string): Promise<any[]> =>
  apiCall({ method: 'get', url: `/dataMigration/${migrationId}/table/${tableId}/bookmarkedTotal` });
