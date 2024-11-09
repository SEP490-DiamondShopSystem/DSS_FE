import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getAllWarranty = createAsyncThunk(
	'warrantySlice/getAllWarranty',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get(`/Warranty/All`);
			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const warrantySlice = createSlice({
	name: 'warranty',
	initialState: {
		warranties: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllWarranty.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllWarranty.fulfilled, (state, action) => {
				state.loading = false;
				state.warranties = action.payload;
			})
			.addCase(getAllWarranty.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

// Export actions và reducer
