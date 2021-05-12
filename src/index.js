import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, applyMiddleware,combineReducers, compose} from 'redux'
import {Provider} from 'react-redux'
import ingredReducer from './Store/Reducers/ingredReducers'
import orderReducer from './Store/Reducers/orderReducer'
import authReducer from './Store/Reducers/authReducer'
import thunk from 'redux-thunk'
import {AuthContextProvider} from './Store/Context/authContext'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger =store =>{
  return next=>{
      return action =>{
        console.log(action, store.getState())
        const result =next(action)
        console.log(result)
        return result
      }
  }
}
const rootReducer=combineReducers({
  ingReducer: ingredReducer,
  ordReducer: orderReducer,
  authReducer: authReducer
})
const store=createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
    <AuthContextProvider> 
      <App />
    </AuthContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
