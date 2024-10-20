import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../../services/api';

// Fetch distances from API
export const fetchDistances = createAsyncThunk(
	'distances/fetchDistances',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get('/Location/Province');
			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const fetchWard = createAsyncThunk(
	'distances/fetchWard',
	async (districtId, {rejectWithValue}) => {
		try {
			const response = await api.get(`/Location/Ward/${districtId}`);
			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const fetchDistrict = createAsyncThunk(
	'distances/fetchDistrict',
	async (provinceId, {rejectWithValue}) => {
		try {
			const response = await api.get(`/Location/District/${provinceId}`);
			return response;
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
		ward: null,
		district: null,
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
				state.distances = action.payload;
			})
			.addCase(fetchDistances.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(fetchWard.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchWard.fulfilled, (state, action) => {
				state.loading = false;
				state.ward = action.payload;
			})
			.addCase(fetchWard.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(fetchDistrict.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchDistrict.fulfilled, (state, action) => {
				state.loading = false;
				state.district = action.payload;
			})
			.addCase(fetchDistrict.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default distanceSlice.reducer;
