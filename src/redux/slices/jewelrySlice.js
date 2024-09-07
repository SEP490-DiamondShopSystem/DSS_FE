import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getAllJewelry = createAsyncThunk(
	'jewelrySlice/getAllJewelry',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get(`/all_jewelry`);
			// console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const jewelrySlice = createSlice({
	name: 'jewelrySlice',
	initialState: {
		jewelries: null,
		loading: false,
		error: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.userInfo = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllJewelry.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllJewelry.fulfilled, (state, action) => {
				state.loading = false;
				state.jewelries = action.payload;
			})
			.addCase(getAllJewelry.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
