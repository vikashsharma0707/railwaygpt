import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext.jsx';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const url = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    const s = io(url, { auth: { token: localStorage.getItem('access') || '' }, transports: ['websocket','polling'] });
    setSocket(s);
    return () => s.close();
  }, [user?._id]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
export const useSocket = () => useContext(SocketContext);
