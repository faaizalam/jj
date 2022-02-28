import jwt from 'jsonwebtoken'


export const generateToken=((user)=>{

   return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
    },process.env.JWT_SECRET || 'somethingsecret',{ expiresIn:'30s'})

})

 export const isAuth =(req,res,next)=>{
     const authorization=req.headers.authorization
     if (authorization) {
          const token =authorization.slice(7,authorization.length) 
         // Bearer xxxxxx  slice  method removse 7 word of start or gap Bearer is 6 and 1 is gap
         jwt.verify(token,process.env.JWT_SECRET || 'somethingsecret',(err,decode)=>{
             if (err) {
                 res.status(404).send({message:'invalid token'})
                 
             }else{
                 req.user=decode; 
                 next()
          // req.user is equal to decode which has all inform about user by verifying jwt and by using is
          // by using isAuth on orderrouter req.user_id or anything you want be filled
             }

         })
         
     }else{
         res.status(401).send({message:"no token"})
     }

 }