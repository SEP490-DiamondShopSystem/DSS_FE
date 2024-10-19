import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getAllPromo = createAsyncThunk(
	'promotionSlice/getAllPromo',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get(`/Promotion`);
			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const promotionSlice = createSlice({
	name: 'promotion',
	initialState: {
		promotion: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllPromo.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllPromo.fulfilled, (state, action) => {
				state.loading = false;
				state.promotion = action.payload;
			})
			.addCase(getAllPromo.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

// Export actions và reducer
