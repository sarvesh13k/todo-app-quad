export interface Todo {
    id: string
    title: string
    priority: 'high' | 'medium' | 'low'
    createdAt: string
    weather?: {
      temp: number
      condition: string
    }
  }
  
  export interface User {
    id: string
    email: string
    name: string
  }
  
  export interface AuthState {
    user: User | null
    isAuthenticated: boolean
    loading: boolean
    error: string | null
  }
  
  export interface TodoState {
    todos: Todo[]
    loading: boolean
    error: string | null
  }
  
  