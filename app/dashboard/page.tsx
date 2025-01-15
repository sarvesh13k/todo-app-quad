'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/lib/hooks'
import { AuthProvider } from '@/components/auth-provider'
import { fetchTodos } from '@/lib/features/todoSlice'
import { TodoInput } from '@/components/todo-input'
import { TodoList } from '@/components/todo-list'
import { Navbar } from '@/components/navbar'

export default function DashboardPage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
              Your Tasks
            </h1>
            <div className="glass-effect rounded-lg shadow-lg p-6 mb-6">
              <TodoInput />
            </div>
            <div className="glass-effect rounded-lg shadow-lg p-6">
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  )
}

