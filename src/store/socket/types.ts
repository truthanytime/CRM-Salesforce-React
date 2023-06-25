import { Socket } from 'socket.io-client';

export interface SocketState {
  socket: Socket | any;
}

export interface SocketReturnHook extends SocketState {
  setSocket: (socket: Socket) => void;
}
