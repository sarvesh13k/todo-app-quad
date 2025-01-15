'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { deleteTodo } from '@/lib/features/todoSlice'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

const priorityColors = {
  high: 'bg-red-100 border-red-200',
  medium: 'bg-yellow-100 border-yellow-200',
  low: 'bg-green-100 border-green-200',
}

export function TodoList() {
  const dispatch = useAppDispatch()
  const { todos, loading } = useAppSelector((state) => state.todos)

  if (loading) {
    return <div className="text-center">Loading tasks...</div>
  }

  if (todos.length === 0) {
    return <div className="text-center text-gray-500">No tasks yet. Add one above!</div>
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`p-4 rounded-lg border ${priorityColors[todo.priority]} flex items-center justify-between`}
        >
          <div className="flex-1">
            <h3 className="font-medium">{todo.title}</h3>
            <p className="text-sm text-gray-500">
              Priority: {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </p>
            {todo.weather && (
              <p className="text-sm text-gray-500">
                Weather: {todo.weather.temp}°C, {todo.weather.condition}
              </p>
            )}
          </div>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => dispatch(deleteTodo(todo.id))}
            className="ml-4"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}

