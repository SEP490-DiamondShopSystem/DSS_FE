import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getAllJewelry = createAsyncThunk(
	'jewelrySlice/getAllJewelry',
	async (_, {rejectWithValue}) => {
		try {
			// const response = await api.get(`/Jewelry/All`);
			const response = await api.get(`/Jewelry_Selling`);
			// const response = await api.get(`/all_jewelry`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const getAllJewelryModel = createAsyncThunk(
	'jewelrySlice/getAllJewelryModel',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get(`/JewelryModel/All`);
			// const response = await api.get(`/all_jewelry`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const getJewelryDetail = createAsyncThunk(
	'jewelrySlice/getAllJewelryDetail',
	async ({id}, {rejectWithValue}) => {
		try {
			const response = await api.get(`/Jewelry/Detail/${id}`);
			// const response = await api.get(`/all_jewelry`);
			console.log(response);

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
		jewelriesModel: null,
		jewelryDetail: null,
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
			})
			.addCase(getAllJewelryModel.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllJewelryModel.fulfilled, (state, action) => {
				state.loading = false;
				state.jewelriesModel = action.payload;
			})
			.addCase(getAllJewelryModel.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getJewelryDetail.pending, (state) => {
				state.loading = true;
			})
			.addCase(getJewelryDetail.fulfilled, (state, action) => {
				state.loading = false;
				state.jewelryDetail = action.payload;
			})
			.addCase(getJewelryDetail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
