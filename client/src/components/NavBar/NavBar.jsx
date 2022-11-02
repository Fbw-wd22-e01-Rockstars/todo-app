import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: "none" }}>
        Home
      </Link>
      <Link to="/signin" style={{ textDecoration: "none" }}>
        Signin
      </Link>
      <Link to="/signup" style={{ textDecoration: "none" }}>
        Signup
      </Link>
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        Dashboard
      </Link>
    </nav>
  );
}

export default NavBar;
