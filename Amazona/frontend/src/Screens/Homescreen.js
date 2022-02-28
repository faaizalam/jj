import React ,{useEffect} from 'react'
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useDispatch, useSelector} from 'react-redux'
import { listproducts } from '../actions/ProductAction';


export default function Homescreen() {

    const productlist=useSelector(state=>state.produclist)
    const dispatch =useDispatch()
    const {loading,error,product}=productlist

    useEffect(()=>{
        dispatch(listproducts())
    },[dispatch])
    
 
   
    return (
        <div>
        {
            loading? (<LoadingBox></LoadingBox>): error?(
                <MessageBox  error={error}/>
            ):(

        <div class="product-cont">
          
              {
                product.map(product=>(
                  
                <Product key={product._id} product={product}/>

                ))
                }
               
           </div>
            )
        }
        </div>
    )
}
