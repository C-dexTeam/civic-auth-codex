import { showToast } from "@/utils/showToast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  loading: false,
  error: false,
  data: [],
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue,dispatch }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/user/profile`,
        headers: {
          "Content-Type": "application/json",
        },
        
      });
      if (response.status === 200) {
        dispatch(getProfile());
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(response.message || error.message);
    }
  }
);

export const getStrike = createAsyncThunk(
  "profile/getStrike",
  async (_, { rejectWithValue,dispatch }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/user/streak`,
        headers: {
          "Content-Type": "application/json",
        },
        
      });
      if (response.status === 200) {
        dispatch(getProfile());
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(response.message || error.message);
    }
  }
);


const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
        .addCase(getStrike.pending, (state) => {
            state.loading = true;
        })
        .addCase(getStrike.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            showToast("dismiss")
            showToast("success", "Congratulations! You take a step forward to your goal.");
        })
        .addCase(getStrike.rejected, (state) => {
            state.loading = false;
            state.error = true;
            showToast("dismiss")
            showToast("error", "Opss, I think you have already taken a step today.");
        })
        .addCase(getProfile.pending, (state) => {
            state.loading = true;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(getProfile.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
  },
});

export default profileSlice.reducer;
