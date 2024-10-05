import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on('connection', (socket) => {
  console.log('echoer connected', socket.id)

  socket.on('update', (data: string) => {

  })

  socket.on('disconnect', () => console.log('echoer disconnected'))

  // setInterval(() => {
  //   socket.emit('update', "typing... ")
  // }, 2500)
})

server.listen(5000, () => console.log("Server running"))
