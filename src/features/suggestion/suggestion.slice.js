import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchSuggestion =
  createAsyncThunk(
    /* Task 15: Complete the `createAsyncThunk()` function to load a suggestion from this URL: http://localhost:3004/api/suggestion */
    'photos/suggestion',
    async () => {
      const response = await fetch('http://localhost:3004/api/suggestion');
      const data = await response.json();
      return data.data;
    }
  );

const initialState = {
  suggestion: '',
  loading: false,
  error: null,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers:  {
    // Task 16: Handle pending, fulfilled, and rejected states for fetchSuggestion()

    [fetchSuggestion.pending]: (state) => { 
      state.loading = true; 
      state.error = null; 
    },
      [fetchSuggestion.fulfilled]: (state, action) => {
        state.loading = false;
        state.error = null;
        state.suggestion = action.payload;
      },
      [fetchSuggestion.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    }
};

const suggestionSlice = createSlice(options);


// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion.suggestion;


export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
export default suggestionSlice.reducer;

