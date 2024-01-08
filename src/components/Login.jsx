import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, setUser } from '../features/user'
import { account } from '../appwrite/AppwriteConfig'
import { Link, useNavigate} from 'react-router-dom'

const Login = () => {
    

    const [loading , setLoading] = useState(false)

    const [userLogin, setUserLogin] = useState({
        email : '',
        password: ''
    }
    )

    

    const dispatch = useDispatch()
    const user = useSelector(getUser)
    
    const navigate = useNavigate()
    

    const loginUser = async () => {
        setLoading(true)
        try {
            const res = await account.createEmailSession(userLogin.email,userLogin.password)
            const userData = await account.get()
            dispatch(setUser(userData))
            
            navigate('/')
    
        } catch (error) {
            console.log(error)
            
            
        }
        setLoading(false)
    }

    const handleSubmit = async () =>{
       loginUser();
       
    }

    useEffect(()=>{
        if(user){
            navigate('/')
        }

    },[user])
  


  return (
    <>
    <Navbar/>
    {loading ? '' : <div className='flex items-start justify-center bg-purple-300 w-full h-screen'>
        
        <div className='w-96 bg-white shadow-xl mt-12 flex flex-col overflow-hidden rounded'>
            <h1 className='text-center text-white p-4 w-full text-2xl font-semibold bg-purple-800'>Login</h1>
           
           <div className=' flex flex-col m-2 rounded p-2'>
           <label 
           className=''
           htmlFor="email">Email</label>
           <input 
           className='outline-none border-b m-1 p-1 '
           value={userLogin.email}
           onChange={(e) => { setUserLogin({...userLogin, email : e.target.value})}}
           type="email"  
           id='email'/>
           <label 
           className=' mt-2'
           htmlFor="password">Password</label>
           <input 
           className='outline-none border-b m-1 p-1 '
           value={userLogin.password}
           onChange={(e) => { setUserLogin({...userLogin, password : e.target.value})}}
           type="password"  
           id='password'/>
           <button
           onClick={handleSubmit}
           className='p-2 w-full bg-purple-400 hover:bg-purple-500 mt-4 rounded'
           >Login</button>

           <h1 className='text-gray-700 mt-2'>
            Need a account? <span className='uppercase text-blue-700 font-semibold underline'><Link to={'/register'}>register here</Link></span>
           </h1>

           </div>
        </div>

    </div>}
    
    
    </>
  )
}

export default Login