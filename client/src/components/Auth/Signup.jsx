import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [message, setMessage] = useState(false);
  const [failMessage, setFailMessage] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    axios
      .post(`${process.env.REACT_APP_BE_URL}/auth/signup`, userData)
      .then((res) => setMessage(res.data.message))
      .catch((err) => setFailMessage(err.response.data.message));
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

      {message && (
        <div className="ui success message">
          <div className="header">Success</div>
          <p>{message}</p>
        </div>
      )}

      {failMessage && (
        <div className="ui error message">
          <div className="header">Error</div>
          <p>{failMessage}</p>
        </div>
      )}
    </>
  );
}

export default Signup;
