import React, { useState } from "react";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AuthState from "./context/Auth/AuthState";

function App() {
  
  const [authorized, setAuthorized] = useState(false)

  const authHandler = () => setAuthorized(oldState=>!oldState)
  return (
    <div className="App">
      <header className="App-header">
        <AuthState>
          <Router>
            <NavBar />
            <Routes>
              <Route
                path="/dashboard"
                element={<Dashboard authorized={authorized} />}
              />
              <Route
                path="/signin"
                element={<Signin itCouldBeAnyName={authHandler} />}
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </AuthState>
      </header>
    </div>
  );
}

export default App;
