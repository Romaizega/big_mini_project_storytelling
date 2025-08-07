import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {type AppDispatch, type RootState } from '../app/store'
import { loginUser } from '../features/auth/authSlice'
import { Navigate } from 'react-router-dom'

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated, status } = useSelector((state: RootState) => state.auth)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Fill all fields')
      return
    }
    setError('')

    const result = await dispatch(loginUser({ username, password }))
    if (loginUser.rejected.match(result)) {
      setError(result.payload as string || 'Enter error')
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Log in</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            className="btn btn-primary w-full"
            type="submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
