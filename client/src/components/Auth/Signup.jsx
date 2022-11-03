import React, { useState } from 'react'
import axios from "axios"

function Signup() {

    const [userData, setUserData] = useState({
        email:"",
        password:"",
        name:""
    })

    const [status, setStatus] = useState("")

    const [message, setMessage] = useState("")

    const submitHandler = async (e) =>{
        e.preventDefault()
  /*       
  On first request state will not be updated because setState is an async function
  So the payload of request will be empty on first attempt and backend will crash as we are not doing any kind of error handling

  setUserData({
            name:e.target.name.value,
            email:e.target.email.value,
            password:e.target.password.value
        })
 */

        axios.post(`${process.env.REACT_APP_BE_URL}/auth/signup`,userData)
        .then(res=>{
            setStatus(res.data.status)
            setMessage(res.data.message)
        })
        .catch(err => {
            setStatus(err.response.data.status)
            setMessage(err.response.data.message)
        })
        
    }
// This blurHandler will be triggered when every user will switch the fields in this way state will be already updated before triggering submit Handler

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
    return (
        <div>
            <h3>Register</h3>
            <form action='post' onSubmit={submitHandler}>
                <div>
                <div>
                <label htmlFor="name">Name   :  </label>
                <input type="text" id="name" placeholder="enter your name" name="name" onBlur={blurHandler}/>
                </div>
                <label htmlFor="email">Email   :  </label>
                <input type="email" id="email" placeholder="enter your email" name="email" onBlur={blurHandler}/>
                </div>

                <div>
                <label htmlFor="password">password   :  </label>
                <input type="password" id="password" placeholder="enter your password" name="password" onBlur={blurHandler}/>
                </div>

                <button type='submit'> Signup</button>
            </form>
            { status === "success" ? <h3 style={{ color: 'green'}}> {message} </h3> : "" }
            { status === "failed" ? <h3 style={{ color: 'red'}}> {message} </h3> : "" }
        </div>
    )
}

export default Signup
