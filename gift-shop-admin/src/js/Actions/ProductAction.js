import axios from "axios"
import { CreateProductFail, CreateProductRequest, CreateProductSuccess, ProductFail, ProductSuccess, ProductsRequest, SingleProductRequest, SingleProductSuccess, UpdateProductFail, UpdateProductRequest, UpdateProductSuccess } from "../slice/ProductSlice"




export const GetAllProductAction = async (dispatch)=>{

    try {
        dispatch(ProductsRequest())
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/all/products`,{withCredentials:true})
        dispatch(ProductSuccess(data))
    } catch (error) {
        
        console.log(error)
        dispatch(ProductFail())
    }
}

export const CreateProductAction = (formdata) => async(dispatch)=>{

    try {
        dispatch(CreateProductRequest())
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/product/create`,formdata,{withCredentials:true,headers:{"Content-Type":"multipart/form-data"}})
        dispatch(CreateProductSuccess(data))
    } catch (error) {
        console.log(error);

        dispatch(CreateProductFail())
    }
}

export const SingleProductAction = (id) => async(dispatch)=>{

    try {
        dispatch(SingleProductRequest())
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/product/${id}`,{withCredentials:true})
        dispatch(SingleProductSuccess(data))
    } catch (error) {
        
        console.log(error);

        dispatch(error)
    }
}

export const UpdateProductAction = (id,formdata) =>async(dispatch)=>{

    try {
        dispatch(UpdateProductRequest())
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/product/update/${id}`,formdata,{withCredentials:true,headers:{"Content-Type":"multipart/form-data"}})
        dispatch(UpdateProductSuccess(data))
    } catch (error) {
        
        console.log(error)

        dispatch(UpdateProductFail())
    }
}