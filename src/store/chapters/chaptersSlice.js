import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  loading: false,
  error: false,
  data: [],
};

export const getChaptersByID = createAsyncThunk(
    "chapters/getChaptersByID",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/chapters/${data.id}?page=1&limit=10`,
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


const chaptersSlice = createSlice({
  name: "chapters",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getChaptersByID.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChaptersByID.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getChaptersByID.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  },
});

export default chaptersSlice.reducer;
