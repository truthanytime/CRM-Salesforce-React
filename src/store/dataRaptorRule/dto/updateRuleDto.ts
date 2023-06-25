import { RuleDto } from './rulesDto';

export interface UpdateDataRaptorRuleDto {
  name: string;
  rule: RuleDto;
  violationScore: number;
  description?: string;
  frontEndObject: any;
  active?: boolean;
}
