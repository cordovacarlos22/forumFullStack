import React from 'react'

const ConnectionState = ({ isConnected }) => {

  return (
    <section
      className='flex  flex-col justify-center items-center  '
    >
      {isConnected ? (
        <div
          className=' border-2 border-green-500 p-2 rounded-xl  m-2'
        >
          <h1
            className='text-green-600'
          >connected</h1>
        </div>
      ) :
        <>

          <div
            className=' border-2 border-red-500 p-2 rounded-xl  m-2'
          >
            <h1
              className='text-red-600'
            >disconnect</h1>
          </div>

        </>
      }
    </section>
  )
}

export default ConnectionState