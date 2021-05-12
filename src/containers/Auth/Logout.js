import {Redirect} from 'react-router'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import * as actions from '../../Store/actions/index'

class logout extends Component{

    componentDidMount(){
        this.props.onLogout()
    }
    render(){
        return <Redirect to='/' />
    }

}

const mapDispatchtoProps=dispatch=>{
    return {
        onLogout : ()=>dispatch(actions.logout())
    }
}
export default connect(null,mapDispatchtoProps)(logout)