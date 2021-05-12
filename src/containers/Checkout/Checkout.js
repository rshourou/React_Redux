
import { Route, Redirect} from 'react-router-dom'
import CheckoutSummary from '../../components/Orders/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'


const Checkout=props=>{

    // useEffect(()=>{
    //     const ingrediants={}
    //     const query= new URLSearchParams(props.location.search)        
    //     for (let param of query.entries()){ 
    //         if(param[0]==='price'){
    //             setPriceState(param[1])
    //         } else  {    
    //         ingrediants[param[0]]=+param[1]
    //         setIngredientState(ingrediants)}
    //     }

    // },[])
       
    const cancleCheckoutHandler=()=>props.history.goBack()
    const continuCheckoutHandler=()=> props.history.replace(props.match.path +'/contact-data')

    let  checkout_summary= <Redirect to='/' />
    if( props.ingredients ){
        checkout_summary=
        <div>
            <CheckoutSummary ingrediants={props.ingredients} cancleCheckout={cancleCheckoutHandler} continuCheckout={continuCheckoutHandler}/>
            <Route exact path="/checkout/contact-data" component={ContactData} />        
        </div>       
    }
    
    return checkout_summary
}
const mapStatetoProps=state=>{
    return {
        ingredients: state.ingReducer.ingredients,
        price: state.ingReducer.totalPrice,
        error: state.ingReducer.error
    }
}

export default connect(mapStatetoProps)(Checkout) 