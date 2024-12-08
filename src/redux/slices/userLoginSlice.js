import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';
import {setLocalStorage} from '../../utils/localstorage';

export const handleLogin = createAsyncThunk(
	'userLoginSlice/handleLogin',
	async ({email, password, isExternalLogin, isStaffLogin}, {rejectWithValue}) => {
		try {
			const data = await api.post(`/Account/Login`, {
				email,
				password,
				isExternalLogin,
				isStaffLogin,
			});
			console.log(data);

			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error);
		}
	}
);

export const handleGoogleLogin = createAsyncThunk(
	'userLoginSlice/handleGoogleLogin',
	async (credential, {rejectWithValue}) => {
		console.log('credential', typeof credential);

		try {
			const data = await api.post(`/Account/Google/Credential`, credential);
			console.log(data);

			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error);
		}
	}
);

export const handleRegister = createAsyncThunk(
	'userLoginSlice/handleRegister',
	async ({email, password, fullName, isExternalRegister}, {rejectWithValue}) => {
		try {
			const data = await api.post(`/Account/Register`, {
				email,
				password,
				fullName,
				isExternalRegister,
			});
			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error);
		}
	}
);

export const handleRefreshToken = createAsyncThunk(
	'userLoginSlice/handleRefreshToken',
	async (refreshToken, {rejectWithValue}) => {
		try {
			const data = await api.put(`/Account/RefreshToken?refreshToken=${refreshToken}`);
			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.payload);
		}
	}
);

export const getUserDetail = createAsyncThunk(
	'userLoginSlice/getUserDetail',
	async (id, {rejectWithValue}) => {
		try {
			const data = await api.get(`/Account/${id}`);
			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.payload);
		}
	}
);

export const handleUpdateAccount = createAsyncThunk(
	'userLoginSlice/handleUpdateAccount',
	async ({id, changedFullName, changedAddress, newPhoneNumber}, {rejectWithValue}) => {
		try {
			const data = await api.put(`/Account/${id}/Profile`, {
				changedFullName,
				changedAddress,
				newPhoneNumber,
			});
			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.payload);
		}
	}
);

export const handleDefaultAccount = createAsyncThunk(
	'userLoginSlice/handleDefaultAccount',
	async ({accountId, id}, {rejectWithValue}) => {
		try {
			const data = await api.put(`/Account/${accountId}/Profile/SetAddressDefault`, id);
			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.payload);
		}
	}
);

export const handleVerifyAccount = createAsyncThunk(
	'userLoginSlice/handleVerifyAccount',
	async (id, {rejectWithValue}) => {
		try {
			const data = await api.get(`/Account/${id}/Email/SendConfirm`);
			console.log(data);

			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.data);
		}
	}
);

export const userLoginSlice = createSlice({
	name: 'userLoginSlice',
	initialState: {
		userInfo: null,
		userDetail: null,
		loading: null,
		error: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.userInfo = action.payload;
		},
		logout: (state) => {
			state.userInfo = null;
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('userId');
			localStorage.removeItem('user');
			localStorage.removeItem('userDetail');
		},
	},
	extraReducers: (builder) => {
		builder
			// Login
			.addCase(handleLogin.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(handleLogin.fulfilled, (state, action) => {
				state.loading = false;
				state.userInfo = action.payload;
				setLocalStorage('accessToken', action.payload.accessToken);
				setLocalStorage('refreshToken', action.payload.refreshToken);
			})
			.addCase(handleLogin.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(handleGoogleLogin.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(handleGoogleLogin.fulfilled, (state, action) => {
				state.loading = false;
				state.userInfo = action.payload;
				setLocalStorage('accessToken', action.payload.accessToken);
				setLocalStorage('refreshToken', action.payload.refreshToken);
			})
			.addCase(handleGoogleLogin.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(handleRegister.pending, (state) => {
				state.loading = true;
			})
			.addCase(handleRegister.fulfilled, (state, action) => {
				state.loading = false;
				state.userInfo = action.payload;
				// setLocalStorage('token', action.payload); // Lưu token sau khi đăng ký
			})
			.addCase(handleRegister.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload; // Lưu lỗi nếu có
			})
			.addCase(handleRefreshToken.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(handleRefreshToken.fulfilled, (state, action) => {
				state.loading = false;
				setLocalStorage('accessToken', action.payload.accessToken);
			})
			.addCase(handleRefreshToken.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getUserDetail.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getUserDetail.fulfilled, (state, action) => {
				state.loading = false;
				state.userDetail = action.payload;
				localStorage.setItem('userDetail', JSON.stringify(action.payload));
			})
			.addCase(getUserDetail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(handleUpdateAccount.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(handleUpdateAccount.fulfilled, (state, action) => {
				state.loading = false;
				state.userDetail = action.payload;
				localStorage.setItem('userDetail', JSON.stringify(action.payload));
			})
			.addCase(handleUpdateAccount.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(handleDefaultAccount.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(handleDefaultAccount.fulfilled, (state, action) => {
				state.loading = false;
				state.userDetail = action.payload;
			})
			.addCase(handleDefaultAccount.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(handleVerifyAccount.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(handleVerifyAccount.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(handleVerifyAccount.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const {setUser, logout} = userLoginSlice.actions;
