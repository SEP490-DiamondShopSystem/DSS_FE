import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getAllJewelryModelCustomize = createAsyncThunk(
	'customizeSlice/getAllJewelryModelCustomize',
	async (params, {rejectWithValue}) => {
		try {
			const {page, take, name, Category, IsRhodiumFinished, IsEngravable} = params;
			let url = '/JewelryModel/Customize/All';
			const queryParams = new URLSearchParams();

			if (Category) queryParams.append('Category', Category);
			if (take) queryParams.append('take', take);
			if (page) queryParams.append('page', page);
			if (name) queryParams.append('name', name);
			if (IsRhodiumFinished !== null && IsRhodiumFinished !== undefined) {
				queryParams.append('IsRhodiumFinished', IsRhodiumFinished);
			}
			if (IsEngravable !== null && IsEngravable !== undefined) {
				queryParams.append('IsEngravable', IsEngravable);
			}

			if (queryParams.toString()) {
				url += `?${queryParams.toString()}`;
			}

			const response = await api.get(url);

			return response;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	}
);

export const handleSendRequest = createAsyncThunk(
	'customizeSlice/handleSendRequest',
	async (body, {rejectWithValue}) => {
		try {
			const response = await api.post(`/CustomizeRequest/Send`, body);

			return response;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	}
);

export const getJewelryModelDetail = createAsyncThunk(
	'customizeSlice/getJewelryModelDetail',
	async ({id}, {rejectWithValue}) => {
		try {
			const response = await api.get(`/JewelryModel/Customize/Detail?modelId=${id}`);
			// const response = await api.get(`/all_jewelry`);

			return response;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	}
);

export const getAllRequestUser = createAsyncThunk(
	'customizeSlice/getAllRequestUser',
	async (params, {rejectWithValue}) => {
		try {
			const {CurrentPage, PageSize, CreatedDate, ExpiredDate, Status} = params;
			let url = '/CustomizeRequest/Customer/All';
			const queryParams = new URLSearchParams();

			if (CurrentPage) queryParams.append('CurrentPage', CurrentPage);
			if (PageSize) queryParams.append('PageSize', PageSize);
			if (CreatedDate) queryParams.append('CreatedDate', CreatedDate);
			if (ExpiredDate) queryParams.append('ExpiredDate', ExpiredDate);
			if (Status) queryParams.append('Status', Status);

			if (queryParams.toString()) {
				url += `?${queryParams.toString()}`;
			}

			const response = await api.get(url);

			return response;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	}
);

export const getRequestCustomizeDetail = createAsyncThunk(
	'customizeSlice/getRequestCustomizeDetail',
	async (id, {rejectWithValue}) => {
		try {
			const response = await api.get(`/CustomizeRequest/Customer/Detail?requestId=${id}`);

			return response;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	}
);

export const handleOrderCustomizeProceed = createAsyncThunk(
	'orderSlice/handleOrderCustomizeProceed',
	async (id, {rejectWithValue}) => {
		try {
			const response = await api.put(`/CustomizeRequest/Proceed?CustomizeRequestId=${id}`);

			return response;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	}
);

export const handleOrderCustomizeReject = createAsyncThunk(
	'orderSlice/handleOrderCustomizeReject',
	async (id, {rejectWithValue}) => {
		try {
			const response = await api.put(`/CustomizeRequest/Reject?CustomizeRequestId=${id}`);

			return response;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	}
);

export const handleOrderCustomizeCancel = createAsyncThunk(
	'orderSlice/handleOrderCustomizeCancel',
	async (id, {rejectWithValue}) => {
		try {
			const response = await api.put(`/CustomizeRequest/Cancel?CustomizeRequestId=${id}`);

			return response;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	}
);

export const handleOrderCustomizeCheckout = createAsyncThunk(
	'orderSlice/handleOrderCustomizeCheckout',
	async (body, {rejectWithValue}) => {
		try {
			const response = await api.post(`/CustomizeRequest/Checkout`, body);

			return response;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	}
);

export const customizeSlice = createSlice({
	name: 'customizeSlice',
	initialState: {
		jewelriesModel: null,
		jewelryDetail: null,
		requestByUser: null,
		requestByUserDetail: null,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder

			.addCase(getAllJewelryModelCustomize.pending, (state) => {
				state.loading = true;
				state.jewelriesModel = null;
				state.error = null;
			})
			.addCase(getAllJewelryModelCustomize.fulfilled, (state, action) => {
				state.loading = false;
				state.jewelriesModel = action.payload;
			})
			.addCase(getAllJewelryModelCustomize.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getJewelryModelDetail.pending, (state) => {
				state.loading = true;
				state.jewelryDetail = null;
				state.error = null;
			})
			.addCase(getJewelryModelDetail.fulfilled, (state, action) => {
				state.loading = false;
				state.jewelryDetail = action.payload;
			})
			.addCase(getJewelryModelDetail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(handleSendRequest.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(handleSendRequest.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(handleSendRequest.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getAllRequestUser.pending, (state) => {
				state.loading = true;
				state.requestByUser = null;
				state.error = null;
			})
			.addCase(getAllRequestUser.fulfilled, (state, action) => {
				state.loading = false;
				state.requestByUser = action.payload;
			})
			.addCase(getAllRequestUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getRequestCustomizeDetail.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.requestByUserDetail = null;
			})
			.addCase(getRequestCustomizeDetail.fulfilled, (state, action) => {
				state.loading = false;
				state.requestByUserDetail = action.payload;
			})
			.addCase(getRequestCustomizeDetail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(handleOrderCustomizeProceed.pending, (state) => {
				state.loading = true;
				state.requestByUserDetail = null;
				state.error = null;
			})
			.addCase(handleOrderCustomizeProceed.fulfilled, (state, action) => {
				state.loading = false;
				state.requestByUserDetail = action.payload;
			})
			.addCase(handleOrderCustomizeProceed.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(handleOrderCustomizeCheckout.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(handleOrderCustomizeCheckout.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(handleOrderCustomizeCheckout.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(handleOrderCustomizeReject.pending, (state) => {
				state.loading = true;
				state.requestByUserDetail = null;
				state.error = null;
			})
			.addCase(handleOrderCustomizeReject.fulfilled, (state, action) => {
				state.loading = false;
				state.requestByUserDetail = action.payload;
			})
			.addCase(handleOrderCustomizeReject.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(handleOrderCustomizeCancel.pending, (state) => {
				state.loading = true;
				state.requestByUserDetail = null;
				state.error = null;
			})
			.addCase(handleOrderCustomizeCancel.fulfilled, (state, action) => {
				state.loading = false;
				state.requestByUserDetail = action.payload;
			})
			.addCase(handleOrderCustomizeCancel.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
