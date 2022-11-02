import React from "react";
import { Link, BrowserRouter as router, Router } from "react-router-dom";
function NavBar() {
  return (
    <>
      <div className="ui inverted segment fluid">
        <ul className="ui inverted secondary pointing menu">
          <li className="active item">
            <Link to="/" className="item">
              Home
            </Link>
          </li>
          <li className="item">
            <Link to="/signin">Sign in</Link>
          </li>
          <li className="item">
            <Link to="/signup">Sign up</Link>
          </li>
          <li className="item">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavBar;

