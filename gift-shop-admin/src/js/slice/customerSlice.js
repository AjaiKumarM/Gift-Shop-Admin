import { createSlice } from "@reduxjs/toolkit";




const CustomerSlice = createSlice({
    name:"customer",
    initialState:{
        loading:false,
        totalUsers:0,
        newUsers:0,
        Users:[]
    },
    reducers:{
        GetAllUserRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        GetAllUserSuccess(state,action){
            return{
                ...state,
                loading:false,
                totalUsers:action.payload.count,
                newUsers:action.payload.newUser,
                Users:action.payload.AllUser
            }
        },
        GetAllUserFail(state,action){
            return{
                ...state,
                loading:false
            }
        }
    }
})

const {actions,reducer} = CustomerSlice

export const {GetAllUserFail,GetAllUserRequest,GetAllUserSuccess} = actions

export default reducer