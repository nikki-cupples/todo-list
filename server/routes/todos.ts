import express from 'express'
import { addTodo, checkOffTodo, deleteTodo, getTodos, updateTodo } from '../db'

// -- API ROUTES SERVERSIDE -- //
const router = express.Router()

// -- LIST TODOS -- //
// http://localhost:3000/api/v1/todos/

router.get('/', async (_req, res) => {
  try {
    const data = await getTodos()
    res.json({ data })
  } catch (err) {
    res.sendStatus(500)
  }
})

// -- ADD NEW TODO -- //
// http://localhost:3000/api/v1/todos/

router.post('/', async (req, res) => {
  const newTodo = req.body
  try {
    await addTodo(newTodo)
    res.sendStatus(201)
  } catch (err) {
    res.sendStatus(500)
  }
})

// -- DELETE TODO -- //
// http://localhost:3000/api/v1/todos/:id

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const removeTodo = await deleteTodo(id)
    res.json(removeTodo)
  } catch (err) {
    res.sendStatus(500)
  }
})

// -- UPDATE TODO -- //
// http://localhost:3000/api/v1/todos/:id

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { task, completed, priority } = req.body
  try {
    await updateTodo({ id, task, completed, priority })
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(500)
  }
})

// -- CHECK OFF COMPLETED TODO -- //
// http://localhost:3000/api/v1/todos/:id

router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { completed } = req.body
  try {
    await checkOffTodo({ id, completed })
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(500)
  }
})

export default router
