import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from '../../node_modules/react-router-dom/index'
import { detailsProducts } from '../actions/ProductAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Rating from '../components/Rating'


export default function Productscreen(props) {
    const navigate =useNavigate();
    const productdatils=useSelector(state=>state.Productdeatilas)
    const params =useParams()
    const {id:ProductId}=params
    const [qty,setqty] =useState(1)
    const disptach=useDispatch()
    const {loading,error,product}=productdatils;
    useEffect(()=>{
       disptach(detailsProducts(ProductId))
    },[disptach,ProductId])
    const Addtocart=(()=>{
        navigate(`/cart/${ProductId}?qty=${qty}`)
    })
   return(
    <div>
    {
        loading? (<LoadingBox></LoadingBox>): error?(
            <MessageBox error={error}></MessageBox>
        ):(
            <div>
            <div className="row">
                <div>
                 <a href='/'>back to screen</a>
                </div>
                <div className='col-2'>
                 <img className='large' src={product.image} alt={product.name}></img>
                </div>
                <div className='col-1'>
               <ul>
                   <li>
                       <h1>
                           {product.name}
                       </h1>
                   </li>
                   <li>
                       <Rating rating={product.rating} numReviews={product.numReviews} />
                   </li>
                   <li>
                     price:$ {product.price}
                   </li>
                   <li>
                    description:
                    <p>{product.description}</p>
                   </li>
               </ul>
                </div>
                <div className='col-1'>
                    <div className='cart carbody'>
                        <ul>
                            <li>
                                <div className='row'>
                                    <div>Price</div>
                                    <div>$ {product.price}</div>
 
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Status</div>
                                    <div>
                                        {product.countInStock>0?(
                                            <span className='sucess'> in stock</span>):(
                                                <span className='error'> unavailable</span>
                                            )
                                     }
                                    </div>
 
                                </div>
                            </li>
                            <li>
                                {product.countInStock > 0 &&
                                <li>
                                    <>
                                    <div>QTY</div>
                                    
                                    <select value={qty} onChange={(e)=>setqty(e.target.value)}>
                                        {

                                        [...Array(product.countInStock).keys()].map((x)=>(
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        ))
                                                }
                                    </select>
                                    
                                    
                                    </>

                                <button onClick={Addtocart} className='primary'>Add to cart</button>
                                </li>
                                
                            }

                            </li>
                        </ul>
 
                    </div>
 
                </div>
            </div>
        </div>

    
        )
    }
    </div>
      

  )
}
