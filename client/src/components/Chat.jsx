import ConnectionManager from "./ConnectionManager";
import ConnectionState from "./ConnectionState";
import Event from "./Event";
import Form from "./Form";

import { socket } from "../utils/socket";
import { useState, useEffect, useContext } from "react";

import { ForumContext } from "../context/forum.context";

import LoadingSpinner from "./LoadingSpinner";

const Chat = () => {
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

  return loading ? (
    <>
      <LoadingSpinner /> {/* Loading spinner */}{" "}
      {/* Add your own loading spinner component here */}{" "}
      {/* For example: <LoadingSpinner /> */}{" "}
      {/* Replace LoadingSpinner with your own component */}{" "}
      {/* Remember to import the LoadingSpinner component in your Chat.jsx file */}{" "}
      {/* Replace 'LoadingSpinner' with the actual name of your loading spinner component */}{" "}
      {/* Make sure your loading spinner component is properly styled and responsive */}{" "}
      {/* Remember to include the necessary CSS styles in your Chat.jsx file to make the loading spinner component appear properly */}{" "}
      {/* Replace 'LoadingSpinner' with the actual CSS class name of your loading spinner component */}{" "}
      {/* Make sure your CSS styles are properly scoped and applied to your loading spinner component */}{" "}
      {/* Remember to import the CSS styles in your Chat.jsx file */}{" "}
      {/* Replace '.LoadingSpinner' with the actual CSS selector for your loading spinner component */}{" "}
      {/* Make sure your CSS styles are properly scoped and applied to your loading spinner component */}
    </>
  ) : (
    <>
      <aside className="bg-gray-800 rounded-lg mx-4 mt-10 p-6 flex flex-col w-full max-w-md min-h-[500px] shadow-lg">
  <header className="text-center mb-4">
    <h1 className="font-bold text-xl uppercase text-white">Forums Chat</h1>
  </header>

  <div className="mb-4">
    <ConnectionState isConnected={isConnected} />
  </div>

  <div className="flex-1 overflow-y-auto bg-gray-700 p-4 rounded-md mb-4">
    <Event events={events} />
  </div>

  <div className="mt-4">
    <Form isConnected={isConnected} />
  </div>

  <div className="mt-4">
    <ConnectionManager isConnected={isConnected} />
  </div>
</aside>
    </>
  );
};

export default Chat;
