import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../app/axios'

export const fetchContributors = createAsyncThunk(
  'contributors/fetchByStory',
  async (storyId: number, thunkAPI) => {
    try {
      const res = await api.get(`/contributors/${storyId}`)
      return res.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to load contributors')
    }
  }
)

export const addContributor = createAsyncThunk(
  'contributors/add',
  async ({ story_id, user_id }: { story_id: number; user_id: number }, thunkAPI) => {
    try {
      const res = await api.post('/contributors', { story_id, user_id })
      return res.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to add contributor')
    }
  }
)

export const addContributorByUsername = createAsyncThunk(
  'contributors/addByUsername',
  async ({ story_id, username }: { story_id: number; username: string }, thunkAPI) => {
    try {
      const res = await api.post('/contributors/by-username', { story_id, username })
      return res.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to add contributor by username')
    }
  }
)

export const deleteContributor = createAsyncThunk(
  'contributors/delete',
  async (id: number, thunkAPI) => {
    try {
      await api.delete(`/contributors/${id}`)
      return id
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete contributor')
    }
  }
)

const contributorSlice = createSlice({
  name: 'contributors',
  initialState: {
    list: [] as Array<{ id: number, userId: number, username: string }>,
    status: 'idle',
    error: null as string | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContributors.fulfilled, (state, action) => {
        state.list = action.payload
        state.status = 'succeeded'
      })
      .addCase(addContributor.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(addContributorByUsername.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(deleteContributor.fulfilled, (state, action) => {
        state.list = state.list.filter(c => c.id !== action.payload)
        state.status = 'succeeded'
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => { state.status = 'loading'; state.error = null }
      )
     .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
            state.status = 'failed';
            state.error = (action as any).payload as string;
        }
)
  }
})

export default contributorSlice.reducer
