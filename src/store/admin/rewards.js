import { showToast } from '@/utils/showToast';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    data: null,
    reward: null,
    totalCount: 0,
    filters: {
        page: 1,
        limit: 10,
        name: "",
    }
};

/**
 * Fetch rewards with optional query parameters.
 * 
 * @param {Object} params - Query parameters for fetching rewards.
 * @param {string} params.rewardID - Reward id.
 * @param {string} params.name - Reward name.
 * @param {string} params.symbol - Reward symbol.
 * @param {string} params.rewardType - Reward Title.
 * @param {string} params.page - Page number.
 * @param {string} params.limit - Number of items per page.
 */
export const fetchRewards = createAsyncThunk('rewards/fetchRewards', async (_, { rejectWithValue, getState }) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/private/rewards`, { params: { ...getState().admin.rewards.filters } });
        return response.data?.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

/** 
 * Fetch a reward by ID.
 * 
 * @param {string} id - Reward ID (required).
 */
export const fetchReward = createAsyncThunk('rewards/fetchReward', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/private/rewards/${id}`);
        return response.data?.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

/**
 * Create a new reward.
 * 
 * @param {FormData} formData - Form data containing reward details.
 * @param {File} formData.imageFile - Reward Image File (required).
 * @param {string} formData.name - Reward name (required).
 * @param {string} formData.description - Reward description (optional).
 * @param {string} formData.rewardType - Reward Type (required).
 * @param {string} formData.sellerFee - Seller Fee (optional).
 * @param {string} formData.symbol - Reward Symbol (required).
 */
export const createReward = createAsyncThunk('rewards/createReward', async ({ formData, callback }, { dispatch, rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/rewards`, formData);
        dispatch(fetchRewards());
        if (callback) callback();
        return response.data?.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

/**
 * Update an existing reward.
 * 
 * @param {FormData} formData - Form data containing reward details.
 * @param {File} formData.id - Reward id (required).
 * @param {File} formData.imageFile - Reward Image File (optional).
 * @param {string} formData.name - Reward name (optional).
 * @param {string} formData.description - Reward description (optional).
 * @param {string} formData.rewardType - Reward Type (optional).
 * @param {string} formData.sellerFee - Seller Fee (optional).
 * @param {string} formData.symbol - Reward Symbol (optional).
 */
export const updateReward = createAsyncThunk('rewards/updateReward', async ({ formData, callback }, { dispatch, rejectWithValue }) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/rewards`, formData);

        dispatch(fetchRewards());

        if (callback) callback();

        return response.data?.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

/**
 * Delete a reward by ID.
 * 
 * @param {string} id - Reward ID (required).
 */
export const deleteReward = createAsyncThunk('rewards/deleteReward', async (id, { rejectWithValue, dispatch }) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/rewards/${id}`);
        dispatch(fetchRewards());
        return response.data?.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

const rewardsSlice = createSlice({
    name: 'rewards',
    initialState,
    reducers: {
        setCurrentReward: (state, action) => {
            state.reward = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRewards.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRewards.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload?.rewards || []
                state.totalCount = action.payload?.totalCount || 0
            })
            .addCase(fetchRewards.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchReward.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReward.fulfilled, (state, action) => {
                state.loading = false;
                state.reward = action.payload;
            })
            .addCase(fetchReward.rejected, (state) => {
                state.loading = false;
            })
            .addCase(createReward.pending, (state) => {
                state.loading = true;
                showToast("dismiss");
                showToast("loading", "Creating reward...");
            })
            .addCase(createReward.fulfilled, (state, action) => {
                state.loading = false;
                showToast("dismiss");
                showToast("success", "Reward created successfully");
            })
            .addCase(createReward.rejected, (state) => {
                state.loading = false;
                showToast("dismiss");
                showToast("error", "Reward created failed");
            })
            .addCase(updateReward.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateReward.fulfilled, (state, action) => {
                state.loading = false;
                showToast("dismiss");
                showToast("success", "Reward updated successfully");
            })
            .addCase(updateReward.rejected, (state) => {
                state.loading = false;
                showToast("dismiss");
                showToast("error", "Reward updated failed");
            })
            .addCase(deleteReward.pending, (state) => {
                state.loading = true;
                showToast("dismiss");
                showToast("error", "Reward deleted successfully");
            })
            .addCase(deleteReward.fulfilled, (state, action) => {
                state.loading = false;
                showToast("dismiss");
                showToast("success", "Reward deleted successfully");
            })
            .addCase(deleteReward.rejected, (state) => {
                state.loading = false;
                showToast("dismiss");
                showToast("error", "Reward deleted failed");
            });
    },
});

export const getLoading = (state) => state.admin.rewards.loading;
export const getReward = (state) => state.admin.rewards.reward;
export const getRewards = (state) => state.admin.rewards.data;
export const getCurrentReward = (state) => state.admin.rewards.reward;
export const getTotalCount = (state) => state.admin.rewards.totalCount;
export const getFilters = (state) => state.admin.rewards.filters;

export const { setCurrentReward, setFilters } = rewardsSlice.actions;

export default rewardsSlice.reducer;
