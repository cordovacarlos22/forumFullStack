
import { socket } from '../utils/socket';




const ConnectionManager = ({ isConnected }) => {

  const handleConnect = () => {
    socket.connect();
  }

  const handleDisconnect = () => {
    socket.disconnect();
  }
  return (
    <>
      {isConnected ? (
        <>
          <button
            onClick={handleDisconnect}
          >Disconect Chat</button>
        </>
      ) : (
        <>
          <button
            onClick={handleConnect}
          >Start Chat</button >
        </>

      )}


    </>
  )
}

export default ConnectionManager