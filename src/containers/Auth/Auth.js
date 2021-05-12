import React ,{Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../Store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
class Auth extends Component{

    state={
        controls:{       
            name:{elemType:'input', elemConfig:{placeholder:"Name", type:"text"}, value:'', valid:false, touched:false,
            validation:{required:true,minLength:5} },
            phonenumber:{elemType:'input', elemConfig:{placeholder:"Phone Number", type:"text"}, value:'', valid:false,touched:false,
            validation:{required:true,isNumeric:true}},
            email:{elemType:'input', elemConfig:{placeholder:"email", type:"email"}, value:'', valid:false,touched:false,
            validation:{required:true,isEmail:true}},
            password:{elemType:'input', elemConfig:{placeholder:"password", type:"password"}, value:'',valid:false,touched:false,
            validation:{required:true,minLength:6} },
            
        },
        isFormValid: false,
        isSignedUp:true
    }
    checkValidityHandler=(value, validationRules)=>{
        let isValid=true
        if(validationRules.required){
            isValid= value.trim()!=='' && isValid
        }
        if(validationRules.minLength){
            isValid= value.length>= validationRules.minLength && isValid
        }
        if(validationRules.isNumeric){
            const pattern= /^\d+$/;
            isValid= pattern.test(value) && isValid
        }
        if(validationRules.isEmail){
            const pattern= /[a-z0-9!#$%&'*+/=?^]/;
            isValid= pattern.test(value) && isValid
        }
        return isValid
    }
    
    inputChangedHandler=(event, controlElem)=>{      
        let isFormValid=true;
        let formData={...this.state.controls}

        for(let key in formData){
            isFormValid= isFormValid && formData[key].valid
        }
        this.setState({
            controls:{...this.state.controls,
                [controlElem]: {...this.state.controls[controlElem],
                    value:event.target.value,
                    touched: true,
                    valid: this.checkValidityHandler(event.target.value,this.state.controls[controlElem].validation)},
            },
            isFormValid:isFormValid
        })       
    } 

    switchAuthModeHandler=()=>{
        this.setState(prevState=> {
            return {isSignedUp: !prevState.isSignedUp}
        })
    }
    
    submitHandler=(event)=>{
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignedUp)
    }
    
    render(){
        if(this.props.isAuth ){
            if(!this.props.isBuilt){
                this.props.history.push('/checkout')
            } else{
                this.props.history.push('/')
            }
        }
        let signupFormArray= []
        
        for (let key in this.state.controls){
            signupFormArray.push({id:key, config: this.state.controls[key]})
            }
        let form=this.state.isSignedUp ? signupFormArray.map(input=> {
            return <Input key={input.id}
            elemType={input.config.elemType}
            elemConfig={input.config.elemConfig}
            value={input.config.value}
            label={input.id}
            changed={(event)=>this.inputChangedHandler(event,input.id)}
            invalid={!input.config.valid}
            touched={input.config.touched}/>
        }) : signupFormArray.filter(input=> input.id==='password' || input.id==='email').map(input=> {
            return <Input key={input.id}
            elemType={input.config.elemType}
            elemConfig={input.config.elemConfig}
            value={input.config.value}
            label={input.id}
            changed={(event)=>this.inputChangedHandler(event,input.id)}
            invalid={!input.config.valid}
            touched={input.config.touched}/>
        })
        if(this.props.loading){
            form= <Spinner />
        }
      
        return(
            <div className={classes.Auth}>
                {this.props.error ? <p>{this.props.error.message}</p> : null}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    {this.state.isSignedUp ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        )
    }

}

const mapStatetoProps=state=>{
    return {
        loading : state.authReducer.loading,
        error :state.authReducer.error, 
        isAuth : state.authReducer.token !== null,
        isBuilt : state.ingReducer.building
    }
}

const mapDispatchtoProps=dispatch=>{
    return {
        onAuth : (email,password, isSignedUp)=>dispatch(actions.checkAuth(email,password, isSignedUp))
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Auth);