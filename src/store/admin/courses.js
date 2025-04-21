import { showToast } from '@/utils/showToast';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    errors: null,
    data: null,
    course: null,
    totalCount: 0,
    filters: {
        page: 1,
        limit: 10,
        title: "",
    }
};

/**
 * Fetch courses with optional query parameters.
 * 
 * @param {Object} params - Query parameters for fetching courses.
 * @param {string} params.id - Course ID.
 * @param {string} params.languageID - Language ID.
 * @param {string} params.pLanguageID - Programming Language ID.
 * @param {string} params.title - Course Title.
 * @param {string} params.page - Page number.
 * @param {string} params.limit - Number of items per page.
 */
export const fetchCourses = createAsyncThunk('adminCourses/fetchCourses', async (_, { rejectWithValue, getState }) => {

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/private/courses`, { params: { ...getState().admin.adminCourses.filters } });
        return response.data?.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const fetchCourse = createAsyncThunk('adminCourses/fetchCourse', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/private/courses/${id}`);
        return response.data?.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});


/**
 * Create a new course.
 * 
 * @param {FormData} formData - Form data containing course details.
 * @param {File} formData.imageFile - Course Image File (required).
 * @param {string} [formData.description] - Course description (optional).
 * @param {string} [formData.languageID] - Language ID (optional).
 * @param {string} formData.programmingLanguageID - Programming Language ID (required).
 * @param {number} [formData.rewardAmount] - Reward Amount (optional).
 * @param {string} [formData.rewardID] - Reward ID (optional).
 * @param {string} formData.title - Course Title (required).
 */
export const createCourse = createAsyncThunk('adminCourses/createCourse', async ({ formData, callback }, { dispatch, rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/courses`, formData);

        dispatch(fetchCourses());
        callback()

        return response.data?.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

/**
 * Update an existing course.
 * 
 * @param {FormData} formData - Form data containing updated course details.
 * @param {File} formData.imageFile - Course Image File (required).
 * @param {string} [formData.description] - Course description (optional).
 * @param {string} formData.id - Course ID (required).
 * @param {string} [formData.languageID] - Language ID (optional).
 * @param {string} formData.programmingLanguageID - Programming Language ID (required).
 * @param {number} [formData.rewardAmount] - Reward Amount (optional).
 * @param {string} [formData.rewardID] - Reward ID (optional).
 * @param {string} formData.title - Course Title (required).
 */
export const updateCourse = createAsyncThunk('adminCourses/updateCourse', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/courses`, formData);
        dispatch(fetchCourses());
        return response.data?.data;
    } catch (error) {
        console.log("error", error);

        return rejectWithValue(error.response);
    }
});

/**
 * Delete a course by ID.
 * 
 * @param {string} id - Course ID (required).
 */
export const deleteCourse = createAsyncThunk('adminCourses/deleteCourse', async (id, { rejectWithValue, dispatch }) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/courses/${id}`);
        dispatch(fetchCourses());
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

const adminCoursesSlice = createSlice({
    name: 'adminCourses',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.loading = false;

                state.data = action.payload.courses;
                state.totalCount = action.payload.totalCount;
            })
            .addCase(fetchCourses.rejected, (state) => {
                state.loading = false;
            })
            .addCase(createCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createCourse.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateCourse.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.loading = false;

                showToast("dismiss")
                showToast("error", "Failed to update course");
            })
            .addCase(deleteCourse.pending, (state) => {
                state.loading = true;
                showToast("dismiss")
                showToast("success", "Course deleting...");
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.loading = false;
                showToast("dismiss")
                showToast("success", "Course deleted successfully");
            })
            .addCase(deleteCourse.rejected, (state) => {
                state.loading = false;
                showToast("dismiss")
                showToast("error", "Failed to delete course");
            })
            .addCase(fetchCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.course = action.payload;
            })
            .addCase(fetchCourse.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const getLoading = (state) => state.admin.adminCourses.loading;
export const getCourses = (state) => state.admin.adminCourses.data;
export const getCourseCount = (state) => state.admin.adminCourses.total;
export const getCourse = (state) => state.admin.adminCourses.course;
export const getErrors = (state) => state.admin.adminCourses.errors;
export const getFilters = (state) => state.admin.adminCourses.filters;
export const getTotalCount = (state) => state.admin.adminCourses.totalCount;

export default adminCoursesSlice.reducer;
