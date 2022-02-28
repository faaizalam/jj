/* eslint-disable default-case */
import { PRODUCT_DEATIALS_FAIL, PRODUCT_DEATIALS_REQUEST, PRODUCT_DEATIALS_SUCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCESS} from "../constants/productconstant";

export const productListreducer=(state={loading:true,product:[]},action)=>{
    switch(action.type){ 
        case PRODUCT_LIST_REQUEST:
        return{
            loading:true
        }
        case PRODUCT_LIST_SUCESS:
        return{
            loading:false,product:action.payload
        }
        case PRODUCT_LIST_FAIL:
            return{
                loading:false,error:action.payload
            }
            default:
                return state;
    }
}

export const  datailsProductReduer=(state={loading:true,product:{}},action)=>{

    switch(action.type){
        case PRODUCT_DEATIALS_REQUEST:
        return{
            loading:true
        }
        case PRODUCT_DEATIALS_SUCESS:
        return{
            loading:false ,product:action.payload
        }
        case PRODUCT_DEATIALS_FAIL:
        return{
            loading:false,error:action.payload
        }
        default:
            return state;
    }

}