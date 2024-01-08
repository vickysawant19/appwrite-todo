import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
}

const loginUser = createAsyncThunk('/loginUser', ()=>{

})




export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload
        }

    }}
)

// console.log(userSlice)

export const {setUser} = userSlice.actions

export const getUser = (state) => state.user.user

export default userSlice.reducer