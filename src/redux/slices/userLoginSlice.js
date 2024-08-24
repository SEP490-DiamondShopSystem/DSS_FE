import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const handleLogin = createAsyncThunk(
	'userLoginSlice/handleLogin',
	async ({email, password}) => {
		try {
			const data = await api.post(`/login`, {email, password});
			console.log(data.data);

			return data.data;
		} catch (error) {
			console.error(error);
		}
	}
);

export const userLoginSlice = createSlice({
	name: 'userLoginSlice',
	initialState: {
		userInfo: {
			token: '',
		},
	},
	reducers: {
		setUser: (state, action) => {
			state.userInfo = action.payload;
		},
		logout: (state) => {
			state.userInfo = {}; // or initialState.userInfo;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(handleLogin.fulfilled, (state, action) => {
			state.userInfo = action.payload;
			localStorage.setItem('user', JSON.stringify(action.payload));
		});
	},
});
