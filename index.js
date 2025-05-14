import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { setupSocket } from "./socket.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

dotenv.config();
app.use(cors());
app.use(express.json());

// const mid = (req, res, next) => {
//   console.log("Middleware executed");
//   next();
// };
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
app.use("/api/auth", authRoutes);

setupSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
