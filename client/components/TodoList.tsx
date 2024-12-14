import { DoneTodo, Todo } from '../../models/models'
import {
  useTodoList,
  useDeleteTodo,
  useCompletedTodo,
  useUpdateTodo,
} from '../apis/api'
import { useState } from 'react'

function TodoList() {
  const { data, isPending, isError, error } = useTodoList()

  const deleteTodo = useDeleteTodo()
  const updateTodo = useCompletedTodo()
  const updateTaskName = useUpdateTodo()

  const [editingId, setEditingId] = useState<number | null>(null)
  const [updatedTask, setUpdatedTask] = useState<string>('')

  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    { id, completed }: DoneTodo,
  ) => {
    e.stopPropagation()
    updateTodo.mutate({ id, completed: !completed })
  }

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ) => {
    e.stopPropagation()
    deleteTodo.mutate(Number(id))
  }

  const handleDoubleClick = (task: string, id: number) => {
    setEditingId(id)
    setUpdatedTask(task)
  }

  const handleSaveEdit = (todo: Todo) => {
    if (updatedTask.trim() !== '') {
      updateTaskName.mutate({ ...todo, task: updatedTask.trim() })
    }
    setEditingId(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  if (isPending) {
    return <p>Still loading your list....</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <>
      <ul className="rounded-lg bg-white p-4 shadow-md">
        {data.data
          .slice()
          .sort(
            (a: { priority: number }, b: { priority: number }) =>
              a.priority - b.priority,
          )
          .map((item: Todo) => (
            <li
              key={item.id}
              className={`mb-2 flex items-center justify-between rounded p-2 ${
                item.completed ? 'bg-blue-50' : 'bg-blue-100'
              }`}
            >
              <div className="flex items-center">
                <input
                  id={`toggle-${item.id}`}
                  className="mr-3 h-5 w-5"
                  type="checkbox"
                  checked={item.completed}
                  onChange={(e) =>
                    handleUpdate(e, { id: item.id, completed: item.completed })
                  }
                  aria-checked={item.completed}
                />
                {editingId === item.id ? (
                  <>
                    <input
                      className="w-full rounded border-2 border-blue-200 p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      type="text"
                      value={updatedTask}
                      onChange={(e) => setUpdatedTask(e.target.value)}
                      aria-label={`Edit task: ${item.task}`}
                    />
                    <button
                      onClick={() => handleSaveEdit(item)}
                      className="m-2 text-green-500"
                      aria-label="Save edited task"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="m-2 text-red-500"
                      aria-label="Cancel edit"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <span
                    className={`text-lg ${
                      item.completed
                        ? 'text-gray-400 line-through'
                        : 'text-blue-700'
                    }`}
                    onDoubleClick={() => handleDoubleClick(item.task, item.id)}
                    aria-label={`Double-click to edit task: ${item.task}`}
                  >
                    {item.task}
                  </span>
                )}
              </div>
              <button
                onClick={(e) => handleDelete(e, item.id)}
                className="text-red-500"
                aria-label={`Delete task: ${item.task}`}
              >
                ❌
              </button>
            </li>
          ))}
      </ul>
    </>
  )
}

export default TodoList
