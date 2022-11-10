import React from 'react'
import { useState } from 'react'
import AuthContext from './AuthContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom'


function AuthState(props) {
    const navigate = useNavigate()


    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState("");

    const authHandler = () => setAuthorized(oldState=>!oldState);

    // login user
    const login = (userData)=>{

        axios.post(`${process.env.REACT_APP_BE_URL}/auth/signin`,userData)
    .then(res=>{
        localStorage.setItem("toDoToken",JSON.stringify(res.data.data.token))
        authHandler()
        navigate("/dashboard");
    })
    .catch(err => setError(err.response.data.message))
    }

  return (
    <AuthContext.Provider value={{authorized,authHandler,login,error}}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState