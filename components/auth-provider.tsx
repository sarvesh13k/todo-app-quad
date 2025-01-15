'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  return <>{children}</>
}

