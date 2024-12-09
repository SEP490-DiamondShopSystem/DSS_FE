import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getAllBlog = createAsyncThunk('blogSlice/getAllBlog', async (_, {rejectWithValue}) => {
	try {
		const response = await api.get(`/Blog/All`);
		return response;
	} catch (error) {
		return rejectWithValue(error.data);
	}
});

export const getBlogDetail = createAsyncThunk(
	'blogSlice/getBlogDetail',
	async (BlogId, {rejectWithValue}) => {
		try {
			const response = await api.get(`/Blog/Detail?BlogId=${BlogId}`);
			return response;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	}
);

export const blogSlice = createSlice({
	name: 'blogSlice',
	initialState: {
		blogs: null,
		blogDetail: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllBlog.pending, (state) => {
				state.loading = true;
				state.blogs = null;
				state.error = null;
			})
			.addCase(getAllBlog.fulfilled, (state, action) => {
				state.loading = false;
				state.blogs = action.payload;
			})
			.addCase(getAllBlog.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getBlogDetail.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.blogDetail = null;
			})
			.addCase(getBlogDetail.fulfilled, (state, action) => {
				state.loading = false;
				state.blogDetail = action.payload;
			})
			.addCase(getBlogDetail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

// Export actions và reducer
