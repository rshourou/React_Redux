
import classes from './NavigationItems.module.css'
import {NavLink} from 'react-router-dom'


const navigationItems=props=>{
    return(
        <ul className={classes.NavItems}>
            <li className={classes.NavItem}><NavLink activeClassName={classes.active} to={{pathname:'/'}} exact>Burgur Builder</NavLink></li>
            <li className={classes.NavItem}><NavLink activeClassName={classes.active} to={{pathname:'/checkout'}}> Checkout</NavLink></li>             
            {props.isAuthenticated            
            ? <li className={classes.NavItem}><NavLink activeClassName={classes.active} to={{pathname:'/orders'}}> Orders</NavLink></li> : null}
            {props.isAuthenticated            
            ? <li className={classes.NavItem}><NavLink activeClassName={classes.active} to={{pathname:'/logout'}}> Logout</NavLink></li> 
            : <li className={classes.NavItem}><NavLink activeClassName={classes.active} to={{pathname:'/login'}}> Login</NavLink></li>
            }  
            {props.isAuthenticated            
            ? <li className={classes.NavItem}><NavLink activeClassName={classes.active} to={{pathname:'/profile'}}> Profile</NavLink></li> : null}                        
        </ul>
    )
}


export default navigationItems;