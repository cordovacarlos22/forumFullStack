import express from 'express';
import http from "http"; // Built-in Node.js module
import { Server } from 'socket.io';
import cors from 'cors';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json()); // For parsing JSON request bodies

app.get("/", (req, res) => {
  res.send("Chat and Like Server is running");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// WebSocket Logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("like-toggled", ({ postId, newLikesCount }) => {
    console.log(`Broadcasting like update for post ${postId} with new count: ${newLikesCount}`);
    io.emit("likeUpdated", { postId, newLikesCount }); // Emit event to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  // Join a chat room (existing functionality)
  socket.on("join-room", (data) => {
    console.log(`User joined room: ${data}`);
    socket.join(data);
  });

  // Handle chat messages (existing functionality)
  socket.on("user-message", (data) => {
    console.log("Message received:", data);
    io.to(data.room).emit("server-message", data);
  });

  // Handle like toggling
  socket.on("like-toggled", ({ postId, newLikesCount }) => {
    console.log(`Post ${postId} updated with likes: ${newLikesCount}`);
    
    // Broadcast the updated like count to all connected clients
    io.emit("likeUpdated", { postId, newLikesCount });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});