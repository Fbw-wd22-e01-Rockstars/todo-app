import React,{useState, useEffect} from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"

function Signin({authHandler}) { // we destructure the authHandler function from the props which we passed in the parent

    const [userData, setUserData] = useState({
        email:"",
        password:"",
  
    })

    const [error, setError] = useState("")

    const navigate = useNavigate()



    const submitHandler = (e) =>{
        e.preventDefault()
        setUserData({
            email:e.target.email.value,
            password:e.target.password.value
        })
        axios.post(`${process.env.REACT_APP_BE_URL}/auth/signin`,userData)
    .then(res => {
        authHandler()
        localStorage.setItem("toDoToken", JSON.stringify(res.data.data.token))
        navigate("/dashboard")
    })
    .catch(err => setError(err.response.data.message))
    }    
    return (
    <div>
        <h3>Log In</h3>
        <form action='post' onSubmit={submitHandler}>
            <div>
            <label htmlFor="email">Email   :  </label>
            <input type="email" id="email" placeholder="enter your email" name="email"/>
            </div>

            <div>
            <label htmlFor="password">password   :  </label>
            <input type="password" id="password" placeholder="enter your password" name="password" />
            </div>

            <button type='submit'> Log In</button>
            <hr />
            {
                error ? (<p>{error}</p>) : null
            }
        </form>

        </div>
    )
}

export default Signin
