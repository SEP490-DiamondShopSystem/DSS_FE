import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';
import {setLocalStorage} from '../../utils/localstorage';

// Login Thunk
export const handleLogin = createAsyncThunk(
	'userLoginSlice/handleLogin',
	async ({email, password}, {rejectWithValue}) => {
		try {
			const data = await api.post(`/login`, {email, password});
			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error); // Gửi lỗi về reducer
		}
	}
);

// Register Thunk
export const handleRegister = createAsyncThunk(
	'userLoginSlice/handleRegister',
	async ({email, password, fullName}, {rejectWithValue}) => {
		try {
			const data = await api.post(`/Account/Register`, {
				email,
				password,
				fullName,
			});
			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error); // Gửi lỗi về reducer
		}
	}
);

export const userLoginSlice = createSlice({
	name: 'userLoginSlice',
	initialState: {
		userInfo: {},
		loading: null,
		error: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.userInfo = action.payload;
		},
		logout: (state) => {
			state.userInfo = {};
			localStorage.removeItem('token'); // Xoá token khi logout
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
				setLocalStorage('token', action.payload.token); // Lưu token vào localStorage
			})
			.addCase(handleLogin.rejected, (state, action) => {
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
				setLocalStorage('token', action.payload.token); // Lưu token sau khi đăng ký
			})
			.addCase(handleRegister.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload; // Lưu lỗi nếu có
			});
	},
});

export const {setUser, logout} = userLoginSlice.actions;
