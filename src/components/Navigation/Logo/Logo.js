import burgurLogo from '../../../assets/images/burger-logo.png'
import classes from './Logo.module.css'
const logo=props=>{
    return (
    <div className={classes.Logo} style={{height : props.height}} >
        <img src={burgurLogo} alt="Burgur Logo"/>
    </div>)
}
export default logo