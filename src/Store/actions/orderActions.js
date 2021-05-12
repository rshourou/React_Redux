import * as actionTypes from '../actionTypes'
import axios from '../../axios-order'



export const order_start=()=>{
    return {type: actionTypes.ORDER_STARTED}
}
export const order_success=(orderData,id)=>{
    return {type: actionTypes.ORDER_SUCCESS, orderData:orderData, orderId:id} 
}

export const order_failed=()=>{
    return {type: actionTypes.ORDER_FAILED} 
}
export const place_order=(orderData, token)=>{
    return dispatch =>{
        dispatch(order_start())
        axios.post('/orders.json?auth='+token, orderData).then(response=>{ 
            dispatch(order_success(response.data, orderData.name))  

        }).catch(error=>dispatch(order_failed()))

    }
}

export const fetch_orders_start=()=>{
    return {type:actionTypes.FETCH_ORDERS_START}
}
export const fetch_orders_failed=(error)=>{
    return {type: actionTypes.FETCH_ORDERS_FAILED, error:error}
}

export const fetch_orders_succeed=(fetchedOrders)=>{
    return {type: actionTypes.FETCH_ORDERS_SUCCEED, orders:fetchedOrders}   
}

export const fetch_orders=(token)=>{
    return dispatch =>{
        dispatch(fetch_orders_start())
        
        let fetchedOrders=[]
        axios.get('/orders.json?auth='+token).then(response=>{
            for(let key in response.data){
                console.log("orders:"+response.data)
                fetchedOrders.push({...response.data[key], id:key})
            }
            dispatch(fetch_orders_succeed(fetchedOrders))
        } )
        .catch(err=>dispatch(fetch_orders_failed(err.response.data.error)))
    }
}