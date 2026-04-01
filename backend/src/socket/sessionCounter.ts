import { Server } from "socket.io";

let activeSessionsCount = 0;

export const setupSessionCounter = (io: Server): void => {
  io.on("connection", (socket) => {
    activeSessionsCount += 1;
    io.emit("activeSessionsCount", activeSessionsCount);

    socket.on("disconnect", () => {
      activeSessionsCount = Math.max(0, activeSessionsCount - 1);
      io.emit("activeSessionsCount", activeSessionsCount);
    });
  });
};
