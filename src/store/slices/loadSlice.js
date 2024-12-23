import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../utils/api';

export const fetchLoads = createAsyncThunk(
  'loads/fetchLoads',
  async (filters) => {
    const response = await apiService.loads.getAll(filters);
    return response.data;
  }
);

const loadSlice = createSlice({
  name: 'loads',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    filters: {
      radius: 50,
      location: null,
      loadType: null
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoads.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoads.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchLoads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setFilters } = loadSlice.actions;
export default loadSlice.reducer; 