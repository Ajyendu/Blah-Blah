import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.PROD
  ? "https://lawerence-unbossed-wallace.ngrok-free.dev"
  : "https://lawerence-unbossed-wallace.ngrok-free.dev";

export const socket = io(SOCKET_URL, {
  auth: {
    token: localStorage.getItem("token"),
  },
  transports: ["websocket"],
  autoConnect: false,
});
