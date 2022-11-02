import React from "react";
import { Link} from "react-router-dom";
function NavBar() {
  return (
    <div>
      <ul
        style={{
          display: "flex",
            justifyContent: "space-around",
            listStyle: "none",
            backgroundColor: "lightblue",
            padding: "10px",
            width: "100vw",
            hover: "red",
            top: "0",
        }}
        >
        <li>
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/signin" style={{ textDecoration: "none" }}>
            Signin
          </Link>
        </li>
        <li>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            Signup
          </Link>
        </li>
        <li>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
