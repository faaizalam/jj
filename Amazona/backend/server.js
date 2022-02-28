import express from 'express'
import mongoose  from 'mongoose'
import dotenv from 'dotenv'
import UserRoutes from './Routers/UserRouter.js'
import ProRouter from './Routers/ProductRouter.js'
import Orderrouter from './Routers/OrderRouter.js'
dotenv.config()
const app =express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const connect =mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/Amazonareact').then(()=>{
    console.log('connected');
}).catch((err)=>{
    console.log(err)

})


// app.get('/postman/products/:id',(req,res)=>{
//     const product= data.products.find((x)=>x._id===req.params.id)
//     if (product) {
//         res.send(product)
        
//     }else{
//         res.status(404).send({message:'product not found'})
//     }
// })
// app.get('/postman/products',(req,res)=>{
//     res.send(data.products)
// })
app.use('/postman/users',UserRoutes)
app.use('/postman/products',ProRouter)
app.use('/postman/orders',Orderrouter)
app.get('/postman/config/paypal',(req,res)=>{
   
    res.send(process.env.PAYPAL_CLEINT_ID||'sb')

})
 
  app.use((err,req,res,next)=>{
      res.status(500).send({message:err.message})
  })
  
 const port =process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);

})