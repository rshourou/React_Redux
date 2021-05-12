import React from 'react'
import Burgur from '../Burgur/Burgur'
import Button from '../UI/Button/Button'
import './CheckoutSummary.css'

const checkoutSummary=props=>{

    return(
        <div className='CheckoutSummary'>
            <h1>We hope it tastes well</h1>
            <Burgur  ingrediants={props.ingrediants}/>
            <Button  btnType="Danger"  clicked={props.cancleCheckout}>CANCEL</Button>
            <Button  btnType="Success" clicked={props.continuCheckout}>CONTINUE</Button>
        </div>
    )
}
export default checkoutSummary