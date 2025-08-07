import { Routes, Route } from 'react-router-dom'
import LoginPage from '../src/components/LoginPage'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './pages/Navbar'
import CreateStoryPage from './pages/CreateStoryPage'
import DashboardPage from './pages/DashboardPage' 
import SignupPage from './components/SignupPage'
import EditStoryPage from './pages/EditStoryPage'
import { useEffect } from 'react'
import { useAppDispatch } from './app/hooks'
import { refreshUser } from './features/auth/authSlice'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(refreshUser())
  }, [dispatch])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/create" element={<CreateStoryPage />} />
        <Route path="/stories/:id/edit" element={<EditStoryPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage /> 
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
