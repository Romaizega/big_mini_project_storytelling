import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../app/axios'

interface UpdatePayload {
  id: number
  title: string
  content: string
}

interface UpdateState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UpdateState = {
  status: 'idle',
  error: null
}

export const updateStory = createAsyncThunk(
  'stories/update',
  async ({ id, title, content }: UpdatePayload, thunkAPI) => {
    try {
      const res = await api.patch(`/stories/${id}`, { title, content })
      return res.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update story')
    }
  }
)

const updateStorySlice = createSlice({
  name: 'updateStory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateStory.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(updateStory.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(updateStory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  }
})

export default updateStorySlice.reducer
