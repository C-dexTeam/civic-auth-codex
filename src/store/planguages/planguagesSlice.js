import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  loading: false,
  error: false,
  data: [],
};

export const getAllPlanguages = createAsyncThunk(
  "planguages/planguages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/planguages`,
        headers: {
          "Content-Type": "application/json",
        },

      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(response.message || error.message);
    }
  }
);


const planguagesSlice = createSlice({
  name: "planguages",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlanguages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPlanguages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllPlanguages.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  },
});

export const getProgrammingLanguages = (state) => state.planguages.data.data;

export default planguagesSlice.reducer;
