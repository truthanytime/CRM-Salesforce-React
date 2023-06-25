export enum RuleConditionComponentType {
  CONDITIONAL = 'CO',
  LOGICAL_OPERATOR = 'LO',
  OPEN_PARENTHESIS = 'OP',
  CLOSED_PARENTHESIS = 'CP',
}

export interface RuleConditionComponent {
  type: RuleConditionComponentType;
}

export interface Condition extends RuleConditionComponent {
  field: string;
  operator: string;
  value: any;
  isValueField?: boolean;
}

export interface LogicalOperator extends RuleConditionComponent {
  value: string;
}

export type Parenthesis = RuleConditionComponent;

export interface JoinClause {
  type: string;
  table: string;
  condition: (Condition | LogicalOperator)[];
}

export interface RuleDto {
  table: string;
  join?: JoinClause[];
  where: (Condition | LogicalOperator | Parenthesis)[];
}
