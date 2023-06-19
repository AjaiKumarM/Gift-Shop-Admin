import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "Order",
  initialState: {
    loading: true,
    isLoading:false,
    success: false,
    totalOrders: 0,
    penOrders: 0,
    newOrders: 0,
    delOrders: 0,
    penOrdersList: [],
    singleOrder: {},
  },
  reducers: {
    OrderDetailsRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    OrderDetailsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        totalOrders: action.payload.totalOrders,
        penOrders: action.payload.penOrders,
        delOrders: action.payload.delOrders,
        newOrders: action.payload.newOrders,
        penOrdersList: action.payload.penOrdersList,
      };
    },
    OrderDetailFail(state, action) {
      return {
        ...state,
        loading: false,
      };
    },
    SingleOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    SingleOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        singleOrder: action.payload.order,
      };
    },
    SingleOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        singleOrder: {},
      };
    },
    OrderStatusUpdateRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },
    OrderStatusUpdataSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        success: true,
      };
    },
    OrderStatusUpdateFail(state, action) {
      return {
        ...state,
        isLoading: false,
        success: false,
      };
    },
    ClearOrderSuccess(state, action) {
      return {
        ...state,
        success: false,
      };
    },
  },
});

const { actions, reducer } = OrderSlice;
export const {
  OrderDetailFail,
  OrderDetailsRequest,
  OrderDetailsSuccess,
  SingleOrderFail,
  SingleOrderRequest,
  SingleOrderSuccess,
  OrderStatusUpdataSuccess,
  OrderStatusUpdateFail,
  OrderStatusUpdateRequest,
  ClearOrderSuccess,
} = actions;
export default reducer;
