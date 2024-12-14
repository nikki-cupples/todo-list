import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { DoneTodo, Todo, TodoData } from '../../models/models'

// -- SHOW ALL TODOS -- //
// http://localhost:3000/api/v1/todos/

export function useTodoList() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await request.get('/api/v1/todos')
      return res.body
    },
  })
}

// -- ADD NEW TODO -- //
// http://localhost:3000/api/v1/todos/

export function useAddTodo() {
  const client = useQueryClient()

  //useMutation to add new todo to data
  // specify what the data structure looks like
  return useMutation({
    mutationFn: async ({ todos }: { todos: TodoData }) => {
      await request.post('/api/v1/todos').send(todos)
    },
    // on success, need to refresh all data
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

// -- DELETE TODO -- //
// http://localhost:3000/api/v1/todos/:id

export function useDeleteTodo() {
  const client = useQueryClient()

  // useMutation to delete todo data
  return useMutation({
    mutationFn: async (id: number) => {
      await request.delete(`/api/v1/todos/${id}`)
    },
    // on success, need to refresh all data
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

// -- UPDATE TODO -- //
// http://localhost:3000/api/v1/todos/:id

export function useUpdateTodo() {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (data: Todo) => {
      const { id, task, priority, completed } = data
      await request
        .put(`/api/v1/todos/${id}`)
        .send({ id, task, priority, completed })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

// -- CHECK OFF COMPLETED TODO -- //
// http://localhost:3000/api/v1/todos/:id
export function useCompletedTodo() {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (completed: DoneTodo) => {
      const id = completed.id
      await request
        .patch(`/api/v1/todos/${id}`)
        .send({ id, completed: completed.completed })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
