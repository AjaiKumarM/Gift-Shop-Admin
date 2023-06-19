import axios from "axios"
import { GetDashBoardDetailsFail, GetDashBoardDetailsRequest, GetDashBoardDetailsSuccess } from "../slice/dashboardSlice"




export const DashboardAction =async (dispatch)=>{


    try {
        dispatch(GetDashBoardDetailsRequest())
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/dashboard`,{withCredentials:true})
        dispatch(GetDashBoardDetailsSuccess(data))
    } catch (error) {
        
        console.log(error);
        dispatch(GetDashBoardDetailsFail())
    }
}