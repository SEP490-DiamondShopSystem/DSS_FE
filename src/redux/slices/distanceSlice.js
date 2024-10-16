import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../../services/api';

// Fetch distances from API
export const fetchDistances = createAsyncThunk(
	'distances/fetchDistances',
	async (_, {rejectWithValue}) => {
		console.log('Fetching distances...');
		try {
			const response = await api.get('/distance');
			console.log('Full response: ', response); // Log the entire response object
			return response; // Adjust according to the structure of response
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

// Create the distance slice
export const distanceSlice = createSlice({
	name: 'distanceSlice',
	initialState: {
		distances: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDistances.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchDistances.fulfilled, (state, action) => {
				state.loading = false;
				state.distances = action.payload; // Adjust to match actual data path
			})
			.addCase(fetchDistances.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default distanceSlice.reducer;
