import express from 'express';
import http from "http"; // Built-in Node.js module
import { Server } from 'socket.io'
import cors from 'cors';

const PORT = process.env.PORT || 3001

const app = express();

app.use(cors(
  { origin: "*" }
));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {

  // listen to the message that user send from frontend name message
  socket.on("user-message", (data) => {

    io.emit('server-message', data)


  })

})

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})

