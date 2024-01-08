import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'

import { COLLECTION_ID, DB_ID, account, db } from './appwrite/AppwriteConfig'
import ShowTodo from './components/ShowTodo'
import { ID, Query } from 'appwrite'
import Loading from './components/Loading'

import { fetchTodos,selectAllTodos,getPostsError,getPostsStatus } from './features/todo.js'
import { useDispatch,useSelector } from 'react-redux'
import { getUser, setUser } from './features/user.js'
import { useNavigate } from 'react-router-dom'






function App() {


  
  const [todos ,setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const dispatch = useDispatch()

  const user = useSelector(getUser)
  
  
  const todosAll =  useSelector(selectAllTodos)
  const todosStatus =  useSelector(getPostsStatus)
  const todosError =  useSelector(getPostsError)
  // useEffect(()=>{
  //   getDataa();
    
  // },[todosStatus,dispatch,todos,todo])

  // const getDataa = () => {
  //   if(todosStatus === 'idle'){
  //     dispatch(fetchTodos())
  //   }
  

  // }

  const navigate = useNavigate()

  const getUserData = async () => {
   
    try {
      const userData = await account.get()
      dispatch(setUser(userData))
    } catch (error) {
      console.log(error);
      navigate('/login')
      
    }
    
  }

  useEffect(()=>{
    getUserData()
    
 
  },[])





  const getData = async () => {
   
    try {
      
        const { documents } = await db.listDocuments(DB_ID, COLLECTION_ID,[Query.orderDesc('$createdAt'),
                       Query.limit(200), Query.equal('userid',user?.$id)]);

      setTodos(documents)
    
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
   
  useEffect(() => {
    getData()
    console.log('here');
 
  }, [user]);
  
 

  async function handleClick(){
    if(todo){
      setTodo("");
      try{
        setIsLoading(true)
        await db.createDocument(DB_ID,COLLECTION_ID,ID.unique(),{
          body: todo,
          completed: false,
          userid: user.$id,
        })
         
        getData()

      }catch(error){
        console.error('Error creating document:', error);
      }finally{
        setIsLoading(false)
      }
  
    }
    
  }


  return (
    <>
      <Navbar/>
      {isLoading ?<Loading/>:""}
     
      <div className='bg-violet-300 flex items-center flex-col justify-center w-96 mx-auto mt-10 rounded-xl overflow-hidden shadow-xl'>
        <div className='w-full gap-4 flex items-center my-2 '>
        <input 
        value={todo}
           onChange={(e)=>setTodo(e.target.value)} 
          className=  ' text-xl p-2 outline-none ml-2 w-full rounded-xl' type="text"
          disabled={isLoading} />
         
        <button 
        onClick={handleClick}
        disabled={isLoading}
        className='mr-2 text-xl bg-green-800 rounded-xl px-4 py-2 text-white font-semibold hover:scale-105 '>Add</button>

        </div>
      {
        (todos?.map((todo, index) => (
          <ShowTodo key={todo.$id} todo={todo} getData={getData} setIsLoading={setIsLoading}
          />
        
)))
      }
      

      </div>
     
      
    </>
  )
}

export default App
