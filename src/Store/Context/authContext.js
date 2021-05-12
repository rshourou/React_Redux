import React, {useState} from 'react'
const AuthContext= React.createContext({
    Token: '',
    isLogedin: false,
    login : (token)=>{},
    logout : ()=>{}
})

export const AuthContextProvider = props=>{
    const [Token, SetToken]=useState(null)
    const userIsLoggedIn= !!Token
    const loginHandler=Token=>SetToken(Token)
    const logoutHandler= ()=> SetToken(null)
    const contextValue={
        Token: Token,
        isLogedin: userIsLoggedIn,
        login : loginHandler,
        logout : logoutHandler
    }
    
    return <AuthContext.Provider value={contextValue}>
        {props.children}
        </AuthContext.Provider>
}
export default AuthContext;