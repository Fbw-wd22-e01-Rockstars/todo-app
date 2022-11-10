import React from 'react';
import { useState } from 'react';
import TodosContext from './TodosContext';
import axios from 'axios';


export default function TodosState(props) {
    const [taskList, setTaskList] = useState([]);

    // update the list 

  const updateTaskList = ( list ) =>{
    setTaskList(list)
  }

  // fetch the list 
  const fetchUpdatedTasks = () =>{
    const myToken = JSON.parse(localStorage.getItem("toDoToken"))
        const configuration = {
            
            headers:{
                'Authorization' : `Bearer ${myToken}`
            }
        }
    axios.get(`${process.env.REACT_APP_BE_URL}/dashboard/my-tasks`,configuration)
    .then(res=>setTaskList(res.data.toDoList))
    .catch(err=>console.log(err))
  }

  // get all the tasks from backend
  const getAllTasks= ()=>{
    const myToken = JSON.parse(localStorage.getItem("toDoToken"))
    const configuration = {
        
        headers:{
            'Authorization' : `Bearer ${myToken}`
        }
    }
    axios.get(`${process.env.REACT_APP_BE_URL}/dashboard/my-tasks`,configuration)
        .then(res=>updateTaskList(res.data.toDoList))
        .catch(err=>console.log(err))
  }

  return (
    <TodosContext.Provider value={{taskList,updateTaskList,fetchUpdatedTasks,getAllTasks}}>
        {props.children}
    </TodosContext.Provider>
  )
}
