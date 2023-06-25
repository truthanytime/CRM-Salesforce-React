import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  createRule as createRuleApi,
  getRulesByMigrationAndTable as getRulesByMigrationAndTableApi,
  deleteRuleById as deleteRuleByIdApi,
  updateRuleById as updateRuleByIdApi,
} from 'http/dataRaptor/dataRaptorRules';
import {
  DataRaptorRule,
  createRuleArgs,
  deleteRuleByIdArgs,
  getRulesByMigrationAndTableArgs,
  updateRuleArgs,
} from './types';

const SET_ERROR = 'dataRaptorRule/SET_ERROR';
const SET_SUCCESS = 'dataRaptorRule/SET_SUCCESS';
const SET_LOADING = 'dataRaptorRule/GET_CONTACTS';
const SET_SELECTED_RULE_ID = 'dataRaptorRule/SET_SELECTED_RULE_ID';
const CREATE_RULE = 'dataRaptorRule/POST_RULE';
const UPDATE_RULE = 'dataRaptorRule/PUT_Rule';
const GET_RULES_BY_MIGRATION_AND_TABLE = 'dataRaptorRule/GET_RULES_BY_MIGRATION_AND_TABLE';
const DELETE_RULE_BY_ID = 'dataRaptorRule/DELETE_RULE_BY_ID';

export const setError = createAction<string | boolean>(SET_ERROR);
export const setSuccess = createAction<string | boolean>(SET_SUCCESS);
export const setLoading = createAction<boolean>(SET_LOADING);
export const setSelectedRuleId = createAction<string>(SET_SELECTED_RULE_ID);

export const deleteRuleById = createAsyncThunk<void, deleteRuleByIdArgs>(
  DELETE_RULE_BY_ID,
  async ({ ruleId, onSuccess, onError }) => {
    try {
      const rules = await deleteRuleByIdApi(ruleId);
      if (onSuccess) onSuccess();
      return rules;
    } catch (err) {
      if (onError) onError(err ?? undefined);
      throw err;
    }
  },
);

export const getRulesByMigrationAndTable = createAsyncThunk<DataRaptorRule[], getRulesByMigrationAndTableArgs>(
  GET_RULES_BY_MIGRATION_AND_TABLE,
  async ({ migrationId, table, onSuccess, onError }) => {
    try {
      const rules = await getRulesByMigrationAndTableApi(migrationId, table);
      if (onSuccess) onSuccess(rules);
      return rules;
    } catch (err) {
      if (onError) onError(err ?? undefined);
      throw err;
    }
  },
);

export const createRule = createAsyncThunk<DataRaptorRule, createRuleArgs>(
  CREATE_RULE,
  async ({ migrationId, rule, onSuccess, onError }) => {
    try {
      const createdRule = await createRuleApi(migrationId, rule);
      if (onSuccess) onSuccess(createdRule);
      return createdRule;
    } catch (err) {
      if (onError) onError(err ?? undefined);
      throw err;
    }
  },
);

export const updateRuleById = createAsyncThunk<DataRaptorRule, updateRuleArgs>(
  UPDATE_RULE,
  async ({ ruleId, data, onSuccess, onError }) => {
    try {
      const updatedRule = await updateRuleByIdApi(ruleId, data);
      if (onSuccess) onSuccess(updatedRule);
      return updatedRule;
    } catch (err) {
      if (onError) onError(err ?? undefined);
      throw err;
    }
  },
);
