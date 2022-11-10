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
import AuthState from './context/Auth/AuthState';
import TodosState from './context/Todos/TodosState';

function App() {

  /* const logoutHandler = () => setAuthorized(false) */

  // never change the state value like setAuthorized(!authorized)
  // when you want to update the state value depending on its old state value then please always use call back

  return (
    <div className="App">
      <header className="App-header">
     
            <Router>
            <AuthState>
              <TodosState>
                <NavBar/>
                TO-DO App
                  <Routes>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/signin' element={<Signin  />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/' element={<Home />} />
                  </Routes>
                </TodosState>
              </AuthState>
              </Router>
      
      </header>
    </div>
  );
}

export default App;
