import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk"; 
import NavbarSlice from "./js/slice/Navbarslice";
import DashSlice from "./js/slice/dashboardSlice";
import AuthSlice from "./js/slice/AuthenticationSlice";
import OrderSlice from "./js/slice/OrderSlice";
import CustomerSlice from "./js/slice/customerSlice";
import ProductReducer from "./js/slice/ProductSlice";


const reducer = combineReducers({
    NavbarState:NavbarSlice,
    DashState:DashSlice,
    AuthState:AuthSlice,
    OrderState:OrderSlice,
    CustomerState:CustomerSlice,
    ProductState:ProductReducer
})


const store = configureStore({
    reducer,
    middleware:[thunk],
    devTools:true
})



export default store;