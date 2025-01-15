'use client'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Todo, TodoState } from '@/types/todo'

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  await delay(1000)
  const todos = localStorage.getItem('todos')
  return todos ? JSON.parse(todos) : []
})

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    await delay(500)
    const newTodo: Todo = {
      ...todo,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    }
    const todos = localStorage.getItem('todos')
    const existingTodos = todos ? JSON.parse(todos) : []
    localStorage.setItem('todos', JSON.stringify([...existingTodos, newTodo]))
    return newTodo
  }
)

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string) => {
  await delay(500)
  const todos = localStorage.getItem('todos')
  const existingTodos = todos ? JSON.parse(todos) : []
  const updatedTodos = existingTodos.filter((todo: Todo) => todo.id !== id)
  localStorage.setItem('todos', JSON.stringify(updatedTodos))
  return id
})

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false
        state.todos = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch todos'
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload)
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload)
      })
  },
})

export default todoSlice.reducer

