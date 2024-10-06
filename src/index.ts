import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'
import { notepadHandler } from './handlers/notepad'

const app = express()

app.use(cors())

const server = http.createServer(app)

const ALLOWED_ORIGINS = process.env.HOST_URL ? process.env.HOST_URL.split(" ") : [];

const io = new Server(server, {
  cors: {
    origin: [...ALLOWED_ORIGINS, "http://localhost:5173"],
    methods: ["GET", "POST"]
  }
})

io.on('connection', (e: Socket) => {
  notepadHandler(e, io)
})

app.get('/', (req: express.Request, res: express.Response) => {
  res.send({
    message: 'Hello World!'
  })
})

const PORT = parseInt(process.env.PORT || '') || 5000

server.listen(PORT, () => console.log("Server running on " + PORT))
