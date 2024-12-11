
import { socket } from '../utils/socket';




const ConnectionManager = ({ isConnected }) => {

  const handleConnect = () => {
    socket.connect();
  }

  const handleDisconnect = () => {
    socket.disconnect();
  }
  return (
    <div className="flex justify-center gap-4">
    {isConnected ? (
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        onClick={handleDisconnect}
      >
        Disconnect Chat
      </button>
    ) : (
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        onClick={handleConnect}
      >
        Start Chat
      </button>
    )}
  </div>
  )
}

export default ConnectionManager