
import ConnectionManager from './ConnectionManager';
import ConnectionState from './ConnectionState';
import Event from './Event';
import Form from './Form';

import { socket } from '../utils/socket'
import { useState, useEffect } from 'react';


const Chat = () => {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [events, setEvents] = useState([]);


  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)

    }

    const onDisconnect = () => {
      setIsConnected(false);
    }

    const onEvent = () => {
      setEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('message', onEvent);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onEvent);
    };

  }, [])


  return (
    <>
      <aside className='bg-indigo-300 rounded-md m-4 p-4 text-black '>
        <h1>Chat</h1>
        <ConnectionState isConnected={isConnected} />
        <Event events={['hola']} />
        <Form />
        <ConnectionManager isConnected={isConnected} />
      </aside>

    </>
  )
}

export default Chat