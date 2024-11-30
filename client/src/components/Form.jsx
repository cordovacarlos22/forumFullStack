import React, { useState } from 'react'
import { socket } from '../utils/socket';

const Form = () => {
  const [message, setMessage] = useState('');
  const [isloading, setLoading] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage(e.target.value);
    setLoading(true);
    // Simulate sending message
    socket.timeout(5000).emit('message', message, () => {

      setLoading(false);
    })

    setMessage('');
  }
  return (
    <>
      <h1>message:</h1>
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
    </>
  )
}

export default Form