import {configureStore,createSlice} from "@reduxjs/toolkit"
import LoginReducer from "./User/loginSlice"

export const store=configureStore({
    reducer:{
      login:LoginReducer
    },
})