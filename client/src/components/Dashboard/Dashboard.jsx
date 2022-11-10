import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewTask from "./NewTask";
import TasksList from "./TasksList";
import { useContext } from "react";
import AuthContext from "../../context/Auth/AuthContext";

function Dashboard() {
 
  const navigate = useNavigate()
  const {authorized} = useContext(AuthContext)





  

  //Component will mount

   useEffect(()=>{
    if(!authorized) 
      navigate("/signin")
  },[]
  ) 

  // it is a way to do something when we are demounting this component
  //ComponentWillUnmount

  useEffect(()=>{
    return(()=>{

      console.log("component demounted")
      // we clear those effects or mmemories that are no more required in our APP
    })
  })

  return (
    <div>
      <NewTask />
      <TasksList />
    </div>
  );
}

export default Dashboard;
