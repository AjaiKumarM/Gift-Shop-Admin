import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    totalProducts: 0,
    outofstock: 0,
    success: false,
    isLoading: false,
    singleProduct: {},
  },
  reducers: {
    ProductsRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    ProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        totalProducts: action.payload.productCount,
        outofstock: action.payload.outofstock,
      };
    },
    ProductFail(state, action) {
      return {
        ...state,
        loading: false,
      };
    },
    CreateProductRequest(state, actiōn) {
      return {
        ...state,
        loading: true,
      };
    },
    CreateProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        success: true,
      };
    },
    CreateProductFail(state, action) {
      return {
        ...state,
        loading: false,
        success: false,
      };
    },
    ClearProductSuccess(state, action) {
      return {
        ...state,
        success: false,
      };
    },
    SingleProductRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },
    SingleProductSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        singleProduct: action.payload.product,
      };
    },
    SingleProductFail(state, action) {
      return {
        ...state,
        isLoading: false,
        singleProduct: {},
      };
    },
    UpdateProductRequest(state,action){
        return{
            ...state,
            loading:true
        }
    },
    UpdateProductSuccess(state,action){
        return{
            ...state,
            loading:false,
            success:true
        }
    },
    UpdateProductFail(state,action){
        return{
            ...state,
            loading:false,
            success:false
        }
    }
  },
});

const { actions, reducer } = ProductSlice;

export const {
  ProductFail,
  ProductSuccess,
  ProductsRequest,
  ClearProductSuccess,
  CreateProductFail,
  CreateProductRequest,
  CreateProductSuccess,
  SingleProductFail,
  SingleProductRequest,
  SingleProductSuccess,
  UpdateProductFail,
  UpdateProductRequest,
  UpdateProductSuccess
} = actions;

export default reducer;
