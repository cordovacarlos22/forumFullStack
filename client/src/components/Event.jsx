

const Event = ({ events }) => {
  return (
      events.map((event, index) => (
        <div
        key={index}
        className={`p-4 rounded-lg ${
          event.user === 'You' ? 'bg-blue-600 text-white self-end' : 'bg-gray-600 text-gray-200'
        }`}
      >
        <p className="font-bold">{event.user}:</p>
        <p>{event.message}</p>
        <p className="text-sm text-gray-400">Room: {event.room}</p>
      </div>
      ))
    
  )
}

export default Event