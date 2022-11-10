import React, { useState } from "react";
import axios from "axios";

const Signup = ()=> {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState(false);
  const [failMessage, setFailMessage] = useState(false);

  const userData = { name, email, password };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BE_URL}/auth/signup`, userData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("toDoToken", JSON.stringify(res.data));

        setFailMessage(false);
        setMessage(true);

        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        if (err.response.data.status === "failed") {
          setMessage(false);
          setFailMessage(true);

          setEmail("");
        }
      });
  };
  return (
    <>
      <h3 className="ui header">Register</h3>

      <form
        action="post"
        onSubmit={submitHandler}
        className="ui placeholder segment form"
      >
        <div>
          <div>
            <label htmlFor="name">Name : </label>
            <div className="ui left icon input">
              <input
                type="text"
                id="name"
                placeholder="enter your name"
                name="name"
                className="field"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <i className="user icon"></i>
            </div>
          </div>
          <br />
          <div>
            <label htmlFor="email">Email : </label>
            <div className="ui left icon input">
              <input
                type="email"
                id="email"
                placeholder="enter your email"
                name="email"
                className="field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="envelope icon"></i>
            </div>
          </div>
          <br />
          <div>
            <label htmlFor="password">Password : </label>
            <div className="ui left icon input">
              <input
                type="password"
                id="password"
                placeholder="enter your password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="lock icon"></i>
            </div>
          </div>
        </div>

        <button type="submit" className="ui inverted violet button">
          {" "}
          Signup
        </button>
      </form>

      {message ? (
        <h3 className="ui success message">Data inserted successfully!</h3>
      ) : (
        ""
      )}

      {failMessage ? (
        <h3 className="ui error message ">User already exists!!</h3>
      ) : (
        ""
      )}
    </>
  );
}

export default Signup;
