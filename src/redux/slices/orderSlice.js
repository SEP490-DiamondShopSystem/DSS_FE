import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {message} from 'antd';
import {api} from '../../services/api';
import {getUserId} from '../../components/GetUserId';

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
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
		}
	}
);

export const handleOrderCancel = createAsyncThunk(
	'orderSlice/handleOrderCancel',
	async ({orderId, reason}, {rejectWithValue}) => {
		try {
			const response = await api.put(`/Order/Cancel?orderId=${orderId}&reason=${reason}`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
		}
	}
);

export const getUserOrder = createAsyncThunk(
	'orderSlice/getUserOrder',
	async (params, {rejectWithValue}) => {
		try {
			const {pageSize, start, Status} = params;

			let url = '/Order/All';

			const queryParams = new URLSearchParams();

			if (pageSize) queryParams.append('pageSize', pageSize);
			if (start) queryParams.append('start', start);
			if (Status) queryParams.append('Status', Status);

			if (queryParams.toString()) {
				url += `?${queryParams.toString()}`;
			}

			const data = await api.get(url);
			return data;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
		}
	}
);

export const getUserOrderDetail = createAsyncThunk(
	'orderSlice/getUserOrderDetail',
	async (orderId, {rejectWithValue}) => {
		try {
			const response = await api.get(`/Order/${orderId}`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
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
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
		}
	}
);

export const getOrderLog = createAsyncThunk(
	'orderSlice/getOrderLog',
	async (orderId, {rejectWithValue}) => {
		try {
			const response = await api.get(`/Order/Log/${orderId}`);
			console.log(response);

			return response;
		} catch (error) {
			console.log('Error: ', JSON.stringify(error.data));
			return rejectWithValue(error.data);
		}
	}
);

export const orderSlice = createSlice({
	name: 'cart',
	initialState: {
		orderList: null,
		orderDetail: null,
		orderLogs: null,
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
			.addCase(handleOrderCancel.pending, (state) => {
				state.loading = true;
				state.orderDetail = null;
			})
			.addCase(handleOrderCancel.fulfilled, (state, action) => {
				state.loading = false;
				state.orderDetail = action.payload;
			})
			.addCase(handleOrderCancel.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getUserOrder.pending, (state) => {
				state.loading = true;
				state.orderList = null;
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
				state.orderDetail = null;
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
				state.transaction = null;
			})
			.addCase(getUserOrderTransaction.fulfilled, (state, action) => {
				state.loading = false;
				state.transaction = action.payload;
			})
			.addCase(getUserOrderTransaction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getOrderLog.pending, (state) => {
				state.loading = true;
				state.orderLogs = null;
			})
			.addCase(getOrderLog.fulfilled, (state, action) => {
				state.loading = false;
				state.orderLogs = action.payload;
			})
			.addCase(getOrderLog.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
