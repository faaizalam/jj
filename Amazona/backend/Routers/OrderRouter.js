import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Order from '../Models/Ordermodels.js';
import { isAuth } from '../Utils.js';

const Orderrouter = express.Router()


Orderrouter.get('/list',isAuth,expressAsyncHandler(async (req,res)=>{
    const response = await Order.find({user:req.user._id})
    res.send(response)


}))
   
Orderrouter.post('/',isAuth,expressAsyncHandler(async(req,res)=>{
     if (req.body.OrderItem.lenght===0) {
         res.status(400).send({message:'cart is Empty'})
         
     }else{
      
        const order = new Order({
            OrderItem:req.body.OrderItem,
            shipping:req.body.shipping,
            paymentmethod:req.body.paymentmethod,
            itemprice:req.body.itemprice,
            Shippingprice:req.body.Shippingprice,
            taxprice:req.body.taxprice,
            totalprice:req.body.totalprice,
            user:req.user._id
        

        })
        const createdorder= await order.save()
        res.status(201).send({message:'new created', order:createdorder})

     }

    }))

    Orderrouter.get('/:id',isAuth,expressAsyncHandler(async(req,res)=>{

        const responseorder = await Order.findById(req.params.id)
        if (responseorder) {
            res.status(201).send(responseorder)
            
        }else{
            res.status(404).send({message:'not found'})
        }


    }))


   Orderrouter.put('/:id/pay',isAuth,expressAsyncHandler(async(req,res)=>{
         const update= await Order.findById(req.params.id)
         if(update){
             update.isPaid=true;
             update.paidAt=Date.now()
             update.paymentresult={id:req.body.id,status:req.body.status,update_time:req.body.update_time,email_address:req.body.email}
             
             const saveupdate= await update.save()
            res.status(200).send({message:'update',update:saveupdate})
         }
         
         else{
             res.status(401).send({message:'not found'})
         }


   }))




export default Orderrouter;