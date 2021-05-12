import React ,{Component} from 'react'
import Order from '../../components/Orders/Order'
import axios from '../../axios-order'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import {connect} from 'react-redux'
import * as actions from '../../Store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component{
    
    componentDidMount(){
        this.props.onFetchOrders(this.props.token)
    }
    
    render(){
        let orders=<Spinner />
        if (!this.props.loading){
            orders=this.props.orders.map(order=> <Order key={order.id} price={+order.price} ingrediants={order.ingredients}/>) 
        } else if(this.props.error){
            orders=<p>{this.props.error.message}</p>
        }
        return (
            <div>
                
                {orders}
            </div>
        )
    }
}

const mapStatetoProps=state =>{
    return {
        orders: state.ordReducer.orders,
        loading: state.ordReducer.loading,
        error: state.ordReducer.error,
        token: state.authReducer.token
    }
}

const mapDispatchtoProps=dispatch=>{
    return {
        onFetchOrders: (token) =>dispatch(actions.fetch_orders(token))
    }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(WithErrorHandler(Orders,axios))