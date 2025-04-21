import { showToast } from "@/utils/showToast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: [],
  popoularData: [],
};

export const getAllCourses = createAsyncThunk(
  "courses/getAllCourses",
  async (data, { rejectWithValue }) => {
    console.log("sfasdf", data);
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/courses?title=${data.title}&pLanguageID=${data.pLanguageID}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(response.message || error.message);
    }
  }
);

export const getCoursesByID = createAsyncThunk(
  "courses/getCoursesByID",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/courses/${data.id}?page=1&limit=10`,
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

export const getPopularCourses = createAsyncThunk(
  "courses/getPopularCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/courses/popular?page=1&limit=3`,
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

export const startCourse = createAsyncThunk(
  "courses/startCourse",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/private/courses/start`,
        headers: {
          "Content-Type": "application/json",
        },
        data: id,
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(response.message || error.message);
    }
  }
);


const coursesSlice = createSlice({
  name: "courses",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
        console.log("qwewqeqwe");
        
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        console.log("qwewqeqwe1");
        
        state.data = action.payload.courses;
        state.total = action.payload.courseCount;
      })
      .addCase(getAllCourses.rejected, (state) => {
        state.loading = false;
        state.error = true;
        console.log("qwewqeqwe2");
      })
      .addCase(getPopularCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPopularCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.popoularData = action.payload;
      })
      .addCase(getPopularCourses.rejected, (state) => {
        state.loading = false;
        state.error;
      })
      .addCase(getCoursesByID.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCoursesByID.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCoursesByID.rejected, (state) => {
        state.loading = false;
        state.error;
      })
      .addCase(startCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(startCourse.fulfilled, (state, action) => {
        state.loading = false;
        showToast("dismiss")
        showToast("success", "Course started successfully");
      })
      .addCase(startCourse.rejected, (state) => {
        state.loading = false;
        state.error;
        showToast("dismiss")
        showToast("error", "Failed to start course");
      });
  },
});

export const getCourses = (state) => state.courses.data;

export default coursesSlice.reducer;
