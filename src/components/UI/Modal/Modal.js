import classes from './Modal.module.css'
import Auxiliary from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'
import React,{useEffect} from 'react'

const Modal= props=>{
    useEffect(()=>{
        console.log("updated")
    },[props.show])
    return (
        <Auxiliary>
            <Backdrop canceled={props.hide} show={props.show}></Backdrop>
            <div className={classes.Modal}
            style={{
                transform: props.show? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'}}>
                {props.children}
            </div>
        </Auxiliary>      
    )
}

export default Modal