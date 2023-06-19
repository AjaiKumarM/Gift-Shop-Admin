import { createSlice } from "@reduxjs/toolkit";

const NavbarSlice = createSlice({
  name: "navbar",
  initialState: {
    dashboard: false,
    product: false,
    orders: false,
    customers: false,
    navToogle: false,
    login: false,
    toastSuccessShow:false,
    toastDangerShow:false,
    toasteConetnt:''
  },
  reducers: {
    DashBoardChange(state, action) {
      return {
        dashboard: true,
      };
    },
    ProductMenuChange(state, action) {
      return {
        product: true,
      };
    },
    ordersMenuChane(state, action) {
      return {
        orders: true,
      };
    },
    CustommersMenuChane(state, action) {
      return {
        customers: true,
      };
    },
    LoginMenuChane(state, action) {
      return {
        login: true,
      };
    },
    NavTogglerChangeMenu(state, action) {
      return {
        ...state,
        navToogle: action.payload,
      };
    },
    ToastSuccessShow(state,action){
      return{
        ...state,
        toastSuccessShow:true,
        toasteConetnt:action.payload
      }
    },
    ToastDangerShow(state,action){
      return{
        ...state,
        toastDangerShow:true,
        toasteConetnt:action.payload
      }
    },
    ClearToastShow(state,action){
      return{
        ...state,
        toastDangerShow:false,
        toastSuccessShow:false,
        toasteConetnt:null
      }
    }
  },
});

const { actions, reducer } = NavbarSlice;

export const {
  DashBoardChange,
  ProductMenuChange,
  ordersMenuChane,
  CustommersMenuChane,
  NavTogglerChangeMenu,
  LoginMenuChane,
  ToastDangerShow,
  ToastSuccessShow,
  ClearToastShow
} = actions;

export default reducer;
