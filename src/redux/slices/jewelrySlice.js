import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getAllJewelryModel = createAsyncThunk(
	'jewelrySlice/getAllJewelryModel',
	async (params, {rejectWithValue}) => {
		console.log('params', params);

		try {
			const {Category, metalId, minPrice, maxPrice} = params;
			let url = '/JewelryModel/Selling';
			const queryParams = new URLSearchParams();

			if (Category) queryParams.append('Category', Category);
			if (metalId) queryParams.append('MetalId', metalId);
			if (minPrice) queryParams.append('MinPrice', minPrice);
			if (maxPrice) queryParams.append('MaxPrice', maxPrice);

			if (queryParams.toString()) {
				url += `?${queryParams.toString()}`;
			}

			const response = await api.get(url);
			// const response = await api.get(`/all_jewelry`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const getAllJewelry = createAsyncThunk(
	'jewelrySlice/getAllJewelry',
	async (params, {rejectWithValue}) => {
		console.log('params', params);

		try {
			const {ModelId, MetalId, SizeId, SideDiamondOptId, MinPrice, MaxPrice} = params;
			let url = '/Jewelry/Selling';
			const queryParams = new URLSearchParams();

			if (ModelId) queryParams.append('ModelId', ModelId);
			if (MetalId) queryParams.append('MetalId', MetalId);
			if (SizeId) queryParams.append('SizeId', SizeId);
			if (SideDiamondOptId) queryParams.append('SideDiamondOptId', SideDiamondOptId);
			if (MinPrice) queryParams.append('MinPrice', MinPrice);
			if (MaxPrice) queryParams.append('MaxPrice', MaxPrice);

			if (queryParams.toString()) {
				url += `?${queryParams.toString()}`;
			}

			const response = await api.get(url);
			// const response = await api.get(`/all_jewelry`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const getAllJewelryMetal = createAsyncThunk(
	'jewelrySlice/getAllJewelryMetal',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get(`/JewelryModel/Metal/All`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const getAllJewelryModelCategory = createAsyncThunk(
	'jewelrySlice/getAllJewelryModelCategory',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get(`/JewelryModelCategory/All`);
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
			const response = await api.get(`/JewelryModel/Selling/Detail?modelId=${id}`);
			// const response = await api.get(`/all_jewelry`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const getJewelryDetailPreset = createAsyncThunk(
	'jewelrySlice/getJewelryDetailPreset',
	async (id, {rejectWithValue}) => {
		console.log('idpreset', id);

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
		jewelryDetailPreset: null,
		metals: null,
		categories: null,
		cartItems: [],
		loading: false,
		error: null,
	},
	reducers: {},
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
			})
			.addCase(getAllJewelryMetal.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllJewelryMetal.fulfilled, (state, action) => {
				state.loading = false;
				state.metals = action.payload;
			})
			.addCase(getAllJewelryMetal.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getAllJewelryModelCategory.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllJewelryModelCategory.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = action.payload;
			})
			.addCase(getAllJewelryModelCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getJewelryDetailPreset.pending, (state) => {
				state.loading = true;
			})
			.addCase(getJewelryDetailPreset.fulfilled, (state, action) => {
				state.loading = false;
				state.jewelryDetailPreset = action.payload;
			})
			.addCase(getJewelryDetailPreset.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
