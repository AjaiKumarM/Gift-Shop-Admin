import { createSlice } from "@reduxjs/toolkit";



const DashboardSlice = createSlice({
    name:"Dashboard",
    initialState:{
        penOrder:0,
        loading:false,
        outStock:0,
        user:0,
        order:[],
        totalEarnings:0
    },
    reducers:{


        GetDashBoardDetailsRequest(state,action){
            return{
                loading:true
            }
        },
        GetDashBoardDetailsSuccess(state,action){
            return{
                loading:false,
                penOrder:action.payload.penOrder,
                outStock:action.payload.stock,
                order:action.payload.order,
                user:action.payload.user,
                totalEarnings:action.payload.totalEarnings
            }
        },
        GetDashBoardDetailsFail(state,action){
            return{
                loading:false
            }
        }
    }
}) 

const {actions,reducer} = DashboardSlice;

export const {GetDashBoardDetailsFail,GetDashBoardDetailsRequest,GetDashBoardDetailsSuccess} = actions

export default reducer