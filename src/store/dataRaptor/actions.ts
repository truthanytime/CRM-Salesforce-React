import { createAction } from '@reduxjs/toolkit';
import { FilterIndex } from './types';

const SET_ERROR = 'dataRaptor/SET_ERROR';
const SET_SUCCESS = 'dataRaptor/SET_SUCCESS';
const UPDATE_CONFIDENCE_SCORE_SECTION_STATE = 'dataRaptor/UPDATE_CONFIDENCE_SCORE_SECTION_STATE';
const UPDATE_PAGE_STATUS = 'dataRaptor/UPDATE_PAGE_STATUS';
const ADD_FILTER = 'dataRaptor/ADD_FILTER';
const REMOVE_FILTER = 'dataRaptor/REMOVE_FILTER';
const SET_FILTER = 'dataRaptor/SET_FILTER';
const SET_PAGE_INDEX = 'dataRaptor/SET_PAGE_INDEX';
const SET_PAGE_SIZE = 'dataRaptor/SET_PAGE_SIZE';
const SET_TOTAL_DATA_COUNT = 'dataRaptor/SET_TOTAL_DATA_COUNT';
const SET_ROWS_PER_PAGE = 'dataRaptor/SET_ROWS_PER_PAGE';
const SET_FIELDS = 'dataRaptor/SET_FIELDS';
const SET_SELECTED_MIGRATION = 'dataRaptor/SET_SELECTED_MIGRATION';
const INIT_STATES = 'dataRatpr/INIT_STATES';
const SET_SELECTED_TABLE = 'dataRaptor/SET_SELECTED_TABLE';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const setSelectedTable = createAction<string>(SET_SELECTED_TABLE);

export const setSelectedMigration = createAction<string>(SET_SELECTED_MIGRATION);

export const updateConfidenceScoreSectionState = createAction(UPDATE_CONFIDENCE_SCORE_SECTION_STATE);

export const updatePageStatus = createAction<string>(UPDATE_PAGE_STATUS);

export const addFilter = createAction<FilterIndex>(ADD_FILTER);

export const removeFilter = createAction<{ name: string; type: string }>(REMOVE_FILTER);

export const setFilter = createAction<{ name: string; operator: string; compare: string }>(SET_FILTER);

export const setPageIndex = createAction<number>(SET_PAGE_INDEX);

export const setPageSize = createAction<number>(SET_PAGE_SIZE);

export const setTotalDataCount = createAction<number>(SET_TOTAL_DATA_COUNT);

export const setRowsPerPage = createAction<number[]>(SET_ROWS_PER_PAGE);

export const setFields = createAction<FilterIndex[]>(SET_FIELDS);

export const initStates = createAction(INIT_STATES);
