
import { useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoInputText = useRef()

  

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) console.log("Stored Todos DJ : "+storedTodos)
    setTodos(storedTodos)
  }, [])

  useEffect(() => {
    console.log(todos)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])



  function handleTodo(e) {
    const name = todoInputText.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoInputText.current.value = null
  }

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleClearTodo() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function countTodoNotCompleted() {
    return todos.filter(todo => !todo.complete).length
  }

  return (
    <>
      <TodoList todos={todos}  toggleTodo={toggleTodo}/>
      <input type="text" ref={todoInputText}></input>
      <button onClick={handleTodo}> Add Todo</button>
      <button onClick={handleClearTodo}> Clear Completed Todo</button>
      <div>{countTodoNotCompleted()} left to do</div>
    </>
  );
}

export default App;

// {
//   id: 1,
//   name: "Todo 1",
//   complete: true
// },
// {
//   id: 2,
//   name: "Todo 2",
//   complete: false
// }
