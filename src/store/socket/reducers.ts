import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { setSocket } from './actions';
import { SocketState } from './types';

export const initialState: SocketState = {
  socket: undefined,
};

const slice = createSlice({
  name: 'socket',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<SocketState>): void => {
    builder.addCase(setSocket, (state, { payload }) => {
      state.socket = payload;
    });
  },
});
export const actions = slice.actions;
export default slice.reducer;
