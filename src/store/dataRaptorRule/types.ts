import { CreateDataRaptorRuleDto } from './dto/createRuleDto';
import { UpdateDataRaptorRuleDto } from './dto/updateRuleDto';

import { RuleDto } from './dto/rulesDto';

export enum RuleStatus {
  REQUESTED = 'requested',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum RuleCategory {
  DuplicateDetection = 'DuplicateDetection',
  // MissingDataDetection = 'MissingDataDetection',
  DataValidation = 'DataValidation',
}

export enum RuleRiskLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum DepartmentType {
  Sales = 'Sales',
  Marketing = 'Marketing',
  Finance = 'Finance',
  CustomerSuccess = 'CustomerSuccess',
  Others = 'Others',
}

export interface DataRaptorRule {
  ruleId: string;
  name: string;
  table: string;
  rule: RuleDto;
  description: string;
  frontEndObject: any;
  dataMigrationId: string;
  violationScore: number;
  status: RuleStatus;
  category: RuleCategory;
  riskLevel: RuleRiskLevel;
  statusDate: Date;
  active: boolean;
  violatedRowCount: number;
}

export interface DataRaptorRuleState {
  error: boolean | string;
  success: boolean | string;
  loading: boolean;
  deleteRuleByIdError: boolean | string;
  deleteRuleByIdSuccess: boolean | string;
  deleteRuleByIdLoading: boolean;
  updateRuleByIdError: boolean | string;
  updateRuleByIdSuccess: boolean | string;
  updateRuleByIdLoading: boolean;
  data: {
    createdRule?: DataRaptorRule;
    rulesByMigrationAndTable?: DataRaptorRule[];
    selectedRuleId?: string;
  };
}

export interface createRuleArgs {
  migrationId: string;
  rule: CreateDataRaptorRuleDto;
  onSuccess?: (rule: DataRaptorRule) => void;
  onError?: (error: any) => void;
}

export interface updateRuleArgs {
  ruleId: string;
  data: Partial<UpdateDataRaptorRuleDto>;
  onSuccess?: (rule: DataRaptorRule) => void;
  onError?: (error: any) => void;
}

export interface getRulesByMigrationAndTableArgs {
  migrationId: string;
  table: string;
  onSuccess?: (rule: DataRaptorRule[]) => void;
  onError?: (error: any) => void;
}

export interface deleteRuleByIdArgs {
  ruleId: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export interface DataRaptorReturnHook extends DataRaptorRuleState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  setLoading: (loading: boolean) => void;
  setSelectedRuleId: (ruleId: string) => void;
  createRule: (args: createRuleArgs) => void;
  updateRuleById: (args: updateRuleArgs) => void;
  getRulesByMigrationAndTable: (args: getRulesByMigrationAndTableArgs) => void;
  deleteRuleById: (args: deleteRuleByIdArgs) => void;
}
