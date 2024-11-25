import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const handleReviewOrder = createAsyncThunk(
	'reviewSlice/handleReviewOrder',
	async (body, {rejectWithValue}) => {
		console.log('body', body);

		try {
			const {Content, Files, StarRating, JewelryId} = body;
			const formData = new FormData();
			formData.append('Content', Content);

			// Kiểm tra và thêm tệp nếu nó tồn tại
			if (Files) {
				formData.append('Files', Files);
			}

			formData.append('StarRating', StarRating);
			formData.append('JewelryId', JewelryId);

			const data = await api.post(`/JewelryReview/Create`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error);
		}
	}
);

export const getAllJewelryModelReview = createAsyncThunk(
	'reviewSlice/getAllJewelryModelReview',
	async (params, {rejectWithValue}) => {
		console.log('params', params);

		try {
			const {CurrentPage, PageSize, MetalId, ModelId, OrderByOldest} = params;
			let url = '/JewelryReview/All';
			const queryParams = new URLSearchParams();

			if (ModelId) queryParams.append('ModelId', ModelId);
			if (PageSize) queryParams.append('PageSize', PageSize);
			if (CurrentPage) queryParams.append('CurrentPage', CurrentPage);
			if (MetalId) queryParams.append('MetalId', MetalId);
			if (OrderByOldest !== null && OrderByOldest !== undefined) {
				queryParams.append('OrderByOldest', OrderByOldest);
			}

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

export const deleteReviewAction = createAsyncThunk(
	'reviewSlice/deleteReviewAction',
	async (JewelryId, {rejectWithValue}) => {
		try {
			const response = await api.delete(`/JewelryReview/Remove?JewelryId=${JewelryId}`);
			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error));
			return rejectWithValue(error);
		}
	}
);

export const reviewSlice = createSlice({
	name: 'reviewSlice',
	initialState: {
		reviews: null,
		review: null,
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
			.addCase(handleReviewOrder.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(handleReviewOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.review = action.payload;
			})
			.addCase(handleReviewOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getAllJewelryModelReview.pending, (state) => {
				state.loading = true;
				state.reviews = null;
				state.error = null;
			})
			.addCase(getAllJewelryModelReview.fulfilled, (state, action) => {
				state.loading = false;
				state.reviews = action.payload;
			})
			.addCase(getAllJewelryModelReview.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deleteReviewAction.pending, (state) => {
				state.loading = true;
				state.reviews = null;
				state.error = null;
			})
			.addCase(deleteReviewAction.fulfilled, (state, action) => {
				state.loading = false;
				state.review = action.payload;
			})
			.addCase(deleteReviewAction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
