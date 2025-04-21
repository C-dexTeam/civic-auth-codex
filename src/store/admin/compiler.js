import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  errors: null,
  data: null,
};

export const fethcCompiler = createAsyncThunk(
  "compiler/fethcCompiler",
  async (params = {}) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/private/chapters/compilerNames`,
        { params }
      );
      return response.data?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);



const compilerSlice = createSlice({
  name: "compiler",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fethcCompiler.pending, (state) => {
        state.loading = true;
      })
      .addCase(fethcCompiler.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fethcCompiler.rejected, (state) => {
        state.loading = false;
      })
  },
});

export const getLoading = (state) => state.admin.courses.loading;
export const getCompiler = (state) => state.admin.compiler.data;
export const getCompilerLoading = (state) => state.admin.compiler.loading;

export default compilerSlice.reducer;
