import axios from 'axios'
import React from 'react'
import { useState,useContext } from 'react'
import { useEffect } from 'react';
import TodosContext from '../../context/Todos/TodosContext';

function TasksList() {


    const {taskList, updateTaskList,getAllTasks} = useContext(TodosContext)
    
    const listStyling = {

        listStyle:"none"
    }

    useEffect(()=>{

        getAllTasks();
    },[])
    return (
        <>
        <ul>
            {taskList.map(task => <li style={listStyling}>{task.title}</li>)}
        </ul> 
        </>
        )
    }
    
    export default TasksList
