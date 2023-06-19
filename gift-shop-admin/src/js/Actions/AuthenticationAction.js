import axios from "axios"
import { AdminLogoutRequest, AdminLogoutSuccess, GetAdminProfileFail, GetAdminProfileRequest, GetAdminProfileSuccess, LoginSliceFail, LoginSliceRequest, LoginSliceSuccess } from "../slice/AuthenticationSlice"



export const LoginAction = (email,password)=> async (dispatch)=>{

    try {
        dispatch(LoginSliceRequest())
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/login`,{email,password},{withCredentials:true,headers:{'Content-Type':"application/json"}})
        dispatch(LoginSliceSuccess(data))
    } catch (error) {
        console.log(error);
        dispatch(LoginSliceFail(error.response.data.message))
    }
}

export const GetAdminProfileAction = async (dispatch) =>{

    try {
        dispatch(GetAdminProfileRequest())
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user/profile`,{withCredentials:true})
        dispatch(GetAdminProfileSuccess(data))
    } catch (error) {
        console.log(error);
        dispatch(GetAdminProfileFail())
    }
}

export const AdminLogutAction = async (dispatch)=>{

    try {
        dispatch(AdminLogoutRequest())
        await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user/logout`,{withCredentials:true})
        dispatch(AdminLogoutSuccess())
    } catch (error) {
        console.log(error);
    }
}