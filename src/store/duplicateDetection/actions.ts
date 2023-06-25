import { createAction } from '@reduxjs/toolkit';
import { DuplicateDetectionPageStatus } from './types';

const SET_ERROR = 'duplicateDetection/SET_ERROR';
const SET_SUCCESS = 'duplicateDetection/SET_SUCCESS';
const SET_LOADING = 'duplicateDetection/SET_LOADING';
const SET_MERGEMODAL_STATUS = 'duplicateDetection/SET_MERGEMODAL_STATUS';
const SET_PAGE_STATUS = 'duplicateDetection/SET_PAGE_STATUS';
const SET_ROWSPAGE_DATA = 'duplicateDetection/SET_ROWSPAGE_DATA';
const SET_MERGING_ROWS = 'duplicateDetection/SET_MERGING_ROWS';
const SET_MERGED_ROW = 'duplicateDetection/SET_MERGED_ROW';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

export const setLoading = createAction<boolean>(SET_LOADING);

export const setPageStatus = createAction<DuplicateDetectionPageStatus>(SET_PAGE_STATUS);

export const setMergeModalStatus = createAction<boolean>(SET_MERGEMODAL_STATUS);

export const setRowPageData = createAction<any[]>(SET_ROWSPAGE_DATA);

export const setMergingRows = createAction<any[]>(SET_MERGING_ROWS);

export const setMergedRow = createAction<any>(SET_MERGED_ROW);
