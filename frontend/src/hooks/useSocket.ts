"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (): number => {
  const [sessionsCount, setSessionsCount] = useState(0);

  useEffect(() => {
    const socket: Socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000",
    );

    socket.on("activeSessionsCount", (count: number) => {
      setSessionsCount(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return sessionsCount;
};
