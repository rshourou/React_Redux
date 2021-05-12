import React ,{Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import './ContactData.css'
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import * as actions from '../../../Store/actions/index'


class ContactData extends Component {

    state={
        orderForm:{
            name:{elemType:'input', elemConfig:{placeholder:"Full Name", type:"text"}, value:'Roya', valid:false, touched:false,
            validation:{required:true,minLength:5} },
            email:{elemType:'input', elemConfig:{placeholder:"email", type:"email"}, value:'', valid:false,touched:false,
            validation:{required:true,minLength:5}},
            addres:{elemType:'input', elemConfig:{placeholder:"Address", type:"text"}, value:'',valid:false,touched:false,
            validation:{required:true,minLength:5} },
            phoneNumber:{elemType:'input', elemConfig:{placeholder:"Phone number", type:"text"}, value:'',valid:false, touched:false,
            validation:{required:true,minLength:9, type: Number}}, 
            deliveryMethod:{elemType:'select', value:"Fastest", valid:true,validation:{}, touched:false, elemConfig:{options:
                [{value:'fastest', displayValue:"Fastest"},
                {value:'cheapes', displayValue:"Cheapest"}]
            }},
           
        },
        
        isFormValid:false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        let formData={}
        for (let key in this.state.orderForm){
            formData[key]=this.state.orderForm[key].value
        }      
        let order={ ingredients:this.props.ingredients,
                    price: this.props.price,
                    contact: formData}
        this.props.onOrderHandler(order, this.props.token)
        
        if (!this.props.failed){
            this.props.history.push('/')
            this.props.initIngredients()
        }
    }

    checkValidityHandler=(value, validationRules)=>{
        let isValid=true
        if(validationRules.required){
            isValid= value.trim()!=='' && isValid
        }
        if(validationRules.minLength){
            isValid= value.length>= validationRules.minLength && isValid
        }
        return isValid
    }
    
    inputChangedHandler=(event, inputIdentifier)=>{
        let formData={...this.state.orderForm};
        let isFormValid=true;
        let updatedElement={...formData[inputIdentifier]};
        updatedElement.value=event.target.value;
        updatedElement.valid= this.checkValidityHandler(updatedElement.value,updatedElement.validation)
        updatedElement.touched=true
        formData[inputIdentifier]=updatedElement
        for(let key in formData){
            isFormValid= isFormValid && formData[key].valid
        }
        this.setState({orderForm:formData, isFormValid:isFormValid})
        
    }

    render(){
        let orderFormArray=[]
        for (let key in this.state.orderForm){
            orderFormArray.push({
                id:key, config:this.state.orderForm[key]
            })
        }       

        let form=null;
        if(this.props.loading || this.props.failed){
            form=<Spinner />
        } else{
            form=<form onSubmit={this.orderHandler}>
            {/* {Object.keys(this.state.orderForm).map(input=>
                <Input key={this.state.orderForm[input]}
                    elemType={this.state.orderForm[input].elemType} 
                    elemConfig={this.state.orderForm[input].elemConfig} 
                    value={this.state.orderForm[input].value} 
                    label={input}/>
            )} */}

            {orderFormArray.map(input=>{
                return <Input 
                elemType={input.config.elemType}
                elemConfig={input.config.elemConfig}
                value={input.config.value}
                label={input.id}
                changed={(event)=>this.inputChangedHandler(event,input.id)}
                invalid={!input.config.valid}
                touched={input.config.touched}/>
            })}
            <Button btnType='Success' disabled={!this.state.isFormValid}>Submit</Button>
        </form>
        }
        return(
        <div className='ContactData'>
            {form}
        </div>
        )
    }
}

const mapStatetoProps=state=>{
    return {
        ingredients:state.ingReducer.ingredients,
        price: state.ingReducer.totalPrice,
        loading: state.ordReducer.loading, 
        failed: state.ordReducer.failed,
        token: state.authReducer.token
    }
}

const mapDispatchtoProps=dispatch =>{
    return {
        onOrderHandler: (order,token)=> dispatch(actions.place_order(order, token)),
        initIngredients :() => dispatch(actions.initIngredients())
    }
}

export default WithErrorHandler(connect(mapStatetoProps,mapDispatchtoProps)(ContactData),axios)