import express from 'express';
import http from "http"; // Built-in Node.js module
import { Server } from 'socket.io'
import cors from 'cors';

const PORT = process.env.NODE_ENV || 8000;

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

