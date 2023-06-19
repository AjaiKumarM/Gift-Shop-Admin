import axios from "axios"
import { GetAllUserFail, GetAllUserRequest, GetAllUserSuccess } from "../slice/customerSlice"




export const GetAllUserAction = async(dispatch)=>{
    try {
        dispatch(GetAllUserRequest())
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/all/profile`,{withCredentials:true})
        dispatch(GetAllUserSuccess(data))
    } catch (error) {
        console.log(error)

        dispatch(GetAllUserFail())
    }
}