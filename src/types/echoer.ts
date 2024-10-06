import type { Socket } from "socket.io";

export interface Echoer {
  id: string;
  name: string;
  socket: Socket;
  roomId: string;
}
