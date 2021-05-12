
import classes from './Input.module.css'

const input=props=>{
    let inputElement=null;
    let validationErrorMessage=null
    let inputClasses=[classes.InputElement]
    if(props.invalid  && props.touched){
        inputClasses.push(classes.Invalid)
        validationErrorMessage=<p style={{color:'red'}}>Please enter valid values</p>
    }
    switch(props.elemType){
        case('input'):
            inputElement=<input className={inputClasses.join(' ')} onChange={props.changed}  {...props.elemConfig} value={props.value}/>
            break;
        case ('textarea'):
            inputElement=<textarea className={inputClasses.join(' ')} onChange={props.changed}  {...props.elemConfig} value={props.value}/>
            break;
        case('select'):
        
        inputElement=<select className={inputClasses.join(' ')} value={props.value} onChange={props.changed} >
                        {props.elemConfig.options.map(option=>{
                            <option value={option.value}>{option.displayValue} </option>
                        })}
                    </select>
            break;
        default:
            inputElement=<input className={inputClasses.join(' ')} {...props.elemConfig} value={props.value} onChange={props.changed} />

    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationErrorMessage}
        </div>
    )
}

export default input