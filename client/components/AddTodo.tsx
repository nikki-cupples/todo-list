// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { TodoData } from '../../models/models'
import { useAddTodo } from '../apis/api'

import { Outlet } from 'react-router-dom'
import TodoList from './TodoList'

function AddTodo() {
  const [task, setTask] = useState<string>('')
  const [priority, setPriority] = useState<number>(1)
  const [completed, setCompleted] = useState<boolean>(false)

  const { mutate: addNewTodo } = useAddTodo()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newTodo: TodoData = {
      task,
      priority,
      completed,
    }

    addNewTodo({ todos: newTodo })

    setTask('')
    setPriority(1)
    setCompleted(false)
  }
  const isFormValid = task.trim() !== '' && priority > 0
  return (
    <>
      <form onSubmit={handleSubmit} aria-labelledby="todo-form">
        <div>
          <label htmlFor="task" id="todo-form" className="sr-only">
            Enter your task in this text field!
          </label>
          <input
            className="new-todo"
            type="text"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What needs to be done?"
            required
            aria-describedby="task-description"
          />
          <span id="task-description" className="sr-only">
            Enter the task to be added.
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            padding: '10px',
          }}
        >
          <label
            htmlFor="priority"
            style={{
              fontSize: '20px',
            }}
          >
            Select Priority Level
          </label>
          <input
            type="number"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            min="1"
            max="10"
            style={{
              height: '20px',
              fontSize: '20px',
              marginLeft: '10px',
            }}
            aria-label="Priority level"
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            backgroundColor: isFormValid ? '#4CAF50' : '#ccc',
            border: 'none',
            borderRadius: '4px',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
          }}
          aria-label="Submit todo"
        >
          <span
            style={{
              marginLeft: '250px',
              marginRight: '250px',
            }}
          >
            ✔️
          </span>
        </button>
      </form>
      <TodoList />
      <Outlet />
    </>
  )
}

export default AddTodo
