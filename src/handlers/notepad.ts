import { Socket } from "socket.io";
import { ClientEvents, type ClientToServerEvents, ServerEvents, type ServerToClientEvents } from "../types/events";
import { notepadService } from "../services/notepad";
import { type Echoer } from "../types/echoer";

export function notepadHandler(socket: Socket<ClientToServerEvents, ServerToClientEvents>) {
  console.log("New Client connected:", socket.id)

  socket.on(ClientEvents.INIT, ({name , roomId}) => {
    const echoer: Echoer = { id: socket.id, name, socket, roomId }
    notepadService.addEchoer(echoer)
    console.log("Echoer", socket.id, "named themselves", name)

    socket.join(roomId)
    console.log("Echoer", socket.id, "name", notepadService.getEchoerName(socket.id), "joined room", roomId)

    socket.to(roomId).emit(ServerEvents.JOINED, { name })
  })

  socket.on(ClientEvents.ECHO, ({ text }) => {
    console.log("Text typed by", notepadService.getEchoerName(socket.id))
    const echoer = notepadService.getEchoer(socket.id)

    if (echoer) {
      socket.to(echoer.roomId).emit(ServerEvents.REVERB, { text })
    }
  })

  socket.on('disconnect', () => {
    console.log("Echoer disconnected", notepadService.getEchoerName(socket.id))
    notepadService.removeEchoer(socket.id)
  })
}
