import React from 'react'

const ConnectionState = ({ isConnected }) => {

  return (
    <section className="flex justify-center items-center">
    {isConnected ? (
      <div className="flex items-center bg-green-700 text-white px-4 py-2 rounded-md shadow-md">
        <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
        Connected
      </div>
    ) : (
      <div className="flex items-center bg-red-700 text-white px-4 py-2 rounded-md shadow-md">
        <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
        Disconnected
      </div>
    )}
  </section>
  )
}

export default ConnectionState