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

export const configSlice = createSlice({
	name: 'configSlice',
	initialState: {
		userDetail: null,
		accountVerify: null,
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
			});
	},
});
