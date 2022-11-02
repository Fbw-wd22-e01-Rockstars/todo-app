import React, { useState } from "react";
import Todo from "../Todo";

export default function TodoList({ todos, setTodos, text }) {
  const [inputText, setInputText] = useState("");
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li text={todo.text} todos={todos} setTodos={setTodos} key={todo.id}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
