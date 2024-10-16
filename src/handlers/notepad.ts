import { Server, Socket } from "socket.io";
import { ClientEvents, type ClientToServerEvents, ServerEvents, type ServerToClientEvents } from "../types/events.ts";
import { notepadService } from "../services/notepad.ts";
import { type Echoer } from "../types/echoer.ts";

export function notepadHandler(socket: Socket<ClientToServerEvents, ServerToClientEvents>, io: Server) {
  console.log("New Client connected:", socket.id)

  socket.on(ClientEvents.INIT, ({name , roomId}) => {
    const echoer: Echoer = { id: socket.id, name, socket, roomId }
    notepadService.addEchoer(echoer)
    console.log("Echoer", socket.id, "named themselves", name)

    socket.join(roomId)
    console.log("Echoer", socket.id, "name", notepadService.getEchoerName(socket.id), "joined room", roomId)

    io.to(roomId).emit(ServerEvents.JOINED, { name, members: notepadService.getEchoersNames(roomId) })
  })

  socket.on(ClientEvents.ECHO, ({ text }) => {
    console.log("Text typed by", notepadService.getEchoerName(socket.id))
    const echoer = notepadService.getEchoer(socket.id)

    if (echoer) {
      socket.to(echoer.roomId).emit(ServerEvents.REVERB, { text })
    }
  })

  socket.on(ClientEvents.LEAVE, ({ name, roomId }) => {
    console.log("Echoer", socket.id, name, "left room", roomId)
    notepadService.removeEchoer(socket.id)
    socket.leave(roomId)

    io.to(roomId).emit(ServerEvents.LEFT, { name, members: notepadService.getEchoersNames(roomId) })
  })

  socket.on('disconnect', () => {
    const name = notepadService.getEchoerName(socket.id)
    console.log("Echoer", name, "disconnected")

    const roomId = notepadService.getEchoer(socket.id)?.roomId
    notepadService.removeEchoer(socket.id)

    if (roomId) {
      socket.leave(roomId)
      io.to(roomId).emit(ServerEvents.LEFT, { name, members: notepadService.getEchoersNames(roomId) })
    }
  })
}
