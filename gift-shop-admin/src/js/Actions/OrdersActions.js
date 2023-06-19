import axios from "axios"
import { OrderDetailFail, OrderDetailsRequest, OrderDetailsSuccess, OrderStatusUpdataSuccess, OrderStatusUpdateFail, OrderStatusUpdateRequest, SingleOrderFail, SingleOrderRequest, SingleOrderSuccess } from "../slice/OrderSlice"



export const OrderDetailsAction = async (dispatch)=>{

    try {
        dispatch(OrderDetailsRequest())
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/orders`,{withCredentials:true})
        dispatch(OrderDetailsSuccess(data))
    } catch (error) {
        console.log(error);
        dispatch(OrderDetailFail())
    }
}

export const SingleOrderAction =(id)=> async (dispatch) =>{

    try {
        dispatch(SingleOrderRequest())
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/single/order/${id}`,{withCredentials:true})
        dispatch(SingleOrderSuccess(data))
    } catch (error) {
        console.log(error)
        dispatch(SingleOrderFail(error))
    }
}

export const OrderStatusAction = (orderStatus,id) => async(dispatch)=>{
    try {
        dispatch(OrderStatusUpdateRequest())
        await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/admin/update/order/${id}`,{orderStatus},{withCredentials:true,headers:{'Content-Type':"application/json"}})
        dispatch(OrderStatusUpdataSuccess())
    } catch (error) {
        console.log(error);
        dispatch(OrderStatusUpdateFail())
    }
}