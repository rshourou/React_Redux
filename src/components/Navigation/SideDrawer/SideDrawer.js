
import classes from './SideDrawer.module.css'
import Logo from '../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Auxiliary from '../../../hoc/Auxiliary'
import Backdrop from '../../UI/Backdrop/Backdrop'


const SideDrawer =props=>{
    let attachedClass=[classes.SideDrawer, classes.Close]
    if(props.show){
        attachedClass=[classes.SideDrawer,classes.Open]
    }

    return(
        <Auxiliary>
            <Backdrop canceled={props.closed} show={props.show}/> 
            <div className={attachedClass.join(' ')}> 
                <Logo height="11%"/>
                    <nav> 
                        <NavigationItems isAuthenticated={props.isAuth}/>
                    </nav>
            </div>
        </Auxiliary>

    )
}
export default SideDrawer