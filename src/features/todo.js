import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { COLLECTION_ID,DB_ID,db } from "../appwrite/AppwriteConfig";
import { ID, Query } from 'appwrite'


const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    todos:  [],
    status: 'idle',
    error: null
}

 
export const fetchTodos = createAsyncThunk( 'posts/fetchTodos', async () => {
            try {
                   const { documents } = await db.listDocuments(DB_ID, COLLECTION_ID,[Query.orderDesc('$createdAt'),
                    Query.limit(200)]);

                return (documents)

            }
            catch(error){
                return error.message;

            }
            
        }

)

export const todoSlice = createSlice({
    name : 'todos',
    initialState,
    reducers: {

    },
    extraReducers(builder){
        builder
        .addCase(fetchTodos.pending, (state,action)=> {
                state.status = 'loading'
        })
        .addCase(fetchTodos.fulfilled, (state, action )=> {
            state.status = 'succeeded'
            state.todos = action.payload;
            
        })
        .addCase(fetchTodos.rejected, (state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })

}}
)


// console.log(todoSlice)

export const {} = todoSlice.actions

export const selectAllTodos = (state) => state.todos.todos;
export const getPostsStatus = (state) => state.todos.status;
export const getPostsError = (state) => state.todos.error;


export default todoSlice.reducer