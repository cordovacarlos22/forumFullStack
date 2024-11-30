import React from 'react'

const Event = ({ events }) => {
  return (
    <div className='text-red'>
      <ul>
        {
          events.map((event, index) => (
            <li key={index}>{event}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Event