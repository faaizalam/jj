import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Products from '../Models/ProduuctModels.js';


const ProRouter= express.Router();

ProRouter.get('/',expressAsyncHandler(async(req,res)=>{
    const creresponse = await Products.find({})
    res.send(creresponse)
    
}))

ProRouter.get('/seed',expressAsyncHandler(async(req,res)=>{
    const creresponse = await Products.insertMany(data.products)
    res.send(creresponse)
    
}))
ProRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const creresponse = await Products.findById(req.params.id)
   if (creresponse) {
       res.status(200).send(creresponse)
       
   }else{
       res.status(404).send({message:'product not found'})
   }
    
}))

export default ProRouter;

