import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getAllDiamond = createAsyncThunk(
	'diamondSlice/getAllDiamond',
	async (params, {rejectWithValue}) => {
		try {
			const {
				pageSize,
				start,
				shapeId,
				cutFrom,
				cutTo,
				colorFrom,
				colorTo,
				clarityFrom,
				clarityTo,
				caratFrom,
				caratTo,
				isLab,
			} = params;
			let url = '/Diamond/Page';
			const queryParams = new URLSearchParams();

			if (pageSize) queryParams.append('pageSize', pageSize);
			if (start) queryParams.append('start', start);
			if (shapeId) queryParams.append('shapeId', shapeId);
			if (cutFrom) queryParams.append('diamond_4C.cutFrom', cutFrom);
			if (cutTo) queryParams.append('diamond_4C.cutTo', cutTo);
			if (colorFrom) queryParams.append('diamond_4C.colorFrom', colorFrom);
			if (colorTo) queryParams.append('diamond_4C.colorTo', colorTo);
			if (clarityFrom) queryParams.append('diamond_4C.clarityFrom', clarityFrom);
			if (clarityTo) queryParams.append('diamond_4C.clarityTo', clarityTo);
			if (caratFrom) queryParams.append('diamond_4C.caratFrom', caratFrom);
			if (caratTo) queryParams.append('diamond_4C.caratTo', caratTo);
			if (isLab !== null || isLab !== undefined) queryParams.append('isLab', isLab);

			if (queryParams.toString()) {
				url += `?${queryParams.toString()}`;
			}

			const response = await api.get(url);
			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
		}
	}
);

export const getDiamondDetail = createAsyncThunk(
	'diamondSlice/getDiamondDetail',
	async (id, {rejectWithValue}) => {
		console.log(id);

		try {
			const response = await api.get(`/Diamond/${id}`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
		}
	}
);

export const getDiamondShape = createAsyncThunk(
	'diamondSlice/getDiamondShape',
	async (id, {rejectWithValue}) => {
		console.log(id);

		try {
			const response = await api.get(`/Diamond/Shape/All`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
		}
	}
);

export const getDiamondFilter = createAsyncThunk(
	'diamondSlice/getDiamondFilter',
	async (id, {rejectWithValue}) => {
		console.log(id);

		try {
			const response = await api.get(`/Diamond/FilterLimit`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
		}
	}
);

export const diamondSlice = createSlice({
	name: 'diamondSlice',
	initialState: {
		diamonds: null,
		diamondDetail: null,
		diamondShape: null,
		filterLimits: null,
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
			.addCase(getAllDiamond.pending, (state) => {
				state.loading = true;
				state.diamonds = null;
			})
			.addCase(getAllDiamond.fulfilled, (state, action) => {
				state.loading = false;
				state.diamonds = action.payload;
			})
			.addCase(getAllDiamond.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getDiamondDetail.pending, (state) => {
				state.loading = true;
				state.diamondDetail = null;
			})
			.addCase(getDiamondDetail.fulfilled, (state, action) => {
				state.loading = false;
				state.diamondDetail = action.payload;
			})
			.addCase(getDiamondDetail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getDiamondFilter.pending, (state) => {
				state.loading = true;
				state.filterLimits = null;
			})
			.addCase(getDiamondFilter.fulfilled, (state, action) => {
				state.loading = false;
				state.filterLimits = action.payload;
			})
			.addCase(getDiamondFilter.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getDiamondShape.pending, (state) => {
				state.loading = true;
				state.diamondShape = null;
			})
			.addCase(getDiamondShape.fulfilled, (state, action) => {
				state.loading = false;
				state.diamondShape = action.payload;
			})
			.addCase(getDiamondShape.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
