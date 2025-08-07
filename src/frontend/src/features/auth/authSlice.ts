import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../app/axios'

type User = {
  id: number
  username: string
  email: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  status: 'idle'
}

// 🔐 Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await api.post('/auth/login', { username, password })
      return res.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed')
    }
  }
)

// 🔁 Refresh token + get user
export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    try {
      const refreshRes = await api.post('/auth/refresh')
      const { accessToken } = refreshRes.data

      // Save new accessToken в store
      thunkAPI.dispatch(refreshToken(accessToken))

      // Get user
      const meRes = await api.get('/auth/me')
      return meRes.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue('Session expired')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
      state.status = 'idle'
    },
    refreshToken: (state, action) => {
      state.accessToken = action.payload
      state.isAuthenticated = true
    }
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed'
        state.isAuthenticated = false
      })

      // REFRESH
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(refreshUser.rejected, (state) => {
        state.user = null
        state.accessToken = null
        state.isAuthenticated = false
      })
  }
})

export const { logout, refreshToken } = authSlice.actions
export default authSlice.reducer
