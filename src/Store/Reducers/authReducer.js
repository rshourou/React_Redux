
import * as actionTypes from '../actionTypes'

const initialState={
    userId:null,
    error:null,
    token:null,
    loading:false,
    authRedirect: '/'}


const reducer =(state=initialState, action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:   return {...state, loading:true,error:null}
        case actionTypes.AUTH_FAILED:  return {...state, loading:false,error:action.error}
        case actionTypes.AUTH_SUCCEED: return { ...state, token:action.idToken, userId: action.userId, error:null, loading:false,}
        case actionTypes.AUTH_LOGOUT: return {...state, userId:null, token:null}
        default : return state
    }
    
}

export default reducer