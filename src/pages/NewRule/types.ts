import { RuleCategory, RuleRiskLevel } from 'store/dataRaptorRule/types';
import { Condition, LogicalOperator, Parenthesis } from 'store/dataRaptorRule/dto/rulesDto';

export interface Option {
  value: string;
  label: string;
  xsd_type?: string;
}

export interface RuleFormValues {
  ruleName: string;
  violationScore: number;
  description: string;
  category: RuleCategory;
  riskLevel: RuleRiskLevel;
  where: (Condition | LogicalOperator | Parenthesis)[];
}
