import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

// export const getUserDetail = createAsyncThunk(
// 	'userLoginSlice/getUserDetail',
// 	async (id, {rejectWithValue}) => {
// 		try {
// 			const data = await api.get(`/Account/${id}`);
// 			return data;
// 		} catch (error) {
// 			console.error(error);
// 			return rejectWithValue(error);
// 		}
// 	}
// );

export const userSlice = createSlice({
	name: 'userSlice',
	initialState: {
		userDetail: null,
		loading: false,
		error: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.userInfo = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder;
		// .addCase(getUserDetail.pending, (state) => {
		// 	state.loading = true;
		// })
		// .addCase(getUserDetail.fulfilled, (state, action) => {
		// 	state.loading = false;
		// 	state.userDetail = action.payload;
		// })
		// .addCase(getUserDetail.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.error = action.payload;
		// });
	},
});
