import React,{useState,useEffect} from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Burgur from '../../components/Burgur/Burgur'
import BurgurControls from '../../components/Burgur/BurgurControls/BurgurControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/UI/Modal/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import {withRouter} from 'react-router-dom'
import * as actions from '../../Store/actions/index'
import {connect} from 'react-redux'

const INGREDIANT_PRICE={
    cheese : 0.5,
    meat:2,
    salad:1,
    bacon:1
}

const BurgurBuilder=(props)=>{
    useEffect(()=>{
        if(props.isBuilt || !props.isAuth){
            props.initIngredients()
        }
        // axios.get('/Ingredients.json')
        // .then(response=> props.loadDataHandler(response.data)).catch(error=>setErrorState(error))
    },[])
  
    const [orderState, setOrder]=useState(false)
    // const [spinnerState, setspinnerState]=useState(false)
    // const [errorSate,setErrorState]=useState(false) 

    let disabledArray={...props.ingredients}
    for (let key in disabledArray){
        disabledArray[key]= disabledArray[key]<=0
    }

    const orderNow=()=> {
        if(props.isAuth){ 
            setOrder(true)
        } else {
            props.history.push('/login')
        }
    }

    const cancelOrder=()=>setOrder(false)

    const checkout=()=>{

        // const queryParams=[]
        // for (let key in props.ingredients){
        //     queryParams.push(encodeURIComponent(key)+"="+encodeURIComponent(props.ingredients[key]))
        // }
        // queryParams.push(`price=${props.totalPrice}`)
        // const queryString=queryParams.join('&')
        //const queryString=Object.keys(IngradientState).map(igKey=>`${igKey}=${IngradientState[igKey]}&`).reduce((queryString,el)=> queryString.concat(el), '')        
        // props.history.push({
        //     pathname:'/checkout',
        //     search:'?'+queryString})
        props.history.push('/checkout')
    }
    const updatePurchasable=(ingredients)=>{
        const sum=Object.keys(ingredients)
            .map(igKey=>ingredients[igKey])
            .reduce((sum,el)=>{return sum+el},0)
        return sum>0
    }
    let orderSummary=null;
    let burgur=<Spinner />
    if(props.ingredients){
        burgur= <Auxiliary>
            <Burgur ingrediants={props.ingredients}/>
            <BurgurControls
                ingrediants={props.ingredients}                
                addItemHandler={props.addItemHandler} 
                reduceItemHandler={props.reduceItemHandler} 
                disabledArray={disabledArray} 
                igPrice={INGREDIANT_PRICE} 
                totalPrice={props.totalPrice.toFixed(2)}
                purchasable={updatePurchasable(props.ingredients)}
                orderNow={orderNow}
                isAuth={props.isAuth}/>
        </Auxiliary>
        orderSummary= <OrderSummary 
            show={orderState}
            cancelOrder={cancelOrder} 
            ingrediants={props.ingredients} 
            price={props.totalPrice} 
            checkout={checkout}> </OrderSummary>
        } 
     
    return(
        <Auxiliary>
            {burgur}           
            <Modal show={orderState} hide={cancelOrder}> 
                {orderSummary}
            </Modal>           
        </Auxiliary>
    )
}

const mapStatetoProps=state=>{
    return {
        ingredients: state.ingReducer.ingredients,
        totalPrice:state.ingReducer.totalPrice,
        purchasable: state.ingReducer.purchasable,
        error: state.ingReducer.error, 
        isAuth: state.authReducer.token !==null,
        isBuilt: state.ingReducer.building
    }
    
}
const mapDispatchtoProps=dispatch=>{
    return {
        //loadDataHandler :(data)=>dispatch(actions.loadIngredients(data)),
        initIngredients : ()=> dispatch(actions.initIngredients()),
        addItemHandler: (item)=>dispatch(actions.addIngredient(item)),
        reduceItemHandler :(item)=> dispatch(actions.reduceIngredient(item)),
        loadPrevIngredients :()=> dispatch(actions.loadPrevIngredients())
    }
}
export default connect (mapStatetoProps,mapDispatchtoProps)(WithErrorHandler(withRouter(BurgurBuilder), axios));