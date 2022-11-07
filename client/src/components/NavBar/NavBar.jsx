import React from 'react'
import {Link, BrowserRouter as router, Router, useNavigate} from "react-router-dom"
function NavBar({authorized}) {

    const navigate = useNavigate()

    const manageAuth = () => {
        if (authorized) {
            navigate("/")
            authorized()
        }
        else {
            navigate("/signin")
        }
    }

    return (
        <div>
     

            <ul style={{display:"flex", listStyle:"none", justifyContent:"space-evenly" , width:"100vw", position:"absolute", top:0, left:0, backgroundColor:"white" }}>
                <li>
                    <Link to="/"  style={{textDecoration:"none"}}>
                        Home
                    </Link>
                </li>

                {!authorized ?
                (<> 
                <li>
                    <Link to="/signin"  style={{textDecoration:"none"}}>
                        Signin
                    </Link>
                </li>
                <li>
                    <Link to="/signup"  style={{textDecoration:"none"}}>
                        Signup
                    </Link>
                </li> 
                </>)
                : null}

                {authorized ? 
                    <li>
                    <Link to="/dashboard"  style={{textDecoration:"none"}}>
                        Dashboard
                    </Link>
                </li>
                : null}


                <button onClick={manageAuth}> 
                    <li>
                        {authorized ? "logout" : "login"}
                    </li>
                </button>
                
            </ul>
  
        </div>
    )
}

export default NavBar
