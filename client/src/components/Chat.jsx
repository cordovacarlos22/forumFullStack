
import ConnectionManager from './ConnectionManager';
import ConnectionState from './ConnectionState';
import Event from './Event';
import Form from './Form';

import { socket } from '../utils/socket'
import { useState, useEffect,useContext } from 'react';

import { ForumContext } from "../context/forum.context";

import LoadingSpinner from './LoadingSpinner';


const Chat = () => {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [events, setEvents] = useState([]);

  const { loading } = useContext(ForumContext);




  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)

    }

    const onDisconnect = () => {
      setIsConnected(false);
      setEvents([]);
    }

    const onEvent = (data) => {
      console.log(data);
      setEvents(prev => [...prev, data]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('server-message', onEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('server-message', onEvent);
    };

  }, [])


  return (


    loading ? (
      <>
        <LoadingSpinner />  {/* Loading spinner */}  {/* Add your own loading spinner component here */}  {/* For example: <LoadingSpinner /> */}  {/* Replace LoadingSpinner with your own component */}  {/* Remember to import the LoadingSpinner component in your Chat.jsx file */}  {/* Replace 'LoadingSpinner' with the actual name of your loading spinner component */}  {/* Make sure your loading spinner component is properly styled and responsive */}  {/* Remember to include the necessary CSS styles in your Chat.jsx file to make the loading spinner component appear properly */}  {/* Replace 'LoadingSpinner' with the actual CSS class name of your loading spinner component */}  {/* Make sure your CSS styles are properly scoped and applied to your loading spinner component */}  {/* Remember to import the CSS styles in your Chat.jsx file */}  {/* Replace '.LoadingSpinner' with the actual CSS selector for your loading spinner component */}  {/* Make sure your CSS styles are properly scoped and applied to your loading spinner component */}
      </>) : (
      <>
        <aside className='bg-gray-700 rounded-md mx-8 mt-28 p-4  flex flex-col w-[400px] min-h-1/2  justify-center items-center '>

          <h1
            className='font-bold uppercase text-white'
          >Forums Chat</h1>
          <ConnectionState isConnected={isConnected} />

          <Form isConnected={isConnected} />
          <Event events={events} />
          <ConnectionManager isConnected={isConnected} />
        </aside>
      </>)
  )
}

export default Chat