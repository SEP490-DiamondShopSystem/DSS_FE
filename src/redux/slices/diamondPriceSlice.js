import {createAsyncThunk, createSlice, configureStore} from '@reduxjs/toolkit';
import {api} from '../../services/api';

// GET /api/Diamond/Price/PriceBoard
export const fetchPriceBoard = createAsyncThunk(
	'diamondPrice/fetchPriceBoard',
	async ({shapeId, isLabDiamond, cut, isSideDiamond}, {rejectWithValue}) => {
		try {
			const response = await api.get('/Diamond/Price/PriceBoard', {
				params: {
					shapeId,
					isLabDiamond,
					cut,
					isSideDiamond,
				},
			});
			return response;
		} catch (error) {
			console.error('Error fetching price board:', error); // Log the full error
			return rejectWithValue(error || error.message); // Return the response if available, otherwise return the error message
		}
	}
);

// GET /api/Diamond/Price
export const fetchDiamondPrices = createAsyncThunk(
	'diamondPrice/fetchDiamondPrices',
	async ({diamondShapeId, pageSize, start}, {rejectWithValue}) => {
		try {
			const response = await api.get('/Diamond/Price', {
				params: {
					diamondShapeId,
					pageSize,
					start,
				},
			});
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

// POST /api/Diamond/Price
export const createDiamondPrice = createAsyncThunk(
	'diamondPrice/createDiamondPrice',
	async ({listPrices, shapeId, isSideDiamond, isLabDiamond}, {rejectWithValue}) => {
		try {
			// Make the PUT request to update prices
			const response = await api.post('/Diamond/Price', {
				listPrices,
				shapeId,
				isLabDiamond,
				isSideDiamond,
			});

			// Check if the API response is structured as expected
			return response.data || response; // Adjust this based on your API's response structure
		} catch (error) {
			// Log the error response for better debugging
			console.error('Error creating diamond prices:', error);
			return rejectWithValue(error);
		}
	}
);

// PUT /api/Diamond/Price
export const updateDiamondPrices = createAsyncThunk(
	'diamondPrice/updateDiamondPrices',
	async ({updatedDiamondPrices, shapeId, isLabDiamond, isSideDiamond}, {rejectWithValue}) => {
		try {
			// Log the data being sent to the API

			// Make the PUT request to update prices
			const response = await api.put('/Diamond/Price', {
				updatedDiamondPrices,
				shapeId,
				isLabDiamond,
				isSideDiamond,
			});

			// Log the response received from the API

			// Check if the API response is structured as expected
			return response.data || response; // Adjust this based on your API's response structure
		} catch (error) {
			// Log the error response for better debugging
			console.error('Error updating diamond prices:', error);
			return rejectWithValue(error);
		}
	}
);

// GET /api/Diamond/Price/Shape
export const fetchDiamondPriceByShape = createAsyncThunk(
	'diamondPrice/fetchDiamondPriceByShape',
	async ({shapeId, isLabDiamond}, {rejectWithValue}) => {
		try {
			const response = await api.get('/Diamond/Price/Shape', {
				params: {shapeId, isLabDiamond},
			});
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

// DELETE /api/Diamond/Price/{shapeId}/{criteriaId}

export const deleteDiamondPrice = createAsyncThunk(
	'diamondPrice/deleteDiamondPrice',
	async ({deleteList, shapeId, isLabDiamond, isSideDiamond}, {rejectWithValue}) => {
		try {
			// Make the DELETE request with the appropriate request body
			const response = await api.delete('/Diamond/Price', {
				data: {
					deleteList,
					shapeId,
					isLabDiamond,
					isSideDiamond,
				},
			});

			// Log the response from the API for debugging

			// Check if the response is structured as expected and return the data
			return response.data || response;
		} catch (error) {
			// Log the error response for better debugging
			// Handle different error response formats
			if (error) {
				return rejectWithValue(error.data); // Use the detailed error information
			}
			return rejectWithValue({
				type: 'Unknown Error',
				title: 'Error occurred during deletion',
				status: 500,
				detail: error.message,
			}); // Fallback for unknown errors
		}
	}
);

// DELETE /api/Diamond/Price/{shapeId}/{criteriaId}
export const deleteDiamondPriceShape = createAsyncThunk(
	'diamondPrice/deleteDiamondPrice',
	async ({shapeId, criteriaId}, {rejectWithValue}) => {
		try {
			const response = await api.delete(`/Diamond/Price/${shapeId}/${criteriaId}`);
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

// Initial state
const initialState = {
	priceBoard: [],
	prices: [],
	shapes: [],
	loading: false,
	error: null,
};

// Slice
export const diamondPriceSlice = createSlice({
	name: 'diamondPrice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPriceBoard.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPriceBoard.fulfilled, (state, action) => {
				state.loading = false;
				state.priceBoard = action.payload.data || action.payload;
			})
			.addCase(fetchPriceBoard.rejected, (state, action) => {
				state.loading = false;
				const errorMsg = action.payload ? action.payload : 'An error occurred'; // Better error handling
				console.error('Failed to fetch price board:', errorMsg); // Log the error message
				state.error = errorMsg;
			})

			.addCase(fetchDiamondPrices.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchDiamondPrices.fulfilled, (state, action) => {
				state.loading = false;
				state.prices = action.payload.data || action.payload;
			})
			.addCase(fetchDiamondPrices.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase(createDiamondPrice.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createDiamondPrice.fulfilled, (state, action) => {
				state.loading = false;
				state.prices.push(action.payload.data || action.payload);
			})
			.addCase(createDiamondPrice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase(updateDiamondPrices.pending, (state) => {
				state.loading = true;
				state.error = null;
			})

			.addCase(updateDiamondPrices.fulfilled, (state, action) => {
				state.loading = false;
				const updatedPrices = action.payload.data || action.payload; // Make sure this is correct

				if (Array.isArray(updatedPrices) && updatedPrices.length > 0) {
					updatedPrices.forEach((updatedPrice) => {
						const index = state.prices.findIndex(
							(price) => price.diamondCriteriaId === updatedPrice.diamondCriteriaId
						);
						if (index !== -1) {
							// Update existing price
							state.prices[index] = updatedPrice;
						} else {
							console.warn(
								`Price with diamondCriteriaId ${updatedPrice.diamondCriteriaId} not found.`
							);
						}
					});
				} else {
					console.warn('No updated prices returned from the API.');
				}
			})

			.addCase(updateDiamondPrices.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase(fetchDiamondPriceByShape.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchDiamondPriceByShape.fulfilled, (state, action) => {
				state.loading = false;
				state.shapes = action.payload.data || action.payload;
			})
			.addCase(fetchDiamondPriceByShape.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase(deleteDiamondPrice.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteDiamondPrice.fulfilled, (state, action) => {
				state.loading = false;
				// Ensure shapeId and criteriaId are present in action.payload or adjust as needed
				const {criteriaId} = action.payload || action.meta.arg;
				state.prices = state.prices.filter((price) => price.criteriaId !== criteriaId);
			})
			.addCase(deleteDiamondPrice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
