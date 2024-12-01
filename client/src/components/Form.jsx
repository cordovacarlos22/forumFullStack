import { useState } from 'react'
import { socket } from '../utils/socket';
import { useAuthContext } from "../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = ({ isConnected }) => {
  const { userPayload } = useAuthContext()
 // const { firstName } = userPayload
  const [message, setMessage] = useState('');
  const [isloading, setLoading] = useState(false);
  const [room, setRoom] = useState("");

  const rooms = ["Room 1", "Room 2", "Room 3"];
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
    setLoading(true);
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
      setLoading(false);
      return;
    }
    socket.timeout(5000).emit('user-message', { user: `${userPayload.firstName}`, message, room }, () => {

      setLoading(false);
    })

    setMessage('');
  }
  return (
    <>

      {isConnected ? (
        <>
          <form
            className='flex flex-col gap-4'
            onSubmit={handleSubmit}>

            <label htmlFor="room">Room:


              <select
                name="room"
                id="room"
                value={room}
                default=''
                onChange={(e) => setRoom(e.target.value)}
              >
                <option value="" disabled>Select a room</option>
                {rooms.map((room, index) => (
                  <option key={index} value={`room  ${index + 1}`}>
                    {room}
                  </option>
                ))}
              </select>
            </label>
            <button
              className='bg-blue-500'
              type="button"
              onClick={joinRoom}
              disabled={!room}>Join Room</button>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              name="message"
              placeholder='Enter  your message:'
            />

            <button
              // disabled={isloading || !room}
              type="submit"

            >Send</button>
          </form>
          <ToastContainer />
        </>
      ) : null}

    </>
  )
}

export default Form