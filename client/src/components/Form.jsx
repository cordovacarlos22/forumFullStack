import React, { useState } from 'react'
import { socket } from '../utils/socket';

const Form = ({ isConnected }) => {
  const [message, setMessage] = useState('');
  const [isloading, setLoading] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending message
    socket.timeout(5000).emit('user-message', { message }, () => {

      setLoading(false);
    })

    setMessage('');
  }
  return (
    <>

      {isConnected ? (
        <form onSubmit={handleSubmit}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text" name="message" />

          <button
            disabled={isloading}
            type="submit"

          >Send</button>
        </form>
      ) : null}

    </>
  )
}

export default Form