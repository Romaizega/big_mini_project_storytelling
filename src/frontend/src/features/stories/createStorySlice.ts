import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface CreateStoryPayload {
  title: string
  content: string
}

interface CreateStoryState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CreateStoryState = {
  status: 'idle',
  error: null
}

export const createStory = createAsyncThunk(
  'stories/createStory',
  async (payload: CreateStoryPayload, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState()
      const token = state.auth.accessToken

      const res = await axios.post('/api/stories', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return res.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create story')
    }
  }
)

const createStorySlice = createSlice({
  name: 'createStory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStory.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(createStory.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(createStory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  }
})

export default createStorySlice.reducer
