import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from "redux-thunk";
import { CartReducer} from './REducers/Cartreducer';
import { OrderdeatilReducer, OrderListreducer, OrderpayReducer, orderreducer } from './REducers/Orderredu';
import { datailsProductReduer, productListreducer } from './REducers/ProductReducer';
import {Registerreducer, Userprofilereducer, UserprofileUpdate, UserSiginReducer } from './REducers/Userreducer';


const initialstate={
  UseSigin:{
    userInfo:localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')):null,

  },
  cart:{
    cartItems:localStorage.getItem('cartitems')?JSON.parse(localStorage.getItem('cartitems')):[],
    shipping:localStorage.getItem('Shippininfo')?JSON.parse(localStorage.getItem('Shippininfo')):'',
    paymentmethod:localStorage.getItem('payment')?JSON.parse(localStorage.getItem('payment')):''
  },
  
  
   
};

const reducer =combineReducers({
    produclist:productListreducer,
    Productdeatilas:datailsProductReduer,
    cart:CartReducer,
    UseSigin:UserSiginReducer,
    Register:Registerreducer,
    ordercreate:orderreducer,
    OrderDeat:OrderdeatilReducer,
    Payorder:OrderpayReducer,
    OrderList:OrderListreducer,
    Userprofile:Userprofilereducer,
    UserprofileUpdateStor:UserprofileUpdate
})
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
const store =createStore(reducer,initialstate,composeEnhancer(applyMiddleware(thunk)))

export default store