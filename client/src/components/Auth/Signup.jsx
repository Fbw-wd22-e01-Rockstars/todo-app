import React, { useState } from 'react'
import axios from "axios"

function Signup() {

    const [userData, setUserData] = useState({
        email:"",
        password:"",
        name:""
    })

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState(false);
    const [failMessage, setFailMessage]= useState(false);

    const submitHandler = async (e) =>{
        e.preventDefault()
  /*       
  On first request state will not be updated because setState is an async function
  So the payload of request will be empty on first attempt and backend will crash as we are not doing any kind of error handling

  */

  setUserData({
            name:e.target.name.value,
            email:e.target.email.value,
            password:e.target.password.value
        })
 

        axios
        .post(`${process.env.REACT_APP_BE_URL}/auth/signup`, userData)
        .then((res) => {
            setFailMessage(false)
          setMessage(true);

          setName("");
        setEmail("");
        setPassword("");
        })
        .catch((err) =>{
            if(err.response.data.status === "failed"){
                setMessage(false)
                setFailMessage(true);

                setEmail("");
            }
        });
    };
// This blurHandler will be triggered when every user will switch the fields in this way state will be already updated before triggering submit Handler

//     const blurHandler = (e) =>{
    
//         const propertyName = e.target.name
//         const propertyValue = e.target.value
//         setUserData(oldState=>{
//             return {
//                 ...oldState,
//         [propertyName]: propertyValue,
        
//     }}
//     )

// }
    return (
        <div>
        <h3>Register</h3>
        <form action="post" onSubmit={submitHandler}>
          <div>
            <div>
              <label htmlFor="name">Name : </label>
              <input
                type="text"
                id="name"
                placeholder="enter your name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              placeholder="enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
  
          <div>
            <label htmlFor="password">password : </label>
            <input
              type="password"
              id="password"
              placeholder="enter your password"
              name="password"
              value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
  
          <button type="submit"> Signup</button>
        </form>
        <hr />
        {message ? (
          <h3 style={{ color: "green" }}>Data inserted successfully!</h3>
        ) : (
          ""
        )}
         {failMessage ? (
        <h3 style={{ color: "red" }}>User already exists!!</h3>
      ) : (
        ""
      )}
      </div>
    )
}

export default Signup
