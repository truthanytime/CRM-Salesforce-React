import { createAction } from '@reduxjs/toolkit';
import { Condition, LogicalOperator, Parenthesis } from 'store/dataRaptorRule/dto/rulesDto';
import { DepartmentType, RuleCategory, RuleRiskLevel } from 'store/dataRaptorRule/types';

const RESET_ALL = 'newRule/RESET_ALL';
const SET_ERROR = 'newRule/SET_ERROR';
const SET_SUCCESS = 'newRule/SET_SUCCESS';
const SET_LOADING = 'newRule/SET_LOADING';
const SET_RULE_NAME = 'newRule/SET_RULE_NAME';
const SET_DESCRIPTION = 'newRule/SET_DESCRIPTION';
const SET_VIOLATION_SCORE = 'newRule/SET_VIOLATION_SCORE';
const SET_CATEGORY = 'newRule/SET_CATEGORY';
const SET_RISK_LEVEL = 'newRule/SET_RISK_LEVEL';
const SET_DEPARTMENT = 'newRule/SET_DEPARTMENT';
const SET_WHERE = 'newRule/SET_WHERE';

export const setError = createAction<boolean>(SET_ERROR);

export const setSuccess = createAction<boolean>(SET_SUCCESS);

export const setLoading = createAction<boolean>(SET_LOADING);

export const setViolationScore = createAction<number>(SET_VIOLATION_SCORE);

export const setRuleName = createAction<string>(SET_RULE_NAME);

export const setDescription = createAction<string>(SET_DESCRIPTION);

export const setCategory = createAction<RuleCategory>(SET_CATEGORY);

export const setRiskLevel = createAction<RuleRiskLevel>(SET_RISK_LEVEL);

export const setDepartment = createAction<DepartmentType>(SET_DEPARTMENT);

export const setWhere = createAction<(Condition | Parenthesis | LogicalOperator)[]>(SET_WHERE);

export const resetAll = createAction(RESET_ALL);
