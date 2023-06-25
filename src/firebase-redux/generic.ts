import {
  ActionCreatorWithPayload,
  ActionReducerMapBuilder,
  createSlice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';

export interface GenericState<T> {
  loading: boolean | string;
  error: boolean | string;
  success: boolean | string;
  data: T | any;
  [key: string]: T | any;
}

export const createGenericSlice = <T, Reducers extends SliceCaseReducers<GenericState<T>>>({
  name = '',
  initialState,
  reducers,
  extraReducers,
}: {
  name: string;
  initialState: GenericState<T>;
  reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>;
  extraReducers: (builder: ActionReducerMapBuilder<NoInfer<GenericState<T>>>) => void;
}) => {
  return createSlice({
    name,
    initialState,
    reducers,
    extraReducers,
  });
};

export type GenericActions<T> = {
  setSuccess: ActionCreatorWithPayload<T | any, string>;
  setError: ActionCreatorWithPayload<string | boolean, string>;
  setLoading: ActionCreatorWithPayload<string | boolean, string>;
};
