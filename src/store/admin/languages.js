import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunk
export const fetchLanguages = createAsyncThunk(
    'languages/fetchLanguages',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/private/language/')
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error fetching languages')
        }
    }
)

// Initial state
const initialState = {
    languages: [],
    loading: false,
    error: null
}

// Slice
const languagesSlice = createSlice({
    name: 'languages',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        // Fetch Languages
        builder
            .addCase(fetchLanguages.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchLanguages.fulfilled, (state, action) => {
                state.loading = false
                state.languages = action.payload
            })
            .addCase(fetchLanguages.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

// Selectors
export const getLanguages = (state) => state.admin.languages.languages
export const getLanguagesLoading = (state) => state.admin.languages.loading
export const getLanguagesError = (state) => state.admin.languages.error

// Export actions
export const { clearError } = languagesSlice.actions

// Export reducer
export default languagesSlice.reducer 