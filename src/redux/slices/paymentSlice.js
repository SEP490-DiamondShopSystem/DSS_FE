import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getAllPayment = createAsyncThunk(
	'paymentSlice/getAllPayment',
	async (_, {rejectWithValue}) => {
		try {
			const data = await api.get(`/Payment/All`);
			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.data);
		}
	}
);

export const handleAddTransfer = createAsyncThunk(
	'paymentSlice/handleAddTransfer',
	async (body, {rejectWithValue}) => {
		try {
			const {OrderId, Evidence} = body;

			const formData = new FormData();
			formData.append('OrderId', OrderId);

			// Kiểm tra và thêm tệp nếu nó tồn tại
			if (Evidence && Evidence.length > 0) {
				const file = Evidence[0]?.originFileObj; // Lấy file đầu tiên từ Evidence
				if (file) {
					formData.append('Evidence', file);
				} else {
					console.warn('No valid file found in Evidence');
				}
			}

			const response = await api.post(`/Order/AddTransfer`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const handleChangeTransfer = createAsyncThunk(
	'paymentSlice/handleChangeTransfer',
	async (body, {rejectWithValue}) => {
		try {
			const {TransactionId, Evidence} = body;

			const formData = new FormData();

			// Kiểm tra và thêm tệp nếu nó tồn tại
			if (Evidence && Evidence.length > 0) {
				const file = Evidence[0]?.originFileObj; // Lấy file đầu tiên từ Evidence
				if (file) {
					formData.append('Evidence', file);
				} else {
					console.warn('No valid file found in Evidence');
				}
			}

			const response = await api.put(
				`/Order/ChangeEvidence?TransactionId=${TransactionId}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const paymentSlice = createSlice({
	name: 'paymentSlice',
	initialState: {
		payment: null,
		loading: false,
		error: null,
		transfer: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllPayment.pending, (state) => {
				state.loading = true;
				state.payment = null;
				state.error = null;
			})
			.addCase(getAllPayment.fulfilled, (state, action) => {
				state.loading = false;
				state.payment = action.payload;
			})
			.addCase(getAllPayment.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(handleAddTransfer.pending, (state) => {
				state.loading = true;
			})
			.addCase(handleAddTransfer.fulfilled, (state, action) => {
				state.loading = false;
				state.transfer = action.payload;
			})
			.addCase(handleAddTransfer.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(handleChangeTransfer.pending, (state) => {
				state.loading = true;
			})
			.addCase(handleChangeTransfer.fulfilled, (state, action) => {
				state.loading = false;
				state.transfer = action.payload;
			})
			.addCase(handleChangeTransfer.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
