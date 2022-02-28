import express from 'express';
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import data from '../data.js';
import User from '../Models/Usermodle.js';
import { generateToken, isAuth } from '../Utils.js';

const UserRoutes=express.Router();


UserRoutes.get('/seed',expressAsyncHandler(async(req,res)=>{
   const response = await User.insertMany(data.users)
    res.send(response)
}))

UserRoutes.post('/signin',expressAsyncHandler(async(req,res)=>{
      const user =  await User.findOne({email:req.body.email })
      if (user) {
          if(bcrypt.compareSync(req.body.password,user.password)){
              res.send({
                  _id:user._id,
                  name:user.name,
                  email:user.email,
                  isAdmin:user.isAdmin,
                  token:generateToken(user)
              })
              return;
          }          
      }
      res.status(401).send({message:'invalid user or password'})

}))

UserRoutes.post('/register',expressAsyncHandler(async(req,res)=>{
    const Newuser= new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8)
       

    })
    const createduser = await Newuser.save()

        
        res.send({
            _id:createduser._id,
            name:createduser.name,
            email:createduser.eamil,
            isAdmin:createduser.isAdmin,
            token:generateToken(createduser)
        })
    
    


}))

 UserRoutes.get('/:id',expressAsyncHandler(async(req,res)=>{
     const response = await User.findById(req.params.id)
     if (response) {
         res.send(response)
         
         
     }else{
         res.status(404).send({message:'User not found'})
     }

 }))


  UserRoutes.put('/profileupdate',isAuth,expressAsyncHandler(async(req,res)=>{
         const user= await User.findById(req.body.user)
         if (user) {
             
             user.name=req.body.name || user.name
             user.email=req.body.email || user.email
             user.password=bcrypt.hashSync(req.body.password,8)
             const userproupdated = await user.save()
       
             
             res.send({
                _id:userproupdated._id,
                name:userproupdated.name,
                email:userproupdated.email,
                isAdmin:userproupdated.isAdmin,
                token:generateToken(userproupdated)

             })
            

         }else{
             res.status(404).send({message:'invalid data'})
             res.status(11000).send(error.message)


         }




  }))







export default UserRoutes;