import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const handleChangePassword = createAsyncThunk(
	'userSlice/handleChangePassword',
	async ({identityId, oldPassword, newPassword}, {rejectWithValue}) => {
		try {
			// Tạo FormData
			const formData = new FormData();
			formData.append('oldPassword', oldPassword);
			formData.append('newPassword', newPassword);

			const {data} = await api.put(`/Account/${identityId}/ResetPassword`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			console.log(data);
			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error?.data);
		}
	}
);

export const userSlice = createSlice({
	name: 'userSlice',
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
			.addCase(handleChangePassword.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(handleChangePassword.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(handleChangePassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
