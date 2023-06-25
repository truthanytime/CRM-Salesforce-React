import { apiCall } from '../index';

export const getOpenAISummaryforMigrationIdAndTableName = (migrationId: string, tableName: string): Promise<string> =>
  apiCall({ method: 'post', url: `/OpenAI/summary`, data: { migrationId, tableName } });
