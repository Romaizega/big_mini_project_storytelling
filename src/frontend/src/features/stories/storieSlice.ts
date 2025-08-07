import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../app/axios'

export interface Story {
  id: number
  title: string
  content: string
  author_id: number
  created_at: string
  updated_at: string
}

interface StoriesState {
  stories: Story[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: StoriesState = {
  stories: [],
  status: 'idle',
  error: null,
}


export const fetchStories = createAsyncThunk('stories/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await api.get('/stories')
    return res.data
  } catch (err: any) {
    console.error('Error fetching stories:', err?.response || err)
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to load stories')
  }
})

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.stories = action.payload
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  },
})

export default storiesSlice.reducer
