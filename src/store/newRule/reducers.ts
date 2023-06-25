import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import {
  setRuleName,
  setDescription,
  setViolationScore,
  setCategory,
  setRiskLevel,
  setDepartment,
  setWhere,
  resetAll,
} from './actions';
import { DepartmentType, RuleCategory, RuleRiskLevel } from 'store/dataRaptorRule/types';
import { RuleConditionComponentType } from 'store/dataRaptorRule/dto/rulesDto';
import { Condition, LogicalOperator, Parenthesis } from 'store/dataRaptorRule/dto/rulesDto';
import { NewRuleState } from './types';

export const initialState = {
  ruleName: '',
  violationScore: 0,
  category: RuleCategory.DataValidation,
  riskLevel: RuleRiskLevel.Medium,
  department: DepartmentType.Sales,
  description: '',
  where: [{ field: '', operator: '', value: '', type: RuleConditionComponentType.CONDITIONAL }],
};

const newRuleReducer = createSlice({
  name: 'new-rule',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<NewRuleState>): void => {
    builder.addCase(setRuleName, (state, { payload }) => {
      state.ruleName = payload;
    });

    builder.addCase(setDescription, (state, { payload }) => {
      state.description = payload;
    });

    builder.addCase(setViolationScore, (state, { payload }) => {
      state.violationScore = payload;
    });

    builder.addCase(setCategory, (state, { payload }) => {
      state.category = payload;
    });

    builder.addCase(setRiskLevel, (state, { payload }) => {
      state.riskLevel = payload;
    });

    builder.addCase(setDepartment, (state, { payload }) => {
      state.department = payload;
    });

    builder.addCase(setWhere, (state, { payload }) => {
      state.where = payload as (Condition | Parenthesis | LogicalOperator)[];
    });

    builder.addCase(resetAll, (state) => {
      return initialState;
    });
  },
});

export default newRuleReducer.reducer;
