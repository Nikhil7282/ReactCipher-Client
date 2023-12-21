import { createSlice } from "@reduxjs/toolkit"

const initialState={
    username:"",
    isLoggedIn:false,
}

const loginSlice=createSlice({
    name:"userLogin",
    initialState,
    reducers:{
        loggedIn:(state,payload)=>{
            state.username=payload.username
            state.isLoggedIn=true
        },
        logout:(state)=>{
            state.username=""
            state.isLoggedIn=false
        }
    }
})
export const {loggedIn,logout}=loginSlice.actions

export default loginSlice.reducer