const SET_SOCKET = 'socket/SET_SOCKET';
import { createAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

export const setSocket = createAction<Socket>(SET_SOCKET);
