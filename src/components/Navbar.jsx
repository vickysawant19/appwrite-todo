import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, setUser } from '../features/user'
import { account } from '../appwrite/AppwriteConfig'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const user = useSelector(getUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogout = async () => {
    await account.deleteSession('current')
    dispatch(setUser(null))
    navigate('/login')
  }

  return (
         <>
         
          <div className='w-full z-50 bg-violet-400 flex items-center justify-between shadow-xl'> 
          <div className='flex max-w-screen-md items-center justify-between mx-auto w-full'>
          <h1 className='text-sm font-semibold text-white p-2 selection:bg-white bg-purple-900  border-2 rounded-full m-2 hover:bg-purple-800'>
              <span className='text-purple-300'>Todo</span>App
          </h1>
          <h1 className='text-lg mr-4'>{user &&'Welcome, '}
          <span className='capitalize font-semibold'>{user?.name}</span></h1>
          {user ? <button 
          onClick={handleLogout}
          className='mr-4 border p-2 text-sm rounded-full bg-red-600 text-white hover:scale-105'>Logout</button>:''}

          </div>
   
         
         </div>
         
         
         
    </>
  )
}

export default Navbar