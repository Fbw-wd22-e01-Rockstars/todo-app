import './App.css';
import React, { useState } from 'react';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Dashboard from "./components/Dashboard/Dashboard"
import Home from './components/Home/Home';
import {BrowserRouter as Router,
Route,
Routes} from "react-router-dom"
import NavBar from './components/NavBar/NavBar';

function App() {

  const [authorized, setAuthorized] = useState(false)

  const authHandler = () => {
    setAuthorized(oldState => !oldState) // if we want to update the stateValue depending on its old value, we cannot change it directly, we need to use a callback!
  }

  const logoutHandler = () => setAuthorized(false)

  return (
    <div className="App">
      <header className="App-header">

      <Router>
        <NavBar authorized={authorized} logoutHandler={logoutHandler}/>
        TO-DO App
          <Routes>
            <Route path='/dashboard' element={<Dashboard authorized={authorized} />} />
            <Route path='/signin' element={<Signin authHandler={authHandler} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
