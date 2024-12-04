import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getConfigOrder = createAsyncThunk(
	'configSlice/getConfigOrder',
	async (_, {rejectWithValue}) => {
		try {
			const data = await api.get(`/Configuration/AccountRule`);
			console.log(data);

			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error);
		}
	}
);
export const fetchDiamondRule = createAsyncThunk(
	'config/fetchDiamondRule',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get('/Configuration/DiamondRule');
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
export const fetchAccountRule = createAsyncThunk(
	'config/AccountRule',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get('/Configuration/AccountRule');
			return response;
		} catch (error) {
			return rejectWithValue(error.response || error.message);
		}
	}
);
export const fetchFrontendDisplayRule = createAsyncThunk(
	'config/fetchFrontendDisplayRule',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get('/Configuration/FrontendDisplayRule');
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchPromotionRule = createAsyncThunk(
	'config/fetchPromotionRule',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get('/Configuration/PromotionRule');
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
export const fetchLocationRule = createAsyncThunk(
	'config/fetchLocationRule',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get('/Configuration/LocationRules');
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
export const fetchOrderRule = createAsyncThunk(
	'config/fetchOrderRule',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get('/Configuration/OrderRule');
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
export const fetchOrderRulePayment = createAsyncThunk(
	'config/fetchOrderRulePayment',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get('/Configuration/OrderRule/Payment');
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
export const fetchShopBankAccountRule = createAsyncThunk(
	'config/fetchShopBankAccountRule',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get('/Configuration/ShopBankAccountRule');
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
export const configSlice = createSlice({
	name: 'configSlice',
	initialState: {
		userDetail: null,
		accountVerify: null,
		accountRule: {},

		diamondRule: {},
		frontendDisplayRule: {},
		promotionRule: {},
		locationRule: {},
		orderRule: {},
		orderPaymentRule: {},
		orderPaymentRule: {},
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
			.addCase(getConfigOrder.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getConfigOrder.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(getConfigOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchAccountRule.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchAccountRule.fulfilled, (state, action) => {
				state.loading = false;
				state.accountRule = action.payload;
			})
			.addCase(fetchAccountRule.rejected, (state) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchDiamondRule.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchDiamondRule.fulfilled, (state, action) => {
				state.diamondRule = action.payload;
				state.loading = false;
			})
			.addCase(fetchDiamondRule.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchFrontendDisplayRule.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchFrontendDisplayRule.fulfilled, (state, action) => {
				state.loading = false;
				state.frontendDisplayRule = action.payload;
			})
			.addCase(fetchFrontendDisplayRule.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchLocationRule.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchLocationRule.fulfilled, (state, action) => {
				state.loading = false;
				state.locationRule = action.payload;
			})
			.addCase(fetchLocationRule.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchOrderRule.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchOrderRule.fulfilled, (state, action) => {
				state.loading = false;
				state.orderRule = action.payload;
			})
			.addCase(fetchOrderRule.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchOrderRulePayment.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchOrderRulePayment.fulfilled, (state, action) => {
				state.loading = false;
				state.orderPaymentRule = action.payload;
			})
			.addCase(fetchOrderRulePayment.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchShopBankAccountRule.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchShopBankAccountRule.fulfilled, (state, action) => {
				state.loading = false;
				state.shopBankAccountRule = action.payload;
			})
			.addCase(fetchShopBankAccountRule.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchPromotionRule.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPromotionRule.fulfilled, (state, action) => {
				state.loading = false;
				state.promotionRule = action.payload;
			})
			.addCase(fetchPromotionRule.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
