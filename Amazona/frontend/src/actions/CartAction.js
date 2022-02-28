import  Axios  from "axios";
import { CART_ADD_ITEMS, CART_Delete_ITEMS } from "../constants/Cartadditem";
import { Payment_save, Shipping_save } from "../constants/Shipping";

export const ADDTOCART=(productId,qty)=>async(dispatch,getState)=>{
    const {data}= await Axios.get(`/postman/products/${productId}`)
    dispatch({
        type:CART_ADD_ITEMS,
        payload:{
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            product:data._id,
            qty

        }
    })
    localStorage.setItem('cartitems',JSON.stringify(getState().cart.cartItems))

}

export const  removeFromcart =((productid)=>(dispatch,getState)=>{
  dispatch({type:CART_Delete_ITEMS,payload:productid});
 localStorage.setItem('cartitems',JSON.stringify(getState().cart.cartItems))
})

 export const Saveshippng=((data)=>(dispatch,getState)=>{
   dispatch({
        type:Shipping_save,
       payload:data
    });
 localStorage.setItem('Shippininfo',JSON.stringify(data))

 })
 
 export const payments=(data)=>(dispatch)=>{

    dispatch({
        type:Payment_save,
        payload:data
    })
    localStorage.setItem('payment',JSON.stringify(data))

 }