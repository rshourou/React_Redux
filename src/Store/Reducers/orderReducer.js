import * as actionTypes from '../actionTypes'
const initialState={
    loading:false,
    orders:[],
    purchased:false, 
    error:null
}

const reducer =(state=initialState, action)=>{
    switch(action.type){
        case actionTypes.ORDER_STARTED:
            return {...state, loading:true}
        case actionTypes.ORDER_SUCCESS:
            return {...state, orders : state.orders.concat({id:action.orderId, ...action.orderData}),loading:false}     
        case actionTypes.ORDER_FAILED:
            return {...state, loading:false}


        case actionTypes.FETCH_ORDERS_START:
            return{...state, loading:true, error:null}
        case actionTypes.FETCH_ORDERS_SUCCEED:
            return {...state, loading:false, orders: action.orders, error:null}
        
        case actionTypes.FETCH_ORDERS_FAILED:
            return {...state, loading:false, error:action.error}
    }
    return state
}

export default reducer