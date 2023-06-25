import { useState, useCallback, useEffect } from 'react';
import { useDataRaptor } from 'store/dataRaptor/hooks';
import {
  Condition,
  LogicalOperator,
  Parenthesis,
  RuleConditionComponentType,
  RuleConditionComponent,
} from 'store/dataRaptorRule/dto/rulesDto';
import { useDataRaptorRule } from 'store/dataRaptorRule/hooks';
import { DataRaptorRule, RuleCategory, RuleRiskLevel, DepartmentType } from 'store/dataRaptorRule/types';
import { CreateDataRaptorRuleDto } from 'store/dataRaptorRule/dto/createRuleDto';
import { useNewRuleStore } from 'store/newRule/hook';

const useNewRule = () => {
  const {
    ruleName,
    violationScore,
    description,
    category,
    riskLevel,
    department,
    where,
    setRuleName,
    setViolationScore,
    setDescription,
    setCategory,
    setRiskLevel,
    setDepartment,
    setWhere,
    resetAll,
  } = useNewRuleStore();
  const { selectedTable, selectedMigration } = useDataRaptor();
  const { createRule, getRulesByMigrationAndTable } = useDataRaptorRule();

  const setFieldValue = useCallback(
    (variable: string, value: any) => {
      if (variable === 'where') {
        setWhere(value);
        return;
      }
      const varname = variable.replace('where', '').replaceAll('[', '').replaceAll(']', '').split('.');

      const index = Number(varname[0] as unknown);
      const field = varname[1];

      const updated = [...where];
      if (field) {
        updated[index] = {
          ...updated[index],
          [field]: value,
        };
      } else {
        updated.push(value);
      }
      setWhere(updated);
    },
    [where],
  );

  const createPostWherePayload = useCallback(
    (component: Condition | RuleConditionComponent | LogicalOperator) => {
      if (component.type === RuleConditionComponentType.CONDITIONAL) {
        const condition = component as Condition;
        if (!condition.field || !condition.operator || condition.value === null || condition.value === undefined) {
          throw new Error('Please fill all you open query inputs');
        }
        return {
          field: `${selectedTable}.${condition.field}`,
          operator: condition.operator,
          value: condition.isValueField ? `${selectedTable}.${condition.value}` : condition.value,
          isValueField: condition.isValueField,
          type: RuleConditionComponentType.CONDITIONAL,
        };
      } else {
        return component;
      }
    },
    [selectedTable],
  );

  const handleCreateOrUpdateRule = useCallback(() => {
    const data: CreateDataRaptorRuleDto = {
      name: ruleName,
      table: selectedTable,
      violationScore: violationScore,
      active: true,
      description: description,
      category: category,
      riskLevel: riskLevel,
      frontEndObject: {
        ruleName,
        violationScore,
        description,
        category,
        riskLevel,
        where,
      },
      rule: {
        table: selectedTable,
        where: where.map(createPostWherePayload),
      },
    };

    createRule({
      migrationId: selectedMigration,
      rule: data,
      onSuccess: (_data: DataRaptorRule) => {
        getRulesByMigrationAndTable({ migrationId: selectedMigration, table: selectedTable });
      },
    });
  }, [ruleName, selectedTable, violationScore, description, category, riskLevel, where, selectedMigration]);

  return {
    ruleName,
    violationScore,
    description,
    category,
    riskLevel,
    department,
    where,
    setRuleName,
    setViolationScore,
    setDescription,
    setCategory,
    setRiskLevel,
    setDepartment,
    setWhere,
    resetAll,

    handleCreateOrUpdateRule,
    setFieldValue,
  };
};

export default useNewRule;
