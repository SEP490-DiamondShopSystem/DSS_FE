import {createSlice} from '@reduxjs/toolkit';

// Slice giỏ hàng cho cả cart và cartFinish
export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cart: JSON.parse(localStorage.getItem('cart')) || [],
		cartDesign: JSON.parse(localStorage.getItem('cartDesign')) || [],
		cartFinish: JSON.parse(localStorage.getItem('cartFinish')) || [],
	},
	reducers: {
		addToCart: (state, action) => {
			const newItem = action.payload;

			console.log(newItem);

			// Đảm bảo state.cart là một mảng
			if (!Array.isArray(state.cart)) {
				state.cart = []; // Khởi tạo nếu chưa tồn tại
			}

			// Thêm sản phẩm mới vào giỏ hàng
			state.cart.push(newItem);

			// Đồng bộ với localStorage
			localStorage.setItem('cart', JSON.stringify(state.cart));
		},
		addOrUpdateItem: (state, action) => {
			const {diamond} = action.payload;
			console.log(diamond);

			if (!Array.isArray(state.cart)) {
				state.cart = []; // Khởi tạo nếu chưa tồn tại
			}

			state.cart.push(diamond);

			// Đồng bộ với localStorage
			localStorage.setItem('cart', JSON.stringify(state.cart));
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
				state.cartFinish = [];
			}

			// Thêm sản phẩm mới vào giỏ hàng
			state.cartFinish.push(newItem);

			// Đồng bộ với localStorage
			localStorage.setItem('cartFinish', JSON.stringify(state.cartFinish));
		},
		removeFromCart: (state, action) => {
			state.cart = action.payload; // Cập nhật cart với dữ liệu mới
			localStorage.setItem('cart', JSON.stringify(state.cart)); // Đồng bộ với localStorage
		},
		removeFromCartFinish: (state, action) => {
			state.cartFinish = action.payload; // Cập nhật cart với dữ liệu mới
			localStorage.setItem('cart', JSON.stringify(state.cartFinish)); // Đồng bộ với localStorage
		},
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
} = cartSlice.actions;
