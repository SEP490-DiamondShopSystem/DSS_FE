import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../../services/api';

// Async Thunks
export const fetchDiamondFiles = createAsyncThunk(
	'files/fetchDiamondFiles',
	async (diamondId, {rejectWithValue}) => {
		try {
			const response = await api.get(`/Diamond/${diamondId}/Files`);
			return response;
		} catch (error) {
			return rejectWithValue(error.response || error.message);
		}
	}
);
export const fetchJewelryModelFiles = createAsyncThunk(
	'jewelryModelFiles/fetchJewelryModelFiles',
	async (jewelryModelId, {rejectWithValue}) => {
		try {
			const response = await api.get(`/JewelryModelFiles/${jewelryModelId}/Files`);
			return response;
		} catch (error) {
			return rejectWithValue(error.response || error.message);
		}
	}
);

// Slice
export const fileSlice = createSlice({
	name: 'fileSlice',
	initialState: {
		files: {},
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Fetch Diamond Files
			.addCase(fetchDiamondFiles.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchDiamondFiles.fulfilled, (state, action) => {
				state.loading = false;
				state.files = action.payload;
			})
			.addCase(fetchDiamondFiles.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// Fetch Jewelry Model Files
			.addCase(fetchJewelryModelFiles.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchJewelryModelFiles.fulfilled, (state, action) => {
				state.loading = false;
				state.files = action.payload;
			})
			.addCase(fetchJewelryModelFiles.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
