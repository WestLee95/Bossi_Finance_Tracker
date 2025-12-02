'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      alert(error.message)
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (error) {
      alert(error.message)
    } else {
      alert('Check your email for confirmation link!')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/10 ">
      <div className="max-w-md w-full space-y-8 p-8 bg-white text-black rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Bossi - Finance Tracker</h2>
        <form className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            color='gray-500'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border text-black rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"            
            color='gray-500'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border text-black rounded-lg"
          />
          <div className="flex gap-4">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={handleSignUp}
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}