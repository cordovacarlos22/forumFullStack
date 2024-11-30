import React from 'react'

const Event = ({ events }) => {
  return (
    <>
      <ul>
        {
          events.map((event, index) => (
            <li key={index}>{event.text}</li>
          ))
        }
      </ul>
    </>
  )
}

export default Event