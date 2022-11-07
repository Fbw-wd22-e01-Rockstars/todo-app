import React, { useState } from 'react'
import axios from "axios"

function Signup() {

    const [userData, setUserData] = useState({
        email: "",
        password: "",
        name: ""
    })

   const [succesRegister, setSuccesRegister] = useState(false)
   const [failedRegister, setFailedRegister] = useState(false)


    const submitHandler = async (e) => {
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

       try {
        
        const result = await axios.post(`${process.env.REACT_APP_BE_URL}/auth/signup`, userData)
            console.log('status', result.status);
            if(result.status === 200) {
                setSuccesRegister(true) 
                setFailedRegister(false)
            }
            
       }
        catch(error){
            if(error.response.status ===401) {
                setFailedRegister(true)
                setSuccesRegister(false) 
            };
        }
    }

    // This blurHandler will be triggered when every user will switch the fields in this way state will be already updated before triggering submit Handler

    const blurHandler = (e) => {

        const propertyName = e.target.name
        const propertyValue = e.target.value
        setUserData(oldState => {
            return {
                ...oldState,
                [propertyName]: propertyValue,

            }
        }
        )


    }
    return (
        <div>
            <h3>Register</h3>
            <form action='post' onSubmit={submitHandler}>
                <div>
                    <div>
                        <label htmlFor="name">Name   :  </label>
                        <input type="text" id="name" placeholder="enter your name" name="name" onBlur={blurHandler} />
                    </div>
                    <label htmlFor="email">Email   :  </label>
                    <input type="email" id="email" placeholder="enter your email" name="email" onBlur={blurHandler} />
                </div>

                <div>
                    <label htmlFor="password">password   :  </label>
                    <input type="password" id="password" placeholder="enter your password" name="password" onBlur={blurHandler} />
                </div>

                <button type='submit'> Signup</button>
            </form>
            <hr/>
            {succesRegister && <h3>User succesffully registered!</h3>}
            {failedRegister && <h3>User already exists!</h3>}
        </div>
    )
}

export default Signup
