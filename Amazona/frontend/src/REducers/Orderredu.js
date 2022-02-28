
import { OrderLIST_Fail, OrderLIST_req, OrderLIST_Succes, Orderpay_Fail, Orderpay_req, OrderPay_Rest, Orderpay_Succes, Order_Fail, ORder_get_Fail, ORder_get_Req, ORder_get_Succ, Order_Req, Order_Rest, Order_Sucess } from "../constants/Orderconstnt";


export const orderreducer =(state={},action)=>{
  switch (action.type) {
      case Order_Req:
          return{
              loading:true,

          }
          case Order_Sucess:
              return{
                  loading:false,sucess:true,order:action.payload
              }
          case Order_Fail:
              return{
                  loading:false, sucess:false, error:action.payload
              }
          case Order_Rest:
              return{}
          
          
  
      default:
          return state;
  }


}
export const OrderdeatilReducer =(state={loading:true},action)=>{
    switch (action.type) {
        case ORder_get_Req:
            return{
                loading:true,
            
            }
        case ORder_get_Succ:
            return{
                loading:false,
                order:action.payload
            
            }
        case ORder_get_Fail:
            return{
                loading:false,
                error:action.payload
            
            }
        
            
            
    
        default:
            return state;
    }

}

export const OrderpayReducer =(state={},action)=>{
  switch (action.type) {
      case Orderpay_req:
        return{
            loading:true,

        }
        case Orderpay_Succes:
            return{
                loading:false,
               sucess:true
            }
       case Orderpay_Fail:
           return{
               loading:false,
               error:action.payload
           }
           case OrderPay_Rest:
               return{}
      default:
          return state
  }

}
export const OrderListreducer=(state={Orderlist:[]},action)=>{
    switch (action.type) {
        case OrderLIST_req:
            return{
                loading:true,}
                case OrderLIST_Succes:
                    return{
                        loading:false,
                       Orderlist:action.payload
                       
                    }
                    case OrderLIST_Fail:
                        return{
                            loading:false,
                            error:action.payload
                        }
    
        default:
            return state;
    }

}