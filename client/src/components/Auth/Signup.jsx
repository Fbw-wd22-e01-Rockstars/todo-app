import React, { useState } from 'react'
import axios from "axios"



export default function Signup() {

    const [userData, setUserData] = useState({
        email: "",
        password: "",
        name: ""
    })

    const [message, setMessage] = useState(false);
    const [failMessage, setFailMessage] = useState(false);


    const submitHandler = (e) => {
        e.preventDefault()
        setUserData({
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        })
        
        axios
            .post(`${process.env.REACT_APP_BE_URL}/auth/signup`, userData)
            .then((res) => {
                setFailMessage(false);
                setMessage(true);
            })
            .catch((err) => {
                if (err.response.data.status === "failed") {
                    setMessage(false);
                    setFailMessage(true);
                }
            });
    };
    
    return (
        <div>
            <h3>Register</h3>
            <form action='post' onSubmit={submitHandler}>
                <div>
                    <div>
                        <label htmlFor="name">Name   :  </label>
                        <input type="text" id="name" placeholder="enter your name" name="name" />
                    </div>
                    <label htmlFor="email">Email   :  </label>
                    <input type="email" id="email" placeholder="enter your email" name="email" />
                </div>

                <div>
                    <label htmlFor="password">password   :  </label>
                    <input type="password" id="password" placeholder="enter your password" name="password" />
                </div>

                <button type='submit'> Sign Up!</button>
            </form>
            <hr />
            {message ? (
                <h3 style={{ color: "green" }}>Sign up successful! </h3>
            ) : ""}
            {failMessage ? (
                <h3 style={{ color: "red" }}>Invalid input, sign up unsuccessful.</h3>
            ) : ""}
        </div>
    )
            


}