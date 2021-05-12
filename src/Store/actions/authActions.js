import axios from 'axios'
import * as actionTypes from '../actionTypes'


export const auth_start=()=>{
    return {type: actionTypes.AUTH_START}

}

export const auth_success=(idToken, userId)=>{
    return {type: actionTypes.AUTH_SUCCEED, idToken:idToken,userId:userId }

}

export const auth_failed=(error)=>{
    return {type: actionTypes.AUTH_FAILED, error:error}
}


export const checkAuth=(email, password, isSignedUp)=>{
    return dispatch =>{
        dispatch(auth_start());
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHSJJPArgkNmjXoUGs3b061ey-mShPBw4'
        if (!isSignedUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHSJJPArgkNmjXoUGs3b061ey-mShPBw4'
        }

        const authData={email:email,password:password, returnSecureToken: true}
        axios.post(url, authData)
            .then(response =>{
                const expirationDate= new Date( new Date().getTime()+ response.data.expiresIn*1000 )
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId)

                dispatch(auth_success(response.data.idToken,response.data.localId));
                dispatch(checkAuth_TimeOut(response.data.expiresIn*1000));           
            })
            .catch(err=> dispatch(auth_failed(err.response.data.error)))              
    }
}
export const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')

    return {type:actionTypes.AUTH_LOGOUT}
}

export const checkAuth_TimeOut=(expirationTime)=>{
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime);
    }   
}

export const authCheckState= ()=>{
    return dispatch =>{
        const token= localStorage.getItem('token')    
        if(!token){
            dispatch(logout())
        } else {
            const expirationDate= new Date(localStorage.getItem('expirationDate'))
            const userId= localStorage.getItem('userId')
            if (expirationDate >= new Date()){
                dispatch(auth_success(token,userId ))
                dispatch(checkAuth_TimeOut(expirationDate.getTime()-new Date().getTime()))

            } else{
                dispatch(logout())
            }
        }
    }
}