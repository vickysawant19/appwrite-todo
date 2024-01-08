import { configureStore} from "@reduxjs/toolkit";
import todoReducer from '../features/todo.js'
import userReducer from '../features/user.js'


 export const store = configureStore ({
    reducer : {
        todos: todoReducer,
        user: userReducer,
    }
 }
 )