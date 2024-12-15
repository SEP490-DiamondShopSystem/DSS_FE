import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getAllPromo = createAsyncThunk(
	'promotionSlice/getAllPromo',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get(`/Promotion`);
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const getAllDiscount = createAsyncThunk(
	'promotionSlice/getAllDiscount',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get(`/Discount`);
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const checkPromoCart = createAsyncThunk(
	'promotionSlice/checkPromoCart',
	async ({promotionId, items}, {rejectWithValue}) => {
		try {
			const response = await api.post(`/Promotion/GetApplicable`, {
				promotionId,
				items,
			});
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const promotionSlice = createSlice({
	name: 'promotion',
	initialState: {
		promotion: null,
		discount: null,
		promoAble: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllPromo.pending, (state) => {
				state.loading = true;
				state.discount = null;
				state.error = null;
			})
			.addCase(getAllPromo.fulfilled, (state, action) => {
				state.loading = false;
				state.promotion = action.payload;
			})
			.addCase(getAllPromo.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(checkPromoCart.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.promoAble = null;
			})
			.addCase(checkPromoCart.fulfilled, (state, action) => {
				state.loading = false;
				state.promoAble = action.payload;
			})
			.addCase(checkPromoCart.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getAllDiscount.pending, (state) => {
				state.loading = true;
				state.discount = null;
			})
			.addCase(getAllDiscount.fulfilled, (state, action) => {
				state.loading = false;
				state.discount = action.payload;
			})
			.addCase(getAllDiscount.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

// Export actions và reducer
