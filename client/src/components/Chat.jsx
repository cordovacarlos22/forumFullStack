import ConnectionManager from "./ConnectionManager";
import ConnectionState from "./ConnectionState";
import Event from "./Event";
import Form from "./Form";

import { socket } from "../utils/socket";
import { useState, useEffect, useContext } from "react";

import { ForumContext } from "../context/forum.context";

import LoadingSpinner from "./LoadingSpinner";

const Chat = ({ isOpen, onClose }) => {
  
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [events, setEvents] = useState([]);

  const { loading } = useContext(ForumContext);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setEvents([]);
    };

    const onEvent = (data) => {
      console.log(data);
      setEvents((prev) => [...prev, data]);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("server-message", onEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("server-message", onEvent);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <aside className="fixed top-[4.5rem] right-0 bg-gray-800 rounded-lg mx-4 mt-10 p-6 flex flex-col w-full max-w-md min-h-auto shadow-lg z-50 ">
          <header className="text-center mb-4">
            <h1 className="font-bold text-xl uppercase text-white">
              Forums Chat
            </h1>
          </header>

          <div className="mb-4">
            <ConnectionState isConnected={isConnected} />
          </div>
          {isConnected ? (
          <div className="flex-1 overflow-y-auto bg-gray-700 p-4 rounded-md mb-4 max-h-[250px]">
            <Event events={events} />
          </div>

          ) : ('')}

          <div className="mt-4">
            <Form isConnected={isConnected} />
          </div>

          <div className="mt-4">
            <ConnectionManager isConnected={isConnected} />
          </div>

          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 bg-blue-800 rounded-full px-2 py-1 hover:bg-blue-600"
          >
            Close chat
          </button>
        </aside>
      )}
    </>
  );
};

export default Chat;
