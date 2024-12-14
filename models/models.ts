export interface TodoData {
  task: string
  priority: number
  completed: boolean
}

export interface Todo extends TodoData {
  id: number
}

export interface DoneTodo {
  id: number
  completed: boolean
}
