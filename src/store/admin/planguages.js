import { showToast } from "@/utils/showToast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  errors: null,
  data: null,
  planguage: null,
};

export const fetchPlanguages = createAsyncThunk(
  "planguages/fetchPlanguages",
  async (params = {}) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/private/planguages`,
        { params }
      );
      return response.data?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const fetchPlanguage = createAsyncThunk(
  "planguages/fetchPlanguage",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/private/planguages/${id}`
      );
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deletePlanguages = createAsyncThunk(
  "planguages/deletePlanguages",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/planguages/${id}`
      );
      return { id: id };
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const createPlanguages = createAsyncThunk(
  "planguages/createPlanguages",
  async ({ formData, callback }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/planguages`,
        formData
      );

      dispatch(fetchPlanguage());
      callback();

      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updatePlanguages = createAsyncThunk(
  "planguages/updatePlanguages",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/planguages`,
      );
      return response.data?.data;
    } catch (error) {
      console.log("error", error);

      return rejectWithValue(error.response);
    }
  }
);

const planguageSlice = createSlice({
  name: "planguages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanguages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlanguages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPlanguages.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchPlanguage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlanguage.fulfilled, (state, action) => {
        state.loading = false;
        state.planguage = action.payload;
      })
      .addCase(fetchPlanguage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deletePlanguages.pending, (state) => {
        state.loading = true;
        showToast("dismiss");
        showToast("success", "Languages deleting...");
      })
      .addCase(deletePlanguages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (planguages) => planguages.id !== action.payload.id
        );
        showToast("dismiss");
        showToast("success", "Languages deleted successfully");
      })
      .addCase(deletePlanguages.rejected, (state) => {
        state.loading = false;
        showToast("dismiss");
        showToast("error", "Failed to delete languages");
      })
      .addCase(createPlanguages.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPlanguages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...(state.data || []), action.payload];
      })
      .addCase(createPlanguages.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updatePlanguages.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(updatePlanguages.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (planguage) => planguage.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updatePlanguages.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload?.data?.errors;
        showToast("error", "Failed to update planguage");
      });
  },
});

export const getLoading = (state) => state.admin.courses.loading;
export const getPlanguages = (state) => state.admin.planguages.data;
export const getPlanguage = (state) => state.admin.planguages.planguage;

export default planguageSlice.reducer;
