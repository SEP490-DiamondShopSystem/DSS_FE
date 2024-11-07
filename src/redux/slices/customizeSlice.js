import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getAllJewelryModelCustomize = createAsyncThunk(
	'customizeSlice/getAllJewelryModelCustomize',
	async (params, {rejectWithValue}) => {
		console.log('params', params);

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
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const handleSendRequest = createAsyncThunk(
	'customizeSlice/handleSendRequest',
	async (body, {rejectWithValue}) => {
		console.log('body', JSON.stringify(body));

		try {
			const response = await api.post(`/CustomizeRequest/Send`, body);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const getJewelryModelDetail = createAsyncThunk(
	'jewelrySlice/getJewelryModelDetail',
	async ({id}, {rejectWithValue}) => {
		try {
			const response = await api.get(`/JewelryModel/Customize/Detail?modelId=${id}`);
			// const response = await api.get(`/all_jewelry`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const customizeSlice = createSlice({
	name: 'customizeSlice',
	initialState: {
		jewelriesModel: null,
		jewelryDetail: null,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder

			.addCase(getAllJewelryModelCustomize.pending, (state) => {
				state.loading = true;
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
			})
			.addCase(handleSendRequest.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(handleSendRequest.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
