import axios from 'axios'
import store from '../app/store'
import { logout } from '../features/auth/authSlice'

const api = axios.create({
  baseURL: '/api',
})

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const refreshRes = await axios.post('/api/auth/refresh', {}, { withCredentials: true })

        const { accessToken } = refreshRes.data


        store.dispatch({ type: 'auth/refreshToken', payload: accessToken })


        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`

        return api(originalRequest)
      } catch (refreshError) {
        store.dispatch(logout())
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
