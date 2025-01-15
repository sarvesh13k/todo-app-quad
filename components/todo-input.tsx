'use client'

import { useState } from 'react'
import { useAppDispatch } from '@/lib/hooks'
import { addTodo } from '@/lib/features/todoSlice'
import { Button } from '@/components/ui/button'

export function TodoInput() {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    dispatch(addTodo({
      title: title.trim(),
      priority,
    }))

    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>
      <Button type="submit" className="w-full">
        Add Task
      </Button>
    </form>
  )
}

