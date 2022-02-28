
import { User_Profile_FAil, User_Profile_Req, User_Profile_succ, User_Profile_Upadte_fail, User_Profile_Upadte_Req, User_Profile_Upadte_succ, User_RE_FAil, User_Re_Req, User_RE_succ, User_Sig_succ, User_Sing_FAil, User_Sing_OUT, User_Sing_Req } from "../constants/USercon";

export const Registerreducer = (state={},action)=>{
    switch (action.type) {
        case User_Re_Req:
            return{
                loading:true
            }
            case User_RE_succ:
                return{
                    loading:false,userInfo:action.payload
                }
                case User_RE_FAil:
                    return{
                        loading:false,error:action.payload
                    }
    
    
        default:
            return state
    }
}

















export const UserSiginReducer=(state={},action)=>{
    switch(action.type){
        case User_Sing_Req:
            return{
                loading:true
            }
        case User_Sig_succ:
            return{
                loading:false ,userInfo:action.payload
            }
        case User_Sing_FAil:
            return{
                loading:false ,error:action.payload
            }
            case User_Sing_OUT:
                return{}
            default:return state;
    }
}

export const Userprofilereducer =(state={loading:true},action)=>{
    switch (action.type) {
        case User_Profile_Req:
           return{
               loading:true
           }
           case User_Profile_succ:
               return{
                   loading:false,
                    Profile:action.payload
               }
               case User_Profile_FAil:
               return{
                   loading:false,
                   error:action.payload
               }
    
        default:
            return state;
    }

}

export const UserprofileUpdate =(state={},action)=>{
    switch (action.type) {
        case User_Profile_Upadte_Req:
        return{
            loading:true
        }
        case User_Profile_Upadte_succ:
        return{
         loading:false,
          ProfileUpdate:action.payload,
          sucess:true
        }
        case User_Profile_Upadte_fail:
        return{
            loading:false,
            error:action.payload
        }
    
        default:
            return state;
    }
}