import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../app/axios';

export const deleteStory = createAsyncThunk(
  'stories/delete',
  async (id: number, thunkAPI) => {
    try {
      await api.delete(`/stories/${id}`);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete story');
    }
  }
);

const deleteSlice = createSlice({
  name: 'deleteStory',
  initialState: { status: 'idle', error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteStory.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(deleteStory.fulfilled, (state) => { state.status = 'succeeded'; })
      .addCase(deleteStory.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload as string; });
  },
});

export default deleteSlice.reducer;
