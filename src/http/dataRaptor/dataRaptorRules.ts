import { CreateDataRaptorRuleDto } from 'store/dataRaptorRule/dto/createRuleDto';
import { UpdateDataRaptorRuleDto } from 'store/dataRaptorRule/dto/updateRuleDto';

import { DataRaptorRule } from 'store/dataRaptorRule/types';
import { apiCall } from '../index';

export const createRule = (migrationId: string, data: CreateDataRaptorRuleDto): Promise<DataRaptorRule> =>
  apiCall({ method: 'post', url: `/dataRaptorRule/migration/${migrationId}/rule`, data });

export const getRulesByMigrationAndTable = (migrationId: string, table: string): Promise<DataRaptorRule[]> =>
  apiCall({ method: 'get', url: `/dataRaptorRule/migration/${migrationId}/table/${table}` });

export const deleteRuleById = (ruleId: string): Promise<void> =>
  apiCall({ method: 'delete', url: `/dataRaptorRule/rule/${ruleId}` });

export const updateRuleById = (ruleId: string, data: Partial<UpdateDataRaptorRuleDto>): Promise<DataRaptorRule> =>
  apiCall({ method: 'put', url: `/dataRaptorRule/rule/${ruleId}`, data });

export const getDataValidationViolatedMigrationTableDataById = (
  migrationId: string,
  tableId: string,
  skip: number,
  take: number,
): Promise<any[]> =>
  apiCall({
    method: 'get',
    url: `/dataRaptorRule/dataValidation/${migrationId}/table/${tableId}/dataValidationViolatedData?skip=${skip}&take=${take}`,
  });

export const getValidationViolatedDataTotalById = (migrationId: string, tableId: string): Promise<number> =>
  apiCall({
    method: 'get',
    url: `/dataRaptorRule/dataValidation/${migrationId}/table/${tableId}/dataValidationViolatedTotalData`,
  });
