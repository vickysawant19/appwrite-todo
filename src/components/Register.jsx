import React, { useState } from 'react'
import { ID, account } from '../appwrite/AppwriteConfig'

import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [userForm,setUserForm] = useState({
        name: '',
        email: '',
        password: ''
    }) 


    const navigate = useNavigate()

    const createAcc = async () => {
       
        try {
            console.log(userForm);
            
             const res = await account.create(ID.unique(),userForm.email,userForm.password,userForm.name)
            console.log(res);
            navigate('/login')
        } catch (error) {
            console.log(error);
            
        }
         
    }

     function handleSubmit(e){
        e.preventDefault()
        createAcc()


    }

  return (
    <div className='flex items-start justify-center bg-purple-300 w-full h-screen'>
        
        <div className='w-96 bg-white shadow-xl mt-12 flex flex-col overflow-hidden rounded'>
            <h1 className='text-center text-white p-4 w-full text-2xl font-semibold bg-purple-800'>Register</h1>
           
           <form onSubmit={handleSubmit}>
           <div className=' flex flex-col m-2 rounded p-2'>
           <label 
           className=''
           htmlFor="text">Name</label>
           <input 
           className='outline-none border-b m-1 p-1 '
           value={userForm.name}
           required
           onChange={(e) => { setUserForm({...userForm, name : e.target.value})}}
           type="text"  
           id='name'/>
           <label 
           className=''
           htmlFor="email">Email</label>
           <input 
           className='outline-none border-b m-1 p-1 '
           value={userForm.email}
           required
           onChange={(e) => { setUserForm({...userForm, email : e.target.value})}}
           type="email"  
           id='email'/>
           <label 
           className=' mt-2'
           htmlFor="password">Password</label>
           <input 
           className='outline-none border-b m-1 p-1 '
           value={userForm.password}
           onChange={(e) => { setUserForm({...userForm, password : e.target.value})}}
           required
           minLength={8}
           type="password"  
           id='password'/>
           <button
           className='p-2 w-full bg-purple-400 hover:bg-purple-500 mt-4 rounded'
           >Register</button>

            <h1 className='text-gray-700 mt-2'>
            Already had a account? <span className='uppercase text-blue-700 font-semibold underline'><Link to={'/login'}>Login here</Link></span>
           </h1>
           </div>

          
           </form>

        </div>

    </div>
  )
}

export default Register