import { useState } from 'react'
import { socket } from '../utils/socket';
import { useAuthContext } from "../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useContext } from "react";
import { ForumContext } from "../context/forum.context";

const Form = ({ isConnected }) => {
  const { userPayload } = useAuthContext()
  // const { firstName } = userPayload
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState("");



  const { filteredForums, loading } = useContext(ForumContext);

  const test = filteredForums.map(item => item.title);

  const rooms = test;
  const joinRoom = () => {
    // Simulate joining a room
    if (!room) {
      toast.error('Please select a room before proceeding.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      return;
    }
    if (room !== '') {
      socket.emit('join-room', room);
      toast.success(`you have join ${room}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      // setRoom('');
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);
    // Simulate sending message
    if (message === '' || !room) {
      toast.error('make sure message or room not empty', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      // setLoading(false);
      return;
    }
    socket.timeout(5000).emit('user-message', { user: `${userPayload.firstName}`, message, room }, () => {

      // setLoading(false);
    })

    setMessage('');
  }
  return (
    <>

      {isConnected ? (
        <>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label htmlFor="room" className="text-white">
        Room:
        <select
          name="room"
          id="room"
          value={room}
          className="block w-full mt-1 p-2 bg-gray-600 text-white rounded-md"
          onChange={(e) => setRoom(e.target.value)}
        >
          <option value="" disabled>Select a room</option>
          {rooms.map((room, index) => (
            <option key={index} value={`room ${room}`}>
              {room}
            </option>
          ))}
        </select>
      </label>

      <button
        className={`bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50`}
        type="button"
        onClick={joinRoom}
        disabled={!room}
      >
        Join Room
      </button>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        name="message"
        placeholder="Enter your message"
        className="p-2 bg-gray-600 text-white rounded-md"
      />

      <button
        className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        type="submit"
      >
        Send
      </button>
    </form>
          <ToastContainer />
        </>
      ) : null}

    </>
  )
}

export default Form