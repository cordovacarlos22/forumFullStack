import React from 'react'

const Event = ({ events }) => {
  return (
    
      events.map((event, index) => (
        <div key={index}>
          <strong>User:</strong> {event.user}
          <br />
          <strong>Message:</strong> {event.message}
          <br />
          <strong>Room:</strong> {event.room}
          <hr />
        </div>
      ))
    
  )
}

export default Event