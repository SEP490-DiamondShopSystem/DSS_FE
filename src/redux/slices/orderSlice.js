import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {message} from 'antd';
import {api} from '../../services/api';
import {getUserId} from '../../components/GetUserId';

// export const getAllOrderByUser = createAsyncThunk(
// 	'orderSlice/getAllOrderByUser',
// 	async ({promotionId, transformedData}, {rejectWithValue}) => {
// 		console.log('transformedData', transformedData);

// 		try {
// 			const response = await api.post(`/Cart/Validate`, {
// 				promotionId,
// 				items: transformedData,
// 			});
// 			console.log(response);

// 			return response;
// 		} catch (error) {
// 			console.log('Error: ', JSON.stringify(error.response.data));
// 			return rejectWithValue(error.response.data);
// 		}
// 	}
// );

export const handleCheckoutOrder = createAsyncThunk(
	'orderSlice/handleCheckoutOrder',
	async ({createOrderInfo, billingDetail}, {rejectWithValue}) => {
		try {
			const response = await api.post(`/Order/Checkout`, {
				billingDetail,
				createOrderInfo,
			});
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const getUserOrder = createAsyncThunk(
	'orderSlice/getUserOrder',
	async (_, {rejectWithValue}) => {
		try {
			const response = await api.get(`/Order/User/All`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const getUserOrderDetail = createAsyncThunk(
	'orderSlice/getUserOrderDetail',
	async (orderId, {rejectWithValue}) => {
		try {
			const response = await api.get(`/Order/User/${orderId}`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const getUserOrderTransaction = createAsyncThunk(
	'orderSlice/getUserOrderTransaction',
	async (orderId, {rejectWithValue}) => {
		try {
			const response = await api.get(`/Order/PaymentLink/${orderId}`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.response.data));
			return rejectWithValue(error.response.data);
		}
	}
);

export const orderSlice = createSlice({
	name: 'cart',
	initialState: {
		orderList: null,
		orderDetail: null,
		transaction: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(handleCheckoutOrder.pending, (state) => {
				state.loading = true;
			})
			.addCase(handleCheckoutOrder.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(handleCheckoutOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getUserOrder.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUserOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.orderList = action.payload;
			})
			.addCase(getUserOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getUserOrderDetail.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUserOrderDetail.fulfilled, (state, action) => {
				state.loading = false;
				state.orderDetail = action.payload;
			})
			.addCase(getUserOrderDetail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getUserOrderTransaction.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUserOrderTransaction.fulfilled, (state, action) => {
				state.loading = false;
				state.transaction = action.payload;
			})
			.addCase(getUserOrderTransaction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
