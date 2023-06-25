import { RuleCategory, RuleRiskLevel } from '../types';
import { RuleDto } from './rulesDto';

export interface CreateDataRaptorRuleDto {
  table: string;
  name: string;
  rule: RuleDto;
  violationScore: number;
  description?: string;
  category: RuleCategory;
  riskLevel: RuleRiskLevel;
  frontEndObject: any;
  active?: boolean;
}
