import { DepartmentType, RuleCategory, RuleRiskLevel } from 'store/dataRaptorRule/types';
import { Condition, LogicalOperator, Parenthesis } from 'store/dataRaptorRule/dto/rulesDto';
export interface NewRuleState {
  ruleName: string;
  description: string;
  violationScore: number;
  category: RuleCategory;
  riskLevel: RuleRiskLevel;
  department: DepartmentType;
  where: (Condition | Parenthesis | LogicalOperator)[];
}
