import React,{useState, useEffect,useContext} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from "react-google-login"
import AuthContext from '../../context/Auth/AuthContext';

function Signin() {


    const [userData, setUserData] = useState({
        email:"",
        password:"",
  
    })

const {login,error} = useContext(AuthContext)

const navigate = useNavigate()


const blurHandler = (e) =>{
    
        const propertyName = e.target.name
        const propertyValue = e.target.value
        setUserData(oldState=>{
            return {
                ...oldState,
        [propertyName]: propertyValue,
        
    }}
    )

}


    const submitHandler = (e) =>{
        e.preventDefault();
        login(userData);

    }   
    
    const onSuccess = (res) => {
        console.log("succss", res)
    }

    const onFailure = (err) => {
        console.log("error", err)
    }
    return (
    <div>
        <h3>Log In</h3>
        <form action='post' onSubmit={submitHandler}>
            <div>
            <label htmlFor="email">Email   :  </label>
            <input type="email" id="email" placeholder="enter your email" name="email" autoComplete='none' onBlur={blurHandler}/>
            </div>

            <div>
            <label htmlFor="password">password   :  </label>
            <input type="password" id="password" placeholder="enter your password" name="password" onBlur={blurHandler}/>
            </div>

            <button type='submit'> Log In</button>
            <hr/>
            {
                error? (<p>{error}</p>) : null
            }
            <GoogleLogin 
                clientId={process.env.REACT_APP_GOOGLE_CLIENT}
                buttonText="Google Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                />
        </form>

        </div>
    )
}

export default Signin
