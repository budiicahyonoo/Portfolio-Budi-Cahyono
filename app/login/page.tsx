'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ password })
    })
    
    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Password salah bang!')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="max-w-sm w-full bg-background border border-border p-8 rounded-2xl shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-blue-600 mb-2">RESTRICTED AREA</h1>
          <p className="text-sm text-muted-foreground">Masukkan password rahasia untuk masuk ke Admin Dashboard.</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <Input 
            type="password" 
            placeholder="Password..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-center"
          />
          {error && <p className="text-sm text-red-500 text-center font-medium">{error}</p>}
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? 'Mengecek...' : 'Masuk Dashboard'}
          </Button>
        </form>
      </div>
    </div>
  )
}