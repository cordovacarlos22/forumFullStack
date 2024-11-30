import { io } from 'socket.io-client'

const url = import.meta.env.VITE_CHAT_API_URL; // chat api url 

export const socket = io(url, {
  autoConnect: false
})