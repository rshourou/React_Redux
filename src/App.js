import React, {useEffect} from 'react'
import Layout from './components/Layout/Layout'
import BurgurBuilder from './containers/burgurBuilder/burgurBuilder'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Profile from './containers/Profile/ProfileForm'
import Logout from './containers/Auth/Logout'
import { connect } from 'react-redux';
import * as actions from './Store/actions/index'



function App(props) {

  useEffect(()=>{
      props.checkAuthState()
  },[])

  return (
    <BrowserRouter>
    <React.Fragment> 
    <div >
      <Layout>
        <Switch>
          <Route path='/logout' exact component={Logout} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/login' exact component={Auth} />
          <Route path='/orders'  component={Orders} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/' exact component={BurgurBuilder} />
        </Switch>
      </Layout>
    </div>
    </React.Fragment>
    </BrowserRouter>
  );
}

const mapDispatchtoProps= dispatch=>{
  return { checkAuthState: ()=> dispatch(actions.authCheckState())}
}

export default connect(null,mapDispatchtoProps)(App);
