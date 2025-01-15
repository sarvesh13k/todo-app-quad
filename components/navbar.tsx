'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { logoutUser } from '@/lib/features/authSlice'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'

export function Navbar() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              TaskMaster
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4" />
              <span>{user?.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(logoutUser())}
              className="text-red-500 hover:text-red-600 hover:bg-red-100/20"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

