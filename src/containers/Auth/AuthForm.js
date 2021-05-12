import React ,{useState, useRef, useContext} from 'react'
import classes from './AuthForm.module.css'
import Spinner from '../../components/UI/Spinner/Spinner'
import AuthContext from '../../Store/Context/authContext'

const AuthForm=props=>{
  const authContext=useContext(AuthContext)
  const emailInputRef=useRef()
  const passwordInputRef=useRef()

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
      setIsLogin((prevState) => !prevState);
  };
  
  const submitHandler=(event)=>{
      event.preventDefault()
  
      const enteredEmail= emailInputRef.current.value;
      const enteredPassword= passwordInputRef.current.value;

      //add validation
      setIsLoading(true)
      let url
      if(isLogin){
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHSJJPArgkNmjXoUGs3b061ey-mShPBw4'  
        fetch(url, 
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password :enteredPassword,
            returnSecureToken :true
          }),
          headers:{
            'Content-Type':'app'
          }

        })
        .then(res=>{
          setIsLoading(false)
          if(res.ok){           
            return res.json()
          } else{
            return res.json().then(data=>{
              let errorMessage='Authentication failed'
              throw new Error(errorMessage)
            })}
        })
        .then(data=>{
          authContext.login(data.idToken)
        })
      .catch(err=>alert(err.message))  
      } else{
        url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHSJJPArgkNmjXoUGs3b061ey-mShPBw4'
        fetch(url,
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res=>{
          setIsLoading(false)
          if(res.ok){
            return alert('success')
          } else {
            
            return res.json().then((data)=>{
              console.log(data.error.message)
              let errorMessage='Authentication Failed'
              if(data && data.error && data.error.message){
                errorMessage=data.error.message;
              }
              alert(errorMessage)
            })
          }
        })
        .catch(error=>{return alert(error.data.error.message)})           
          
        }
      }

  
  return(
      <section className={classes.auth}>
          <h1>{isLogin? 'Login' : 'Sign Up'}</h1>
          <form onSubmit={submitHandler}>
              <div className={classes.control}>
                  <label htmlFor='email'>Your Email</label>
                  <input type="email" id='email' required ref={emailInputRef}></input>
              </div>
              <div className={classes.control}>
                  <label htmlFor='password'>Your Password</label>
                  <input type="password" id='password' required ref={passwordInputRef}></input>
              </div>
              <div className={classes.actions}>
                {isLoading ? <Spinner /> : <button>{isLogin ? 'Login' : 'Create account'}</button>}                  
                  <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
                      {isLogin ? 'Create new account' : 'Login with existing account'}
                  </button>
              </div>
          </form>
          

      </section>
  )
}

export default AuthForm