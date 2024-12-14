import { useState } from 'react'
import { TodoData } from '../../models/models'
import { useAddTodo } from '../apis/api'

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
      <form
        onSubmit={handleSubmit}
        className="mb-6 flex flex-col items-center gap-4"
        aria-labelledby="todo-form"
      >
        <label htmlFor="task" id="todo-form" className="sr-only">
          Enter your task
        </label>
        <input
          className="w-full rounded-lg border border-blue-300 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What needs to be done?"
          required
          aria-describedby="task-description"
        />
        <div className="flex items-center gap-2">
          <label htmlFor="priority" className="text-blue-600">
            Priority:
          </label>
          <input
            type="number"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            min="1"
            max="10"
            className="w-16 rounded-lg border border-blue-300 p-2 shadow-sm focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full rounded-lg px-4 py-2 shadow-md ${
            isFormValid
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          }`}
          aria-label="Submit todo"
        >
          Add Todo
        </button>
      </form>
    </>
  )
}

export default AddTodo
