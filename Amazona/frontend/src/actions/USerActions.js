import  Axios  from "axios"
import { User_Profile_FAil, User_Profile_Req, User_Profile_succ, User_Profile_Upadte_fail, User_Profile_Upadte_Req, User_Profile_Upadte_succ, User_RE_FAil, User_Re_Req, User_RE_succ, User_Sig_succ, User_Sing_FAil, User_Sing_OUT, User_Sing_Req } from "../constants/USercon"

export const signin=({email,password})=>async(dispatch)=>{
    dispatch({type:User_Sing_Req,payload:{email,password}})
    try {

        const {data} =await Axios.post('/postman/users/signin',{email,password})
        dispatch({type:User_Sig_succ,payload:data})
        localStorage.setItem("userinfo", JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type:User_Sing_FAil,payload:
            error.reponse?error.reponse.data.message:error.message
            
        })
        
        
    }

}
export const RegisterAction=({name,email,password})=>async(dispatch)=>{
    dispatch({type:User_Re_Req,payload:{name,email,password}})
    try {

        const {data} =await Axios.post('/postman/users/register',{name,email,password})
        dispatch({type:User_RE_succ,payload:data})
        dispatch({type:User_Sig_succ,payload:data})
        localStorage.setItem("userinfo", JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type:User_RE_FAil,payload:
            error.reponse?error.reponse.data.message:error.message
            
        })
        
        
    }

}
export const signout=()=>(dispatch)=>{
    dispatch({type:User_Sing_OUT})
    localStorage.removeItem('userinfo')
    localStorage.removeItem('cartitems')

}

export const userProfileAction=(id)=>async(dispatch,getState)=>{
    
    dispatch({
        type:User_Profile_Req,
        payload:id
    })
    try {
        const {UseSigin:{userInfo}}=getState()
        const {data}= await Axios.get(`/postman/users/${id}`,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`

            }
            
        })
        dispatch({
            type:User_Profile_succ,
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:User_Profile_FAil,
            payload:error.message|| error.data.message
        })
        
    }


}


export const Updateprofile=(updated)=>async(dispatch,getState)=>{
   dispatch({
       type:User_Profile_Upadte_Req,
       payload:updated
   })
   try {
       const {UseSigin:{userInfo}}=getState()
       const {data} =await Axios.put('/postman/users/profileupdate',updated,{
           headers:{
               Authorization: `Bearer ${userInfo.token}`
           }
        })
        dispatch({
            type:User_Profile_Upadte_succ,
            payload:data,
        })
   } catch (error) {

      dispatch({
          type:User_Profile_Upadte_fail,
          payload:error.message|| error.data.message
      })
       
   }
    

}