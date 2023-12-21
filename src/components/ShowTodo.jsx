import React, { useState } from 'react'
import { COLLECTION_ID, DB_ID, db } from '../appwrite/AppwriteConfig'

const ShowTodo = ({todo ,getData}) => {
    
    const [check, setCheck] = useState(false)

    async function handleDelete(e){
      e.preventDefault()
      try{
       await db.deleteDocument(DB_ID,COLLECTION_ID,todo.$id)
       getData()
      }
      catch(error){
        console.log(error);
      }
    }

   async function handleUpdate(e){
      setCheck(e.target.checked)
      await db.updateDocument(DB_ID,COLLECTION_ID,todo.$id,{
        completed:!todo.completed
      })
      getData()
    }

  return (
    <div className='w-full p-2 bg-violet-200 border hover:bg-violet-300 flex justify-between'>
        <div className={`${todo.completed ? 'line-through':''} overflow-clip line-clamp-2 uppercase font-semibold`}>
        {todo.body}
        </div>
        <div className='flex gap-2 items-center'> 
        <input 
        checked={todo.completed}
        className='font-extralight'
        onChange={handleUpdate}
        type="checkbox" name="completed" />

        <button 
        onClick={handleDelete}
        className='bg-red-600 text-white py-1 rounded-xl px-2 hover:scale-105'>Delete</button>
        </div>
        
  
    </div>
  )
}

export default ShowTodo