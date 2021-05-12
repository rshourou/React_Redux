
import classes from './BuildControl.module.css'

const buildControl=props=>{
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={props.reduced} disabled={props.disabled}>Less</button>
            <button className={classes.More} onClick={props.added}>More</button>
            <div className={classes.Label}>Price:${props.price}</div>

        </div>
    )
}
export default buildControl;