import { DoneTodo, Todo, TodoData } from '../../models/models'
import connection from './connection'

// -- LIST ALL TODOS -- //
export async function getTodos(): Promise<Todo[]> {
  return await connection('todos').select('*')
}

// -- ADD NEW TODO -- //
export async function addTodo(taskObj: TodoData): Promise<TodoData> {
  const { task, priority, completed } = taskObj
  return await connection('todos').insert({ task, priority, completed })
}

// -- UPDATE ENTIRE TODO -- //
export async function updateTodo(updatedTodo: Todo): Promise<Todo> {
  const { task, priority, completed, id } = updatedTodo
  return await connection('todos')
    .where('id', id)
    .update({ task, priority, completed, id })
}

// -- DELETE TODO -- //
export async function deleteTodo(id: number): Promise<Todo> {
  return await connection('todos').where('id', id).del()
}

// -- CHECK OFF COMPLETED TODO -- //
export async function checkOffTodo(tickTodo: DoneTodo): Promise<DoneTodo> {
  return await connection('todos')
    .where('id', tickTodo.id)
    .update('completed', tickTodo.completed)
}
