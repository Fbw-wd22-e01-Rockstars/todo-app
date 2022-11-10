import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import AuthContext from "../../context/Auth/AuthContext";


const Signin =() => {

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { authHandler } = useContext(AuthContext);

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const blurHandler = (e) => {
    const propertyName = e.target.name;
    const propertyValue = e.target.value;
    setUserData((oldState) => {
      return { ...oldState, [propertyName]: propertyValue };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

   
  };

  const onSuccess = (res) => {
    console.log("success", res);
  };

  const onFailure = (err) => {
    console.log("error", err);
  };
  return (
    <>
      <h3 className="ui header">User Log In</h3>

      <form
        action="post"
        onSubmit={submitHandler}
        className="ui placeholder segment form"
      >
        <div>
          <label htmlFor="name">Email : </label>
          <div className="ui left icon input">
            <input
              type="email"
              id="email"
              placeholder="enter your email adress"
              name="email"
              className="field"
              autoComplete="none"
              onBlur={blurHandler}
            />
            <i className="envelope icon"></i>
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
                onBlur={blurHandler}
              />
              <i className="lock icon"></i>
            </div>
          </div>
        </div>

        <button type="submit" className="ui inverted violet button">
          {" "}
          Log In
        </button>
        <hr />
        {error ? <p>{error}</p> : null}
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT}
          buttonText="Google Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </form>
    </>
  );
}

export default Signin;
