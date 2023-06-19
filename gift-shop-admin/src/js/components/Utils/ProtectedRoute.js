import { useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import {Navigate} from "react-router-dom"




export default function ProtectedRoute({children,admin}){
    const {isLoading,userData={},isAuthentication} = useSelector((state)=>state.AuthState)


    if(isLoading){
        return <Loader/>
    }
    if(!isAuthentication && !isLoading){
         return <Navigate to={'/admin/login'} />
    }
    if(isAuthentication){
        if(userData.role !== admin){
            return <Navigate to={'/admin/login'} />
        }

        return children
    }
}