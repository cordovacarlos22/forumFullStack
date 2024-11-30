import React from 'react'

const ConnectionState = ({ isConnected }) => {
  return (
    <>
      {isConnected ? 'connected' : 'disconnected'}
    </>
  )
}

export default ConnectionState