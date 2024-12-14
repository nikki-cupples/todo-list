import { Outlet } from 'react-router-dom'
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

  // UPDATING OR DELETING A TASK
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

  // EDITING A TASK
  const handleDoubleClick = (task: string, id: number) => {
    setEditingId(id)
    setUpdatedTask(task)
  }

  const handleSaveEdit = (todo: Todo) => {
    // console.log('Save clicked', { task: updatedTask.trim() })
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
      <ul className="todo-list">
        {data.data
          // sort by priority
          .slice()
          .sort(
            (a: { priority: number }, b: { priority: number }) =>
              a.priority - b.priority,
          )
          .map((item: Todo) => (
            // check off a completed todo task
            <li key={item.id} className={item.completed ? 'completed' : ''}>
              <div className="view">
                <label
                  htmlFor={`toggle-${item.id}`}
                  id={`toggle-${item.id}`}
                  className="sr-only"
                >
                  Mark as completed
                </label>
                <input
                  id={`toggle-${item.id}`}
                  className="toggle"
                  type="checkbox"
                  checked={item.completed}
                  onChange={(e) =>
                    handleUpdate(e, {
                      id: item.id,
                      completed: item.completed,
                    })
                  }
                  aria-checked={item.completed}
                />

                {/* editing a task name */}
                {editingId === item.id ? (
                  <>
                    <input
                      className="new-todo"
                      type="text"
                      value={updatedTask}
                      onChange={(e) => setUpdatedTask(e.target.value)}
                      aria-label={`Edit task: ${item.task}`}
                    />
                    <button
                      onClick={() => handleSaveEdit(item)}
                      style={{
                        margin: '20px',
                        color: 'green',
                      }}
                      aria-label="Save edited task"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={{
                        margin: '20px',
                        color: 'red',
                      }}
                      aria-label="Cancel edit"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <label
                      htmlFor={`task-${item.id}`}
                      onDoubleClick={() =>
                        handleDoubleClick(item.task, item.id)
                      }
                      aria-label={`Double-click to edit task: ${item.task}`}
                    >
                      {item.task}
                    </label>
                    <input id={`task-${item.id}`} className="sr-only" />
                  </>
                )}

                {/* deleting a task */}
                <button
                  className="destroy"
                  onClick={(e) => handleDelete(e, item.id)}
                  aria-label={`Delete task: ${item.task}`}
                ></button>
              </div>
            </li>
          ))}
      </ul>
      <Outlet />
    </>
  )
}

export default TodoList
