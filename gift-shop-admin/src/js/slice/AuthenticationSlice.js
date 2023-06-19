import { createSlice } from "@reduxjs/toolkit";

const AuthenticationSlice = createSlice({
  name: "Authentication",
  initialState: {
    isAuthentication: false,
    isLoading: true,
    loading: false,
    userData: {},
    error: "",
    success:false
  },
  reducers: {
    LoginSliceRequest(state, action) {
      return {
        isAuthentication: false,
        loading: true,
      };
    },
    LoginSliceSuccess(state, action) {
      return {
        isAuthentication: true,
        loading: false,
        userData: action.payload.user,
      };
    },
    LoginSliceFail(state, action) {
      return {
        isAuthentication: false,
        loading: false,
        error: action.payload,
      };
    },
    ClearAuthError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    ClearUserData(state, action) {
      return {
        ...state,
        userData: {},
        success:false
      };
    },
    GetAdminProfileRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },
    GetAdminProfileSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        isAuthentication: true,
        userData: action.payload.user,
      };
    },
    GetAdminProfileFail(state, action) {
      return {
        ...state,
        isLoading: false,
        isAuthentication: false,
        loading: false,
        userData:{}
      };
    },
    AdminLogoutRequest(state,action){
        return{
            ...state,
            loading:true
        }
    },
    AdminLogoutSuccess(state,action){
        return{
            isLoading: false,
            isAuthentication: false,
            loading: false,
            success:true,
            userData:{}
        }
    }
  },
});

const { actions, reducer } = AuthenticationSlice;

export const {
  LoginSliceFail,
  LoginSliceRequest,
  LoginSliceSuccess,
  ClearUserData,
  GetAdminProfileFail,
  GetAdminProfileRequest,
  GetAdminProfileSuccess,
  AdminLogoutRequest,
  AdminLogoutSuccess
} = actions;

export default reducer;
