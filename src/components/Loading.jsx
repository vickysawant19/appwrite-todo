import React from 'react'

const Loading = () => {
  return (
    <div className='z-10 w-full h-screen absolute top-0 bg-gray-600/60 flex items-center justify-center text-white text-4xl font-semibold'>
      <div className=' rounded-full flex items-center justify-center gap-2 '>
       
        <div className='w-5 h-5 bg-white rounded-full animate-bounce delay-500 shadow-xl ' ></div>
        <div className='w-5 h-5 bg-white rounded-full animate-bounce delay-1000 shadow-xl'></div>
        <div className='w-5 h-5 bg-white rounded-full animate-bounce delay-100 shadow-xl'></div>
 
      </div>
    </div>
  )
}

export default Loading