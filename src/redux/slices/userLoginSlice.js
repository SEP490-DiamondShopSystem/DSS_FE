import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';
import {setLocalStorage} from '../../utils/localstorage';

// Login Thunk
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

export const GoogleRegister = createAsyncThunk(
	'userLoginSlice/GoogleRegister',
	async ({externalProviderName}, {rejectWithValue}) => {
		try {
			const data = await api.get(
				`/Account/Register/External?externalProviderName=${externalProviderName}`
			);
			console.log(data);

			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error);
		}
	}
);

// Register Thunk
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

export const getUserDetail = createAsyncThunk(
	'userLoginSlice/getUserDetail',
	async (id, {rejectWithValue}) => {
		try {
			const data = await api.get(`/Account/${id}`);
			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error);
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
			state.userDetail = null;
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
				state.error = action.payload; // Lưu lỗi nếu có
			})
			.addCase(GoogleRegister.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(GoogleRegister.fulfilled, (state, action) => {
				state.loading = false;
				state.userInfo = action.payload;
				setLocalStorage('accessToken', action.payload.accessToken);
				setLocalStorage('refreshToken', action.payload.refreshToken);
			})
			.addCase(GoogleRegister.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload; // Lưu lỗi nếu có
			})

			// Register
			.addCase(handleRegister.pending, (state) => {
				state.loading = true;
				state.error = null;
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
			.addCase(getUserDetail.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUserDetail.fulfilled, (state, action) => {
				state.loading = false;
				state.userDetail = action.payload;
				localStorage.setItem('userDetail', JSON.stringify(action.payload));
			})
			.addCase(getUserDetail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const {setUser, logout} = userLoginSlice.actions;
