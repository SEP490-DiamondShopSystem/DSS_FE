import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getShopLocation = createAsyncThunk(
	'locationSlice/getShopLocation',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get(`Configuration/LocationRules`);
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const locationSlice = createSlice({
	name: 'locationSlice',
	initialState: {
		loading: false,
		error: null,
		shopLocation: {},
	},
	reducers: {},
	extraReducers: (builder) => {
		builder

			.addCase(getShopLocation.pending, (state) => {
				state.loading = true;
			})
			.addCase(getShopLocation.fulfilled, (state, action) => {
				state.loading = false;
				state.shopLocation = action.payload;
			})
			.addCase(getShopLocation.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
