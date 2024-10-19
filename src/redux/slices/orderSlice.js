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
	async ({orderRequestDto, orderItemRequestDtos, billingDetail}, {rejectWithValue}) => {
		console.log('orderRequestDto', orderRequestDto);
		console.log('orderItemRequestDtos', orderItemRequestDtos);
		console.log('billingDetail', billingDetail);

		try {
			const response = await api.post(`/Order/Checkout`, {
				orderRequestDto,
				orderItemRequestDtos,
				billingDetail,
			});
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
			});
	},
});
