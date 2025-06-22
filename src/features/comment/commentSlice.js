import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = import.meta.env.VITE_BACK_END_HOST;

const initialState = {
  loading: false,
  comments: [],
  error: null,
}

export const fetchComments = createAsyncThunk('comments/fetch', async articleId => {
  console.log(articleId);
  
  const res = await axios.get(`${API}/comments/${articleId}`)
  console.log(res);
  
  return res.data.data
})

export const createComment = createAsyncThunk('comments/create', async ({ articleId, content }, thunkAPI) => {
  const token = thunkAPI.getState().auth.token
  const res = await axios.post(`${API}/comments`, { articleId, content }, {
    headers: { Authorization: `Bearer ${token}` },  
  })
  return res.data
})

export const deleteComment = createAsyncThunk('comments/delete', async ({ commentId }, thunkAPI) => {
  const token = thunkAPI.getState().auth.token
  const res = await axios.delete(`${API}/comments/${commentId}`)
  return commentId
})

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(comment => comment.id !== action.payload)
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
      })
  },
})

export default commentSlice.reducer
