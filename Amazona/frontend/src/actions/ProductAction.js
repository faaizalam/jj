import  Axios  from "axios"
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCESS,PRODUCT_LIST_FAIL, PRODUCT_DEATIALS_REQUEST, PRODUCT_DEATIALS_SUCESS, PRODUCT_DEATIALS_FAIL } from "../constants/productconstant"

export const listproducts =()=> async(dispatch)=>{
    dispatch({
        type:PRODUCT_LIST_REQUEST
    })
    try {
        const { data }= await Axios.get('/postman/products');
        dispatch({
            type:PRODUCT_LIST_SUCESS , payload:data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAIL ,payload:error.message
        })
        
    }
}

export const detailsProducts=(ProductId)=> async(dispatch)=>{
    dispatch({
        type:PRODUCT_DEATIALS_REQUEST ,payload:ProductId
    })
    try {
        const {data}= await Axios.get(`/postman/products/${ProductId}`)
         dispatch({
             type:PRODUCT_DEATIALS_SUCESS, payload:data
         })
    } catch (err) {
        dispatch({
            type:PRODUCT_DEATIALS_FAIL,
             payload:err.response && err.response.data.message ? err.response.data.message: err.message,
        })
        
    }

}

