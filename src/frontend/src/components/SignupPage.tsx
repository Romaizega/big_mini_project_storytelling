import React, { useState } from 'react'
import { useAppDispatch } from '../app/hooks'
import { loginUser } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.message || 'Registration failed')
    } else {
      // Auto login
      await dispatch(loginUser({ username: form.username, password: form.password }))
      navigate('/dashboard')
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-base-200">
      <div className="card bg-base-100 shadow-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="username" placeholder="Username" onChange={handleChange} className="input input-bordered w-full" />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input input-bordered w-full" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input input-bordered w-full" />
          {error && <p className="text-red-500">{error}</p>}
          <button className="btn btn-primary w-full" type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
