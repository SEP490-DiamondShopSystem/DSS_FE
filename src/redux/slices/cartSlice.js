import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {message} from 'antd';
import {api} from '../../services/api';
import {getUserId} from '../../components/GetUserId';

export const handleCartValidate = createAsyncThunk(
	'cartSlice/handleCartValidate',
	async ({promotionId, items, userAddress, accountId}, {rejectWithValue}) => {
		try {
			const response = await api.post(`/Cart/Validate`, {
				promotionId,
				items,
				userAddress,
				accountId,
			});

			return response;
		} catch (error) {
			return rejectWithValue(error.data);
		}
	}
);

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		loading: null,
		cart: null,
		cartByUserId: localStorage.getItem(`cart_${getUserId()}`) || '',
		cartDiamondByUserId: localStorage.getItem(`cart_${getUserId()}`) || '',
		cartFinishByUserId: localStorage.getItem(`cartFinish_${getUserId()}`) || '[]',
		cartDesign: JSON.parse(localStorage.getItem('cartDesign')) || '',
		cartFinish: JSON.parse(localStorage.getItem('cartFinish')) || '',
	},
	reducers: {
		addToCart: (state, action) => {
			const {data, userId} = action.payload;

			// Đảm bảo rằng cartByUserId đã được khởi tạo
			if (!state.cartByUserId) {
				state.cartByUserId = {};
			}

			// Đảm bảo rằng cart cho userId đã được khởi tạo là một mảng
			if (!Array.isArray(state.cartByUserId[userId])) {
				state.cartByUserId[userId] = [];
			}

			// Kiểm tra xem sản phẩm jewelry đã có trong giỏ hàng chưa
			const existingJewelryIndex = state.cartByUserId[userId].findIndex(
				(item) => item.JewelryId === data.JewelryId
			);

			if (existingJewelryIndex === -1) {
				// Nếu sản phẩm jewelry chưa có, thêm sản phẩm vào giỏ hàng
				state.cartByUserId[userId].push(data);

				// Cập nhật lại localStorage
				localStorage.setItem(`cart_${userId}`, JSON.stringify(state.cartByUserId[userId]));

				// Thông báo thành công khi sản phẩm được thêm vào
				message.success('Sản phẩm đã được thêm vào giỏ hàng!');
			} else {
				// Nếu sản phẩm jewelry đã có, có thể hiển thị thông báo hoặc xử lý theo ý muốn
				message.warning('Sản phẩm đã có trong giỏ hàng!');
			}
		},

		addOrUpdateItem: (state, action) => {
			const {diamond} = action.payload;

			// Đảm bảo rằng cartByUserId đã được khởi tạo
			if (!state.cartByUserId) {
				state.cartByUserId = {};
			}

			// Đảm bảo rằng cart cho userId đã được khởi tạo là một mảng
			if (!Array.isArray(state.cartByUserId[getUserId()])) {
				state.cartByUserId[getUserId()] = [];
			}

			// Kiểm tra xem sản phẩm diamond đã có trong giỏ hàng chưa
			const existingDiamondIndex = state.cartByUserId[getUserId()].findIndex(
				(item) => item.DiamondId === diamond.DiamondId
			);

			if (existingDiamondIndex === -1) {
				// Nếu sản phẩm diamond chưa có, thêm sản phẩm vào giỏ hàng
				state.cartByUserId[getUserId()].push(diamond);

				// Cập nhật lại localStorage
				localStorage.setItem(
					`cart_${getUserId()}`,
					JSON.stringify(state.cartByUserId[getUserId()])
				);

				// Thông báo thành công khi sản phẩm được thêm vào
				message.success('Sản phẩm đã được thêm vào giỏ hàng!');
			} else {
				// Nếu sản phẩm diamond đã có, có thể hiển thị thông báo hoặc xử lý theo ý muốn
				message.warning('Sản phẩm đã có trong giỏ hàng!');
			}
		},

		addOrUpdateCartDesignItem: (state, action) => {
			const {jewelry} = action.payload; // Nhận diamondJewelry từ action payload
			const existingIndex = state.cartDesign.findIndex(
				(item) => item.JewelryId === jewelry.JewelryId
			);

			if (existingIndex !== -1) {
				// Nếu sản phẩm đã tồn tại, cập nhật sản phẩm
				state.cartDesign[existingIndex] = jewelry;
			} else {
				// Nếu không tồn tại, thêm sản phẩm mới vào giỏ hàng thiết kế
				state.cartDesign.push(jewelry);
			}

			// Đồng bộ với localStorage
			localStorage.setItem('cartDesign', JSON.stringify(state.cartDesign));
		},
		addOrUpdateCartDesignDiamondItem: (state, action) => {
			const {diamond} = action.payload; // Nhận diamondJewelry từ action payload
			const existingIndex = state.cartDesign.findIndex(
				(item) => item.DiamondId === diamond.DiamondId
			);

			if (existingIndex !== -1) {
				// Nếu sản phẩm đã tồn tại, cập nhật sản phẩm
				state.cartDesign[existingIndex] = diamond;
			} else {
				// Nếu không tồn tại, thêm sản phẩm mới vào giỏ hàng thiết kế
				state.cartDesign.push(diamond);
			}

			// Đồng bộ với localStorage
			localStorage.setItem('cartDesign', JSON.stringify(state.cartDesign));
		},
		addToCartFinish: (state, action) => {
			const newItem = action.payload;

			// Đảm bảo cartFinish là một mảng
			if (!Array.isArray(state.cartFinish)) {
				state.cartFinishByUserId[getUserId()] = [];
			}

			// const existingIndex = state.cartFinish.findIndex(
			// 	(item) => item.DiamondId === newItem.DiamondId
			// );

			// if (existingIndex !== -1) {
			// 	// Nếu sản phẩm đã tồn tại, cập nhật sản phẩm
			// 	state.cartFinish[existingIndex] = newItem;
			// } else {
			// 	// Nếu không tồn tại, thêm sản phẩm mới vào giỏ hàng thiết kế
			state.cartFinishByUserId[getUserId()].push(newItem);
			// }

			// Đồng bộ với localStorage
			localStorage.setItem(
				`cartFinish_${getUserId()}`,
				JSON.stringify(state.cartFinishByUserId[getUserId()])
			);
		},
		removeFromCart: (state, action) => {
			// Cập nhật giỏ hàng cho người dùng hiện tại
			state.cartByUserId[getUserId()] = action.payload; // Cập nhật giỏ hàng với dữ liệu mới
		},

		removeFromCartFinish: (state, action) => {
			state.cartFinish = action.payload; // Cập nhật cart với dữ liệu mới
			localStorage.setItem('cart', JSON.stringify(state.cartFinish)); // Đồng bộ với localStorage
		},
		clearCartByUserId: (state) => {
			const userId = getUserId();
			if (userId) {
				state.cartByUserId[userId] = [];
				// localStorage.removeItem(`cart_${userId}`);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(handleCartValidate.pending, (state) => {
				state.loading = true;
				state.cart = null;
				state.error = null;
			})
			.addCase(handleCartValidate.fulfilled, (state, action) => {
				state.loading = false;
				state.cart = action.payload;
				localStorage.setItem(`cartValidate_${getUserId()}`, JSON.stringify(action.payload));
			})
			.addCase(handleCartValidate.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

// Export actions và reducer
export const {
	addToCart,
	addOrUpdateCartDesignItem,
	addOrUpdateItem,
	addOrUpdateCartDesignDiamondItem,
	addToCartFinish,
	removeFromCart,
	removeFromCartFinish,
	clearCartByUserId,
} = cartSlice.actions;
