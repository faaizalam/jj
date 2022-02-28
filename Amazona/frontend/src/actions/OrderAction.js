import  Axios  from "axios"
import { Cart_empty } from "../constants/Cartadditem"
import { OrderLIST_Fail, OrderLIST_req, OrderLIST_Succes, Orderpay_Fail, Orderpay_req, Orderpay_Succes, Order_Fail, ORder_get_Fail, ORder_get_Req, ORder_get_Succ, Order_Req, Order_Sucess } from "../constants/Orderconstnt"

export const createdorder =(order)=>async(dispatch,getState)=>{
    dispatch({
        type:Order_Req,
        payload:order
    })
    try{
        const {UseSigin:{userInfo}} =getState()
        const {data}= await Axios.post('/postman/orders',order,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type:Order_Sucess, payload:data.order
        })
        dispatch({
            type:Cart_empty
        })
        localStorage.removeItem('cartitems')
        
    } catch (error) {
        dispatch({
            type:Order_Fail,
            payload:error.response || error.message.response
        })
        
    }


}

export const Detailsorder=(id)=>async(dispatch,getState)=>{
    dispatch({
        type:ORder_get_Req,
        payload:id,
    
    })
    try {
        const {UseSigin:{userInfo}} =getState()
        const {data}  = await Axios.get(`/postman/orders/${id}`,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        })
         dispatch({
             type:ORder_get_Succ,
             payload:data
         })
    } catch (error) {
        dispatch({
            type:ORder_get_Fail,
            payload:error.message || error.data.message
        })
    }

}


export const updatepayment=(id,paymentresult)=>async(dispatch,getState)=>{
   
    dispatch({
        type:Orderpay_req,
        payload:{id,paymentresult}

    })
    try {
        const {UseSigin:{userInfo}}=getState()
        const {data}= await Axios.put(`/postman/orders/${id}/pay`,paymentresult,{
             headers:{
                 Authorization: `Bearer ${userInfo.token}`
             }
        })
        dispatch({
            type:Orderpay_Succes,
            payload:data.update
        })
        
    } catch (error) {
        dispatch({
            type:Orderpay_Fail,
            payload:error.message||error.data.message
        })
        
    }






}


export const OrderList=()=>async(dispatch,getState)=>{

    dispatch({
        type:OrderLIST_req
    })
    try {
        const {UseSigin:{userInfo}}=getState()
        const {data} = await Axios.get('/postman/orders/list',{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type:OrderLIST_Succes,
            payload:data
        })
        
    } catch (error) {
        
        dispatch({
            type:OrderLIST_Fail,
            payload:error.message ||error.data.message
    
        })
    }

}