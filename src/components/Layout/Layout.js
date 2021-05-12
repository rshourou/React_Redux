import Auxiliary from '../../hoc/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import React ,{useState} from 'react'
import {connect} from 'react-redux'

const Layout = (props)=>{
    const [showSideDrawer,setshowSideDrawer]=useState(false)
    const sideDrawerClosedHandler =()=>setshowSideDrawer(false)
    const sideDrawerToggleHandler =()=>setshowSideDrawer(!showSideDrawer)
    
    return(
        
        <Auxiliary>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} isAuth={props.isAuthenticated}/>
            <SideDrawer show={showSideDrawer} closed={sideDrawerClosedHandler} isAuth={props.isAuthenticated} />
            <main className={classes.Component}> {props.children}</main>
        </Auxiliary>
    )

}

const mapStatetoProps=state=>{
    return {
        isAuthenticated: state.authReducer.token !== null
    }
}

export default connect(mapStatetoProps)(Layout)