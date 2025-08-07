import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { type RootState } from '../app/store'
import type { JSX } from 'react'

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  return isAuthenticated ? children : <Navigate to="/login" />
}
