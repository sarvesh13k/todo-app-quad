import { AuthProvider } from '@/components/auth-provider'

export default function Home() {
  return (
    <AuthProvider>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to Todo App</h1>
      </main>
    </AuthProvider>
  )
}

