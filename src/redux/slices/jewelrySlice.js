import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getAllJewelryModel = createAsyncThunk(
	'jewelrySlice/getAllJewelryModel',
	async (params, {rejectWithValue}) => {
		console.log('params', params);

		try {
			const {Category, metalId, minPrice, maxPrice, IsEngravable, IsRhodiumFinished} = params;
			let url = '/JewelryModel/Selling';
			const queryParams = new URLSearchParams();

			if (Category) queryParams.append('Category', Category);
			if (metalId) queryParams.append('MetalId', metalId);
			if (IsEngravable !== undefined && IsEngravable !== null)
				queryParams.append('IsEngravable', IsEngravable);
			if (IsRhodiumFinished !== undefined && IsRhodiumFinished !== null)
				queryParams.append('IsRhodiumFinished', IsRhodiumFinished);
			if (minPrice) queryParams.append('MinPrice', minPrice);
			if (maxPrice) queryParams.append('MaxPrice', maxPrice);

			if (queryParams.toString()) {
				url += `?${queryParams.toString()}`;
			}

			const response = await api.get(url);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
		}
	}
);

export const getAllJewelry = createAsyncThunk(
	'jewelrySlice/getAllJewelry',
	async (params, {rejectWithValue}) => {
		console.log('params', params);

		try {
			const {
				CurrentPage,
				PageSize,
				ModelId,
				MetalId,
				SizeId,
				SideDiamondOptId,
				MinPrice,
				MaxPrice,
			} = params;
			let url = '/Jewelry/Selling';
			const queryParams = new URLSearchParams();

			if (CurrentPage) queryParams.append('CurrentPage', CurrentPage);
			if (PageSize) queryParams.append('PageSize', PageSize);
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
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
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
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
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
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
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
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
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
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
		}
	}
);

export const getJewelryDetailFile = createAsyncThunk(
	'jewelrySlice/getJewelryDetailFile',
	async (id, {rejectWithValue}) => {
		try {
			const response = await api.get(`/JewelryModelFiles/${id}/Files`);
			// const response = await api.get(`/all_jewelry`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
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
		jewelryDetailThumbnail: null,
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
				state.jewelries = null;
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
				state.jewelriesModel = null;
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
				state.jewelryDetail = null;
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
				state.metals = null;
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
				state.categories = null;
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
				state.jewelryDetailPreset = null;
			})
			.addCase(getJewelryDetailPreset.fulfilled, (state, action) => {
				state.loading = false;
				state.jewelryDetailPreset = action.payload;
			})
			.addCase(getJewelryDetailPreset.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getJewelryDetailFile.pending, (state) => {
				state.loading = true;
				state.jewelryDetailThumbnail = null;
			})
			.addCase(getJewelryDetailFile.fulfilled, (state, action) => {
				state.loading = false;
				state.jewelryDetailThumbnail = action.payload;
			})
			.addCase(getJewelryDetailFile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
