import React from 'react';
import TodosContext from './TodosContext';


export default function TodosState(props) {

  return (
    <TodosContext.Provider value={{}}>
        {props.children}
    </TodosContext.Provider>
  )
}