import React, {useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {formatPrice} from '../../utils';
import {Select} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {GetCartFinishSelector, GetCartSelector} from '../../redux/selectors';
import {removeFromCart, removeFromCartFinish} from '../../redux/slices/cartSlice';
import {DeleteOutlined, EyeOutlined} from '@ant-design/icons';

const ring = [
	{
		value: '1',
		label: '1',
	},
	{
		value: '2',
		label: '2',
	},
	{
		value: '3',
		label: '3',
	},
	{
		value: '4',
		label: '4',
	},
];

function getUserId() {
	return localStorage.getItem('userId') || null;
}

const CartPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userId = getUserId();

	const cart = useSelector((state) => {
		const cartByUserId = state.cartSlice?.cartByUserId || {};
		return cartByUserId[userId] || [];
	});
	const cartFinish = useSelector((state) => {
		const cartFinishByUserId = state.cartSlice?.cartFinishByUserId || {};
		return cartFinishByUserId[userId] || [];
	});

	const [promo, setPromo] = useState('');
	const [jewelryType, setJewelryType] = useState(localStorage.getItem('jewelryType') || '');
	const [cartPreset, setCartPreset] = useState('');
	const [cartDesign, setCartDesign] = useState('');

	console.log('cart', cart);
	console.log('cartFinish', cartFinish);

	const handleRingSizeChange = (index, value) => {
		console.log(index);

		const updatedCart = [...cart];

		const selectedItem = updatedCart[index];

		console.log('selectedItem', selectedItem);

		if (selectedItem && selectedItem.Size) {
			selectedItem.Size = value;

			setCartPreset(updatedCart);

			console.log('Updated cart:', updatedCart);
		}
	};

	const handleRingSizeFinishChange = (index, value) => {
		console.log(index);

		const updatedCart = [...cartFinish];

		const selectedItem = updatedCart[index];

		console.log('selectedItem', selectedItem);

		if (selectedItem) {
			selectedItem.Size = value;

			setCartDesign(updatedCart);

			console.log('Updated cart:', updatedCart);
		}
	};

	const handlePromoChange = (value) => {
		setPromo(value);
	};

	const handleRemoveCartFinish = (index) => {
		const updatedCart = [...cartFinish];

		updatedCart.splice(index, 1);

		dispatch(removeFromCartFinish(updatedCart));

		localStorage.setItem('cartFinish', JSON.stringify(updatedCart));
	};

	const handleViewCartFinish = (jewelryId, diamondId) => {
		const jewelryDiamondId = jewelryId + diamondId;
		navigate(`/completed-jewelry/${jewelryDiamondId}`);
	};

	const handleRemoveCart = (index) => {
		const updatedCart = [...cart];

		updatedCart.splice(index, 1);

		dispatch(removeFromCart(updatedCart));

		localStorage.setItem('cart', JSON.stringify(updatedCart));
	};

	const handleViewCart = (jewelryId, diamondId) => {
		if (jewelryId) {
			navigate(`/jewelry/diamond-jewelry/${jewelryId}`);
		} else if (diamondId) {
			navigate(`/diamond-detail/${diamondId}`);
		} else {
			console.error('No jewelry or diamond ID provided.');
		}
	};

	// Tính Toán
	const totalDiamondDesignPrice = cartFinish.reduce((acc, item) => acc + item.DiamondPrice, 0);
	const totalJewelryDesignPrice = cartFinish.reduce((acc, item) => acc + item.JewelryPrice, 0);

	const grandDesignTotal = totalDiamondDesignPrice + totalJewelryDesignPrice;

	const totalDiamondPrice = cart.reduce((acc, item) => {
		return acc + (item && item.DiamondPrice ? item.DiamondPrice : 0);
	}, 0);

	const totalJewelryPrice = cart.reduce((acc, item) => {
		return acc + (item && item.JewelryPrice ? item.JewelryPrice : 0);
	}, 0);

	// Tổng hợp cả 2 giá
	const grandTotal = totalDiamondPrice + totalJewelryPrice;

	const totalPrice = grandDesignTotal + grandTotal;

	return (
		<div className="flex justify-between p-8 bg-gray-50 min-h-screen mx-32 my-20">
			{/* Left Segment: Engagement Ring, Loose Diamond, Promotions */}
			<div
				className="flex-1 lg:mr-8 space-y-8 shadow-lg bg-white rounded-lg"
				style={{width: '70%'}}
			>
				{/* Engagement Ring Section */}
				{cartFinish?.length > 0 && (
					<div className="bg-white p-6 mx-5 my-5 border rounded-lg shadow-md">
						<h2 className="text-xl font-semibold mb-2 border-b pb-2">
							Hàng Thiết Kế (Hoàn Thành)
						</h2>
						{cartFinish?.map((item, index) => (
							<div className="flex mt-4 shadow-xl p-5 rounded-lg">
								<div className="mr-4 flex-shrink-0">
									<img
										src="path-to-image"
										alt="Engagement Ring"
										className="w-32 h-32 object-cover rounded-lg border"
									/>
								</div>
								<div className="flex-1 mx-5">
									<p className="mb-1  text-gray-800 font-semibold">
										{item.JewelryName}
									</p>
									<p className="mb-1 text-gray-700 text-sm">
										SKU: 501410w14
										{/* <span className="line-through text-gray-400 mr-2">
											$1,470
										</span>{' '} */}
										<span className="text-gray-900 font-semibold ml-5">
											{formatPrice(item.JewelryPrice)}
										</span>
									</p>
									<p className="mb-1 text-gray-800 font-semibold mt-2">
										Kim Cương {item.Carat}ct {item.Color}-{item.Clarity}{' '}
										{item.Cut} {item.DiamondShape}
									</p>
									<p className="mb-4 text-gray-700 text-sm">
										SKU: 22226368{' '}
										<span className="text-gray-900 font-semibold ml-5">
											{formatPrice(item.DiamondPrice)}
										</span>
									</p>
									{jewelryType && jewelryType === 'Nhẫn' && (
										<div className="flex items-center mt-2">
											<label className="mr-2 text-gray-700">
												Kích thước nhẫn:
											</label>
											<Select
												defaultValue={item.Size}
												onChange={(value) =>
													handleRingSizeFinishChange(index, value)
												}
												className="p-1 text-sm"
												options={ring}
											/>
											{/* <span className="ml-2 text-blue-500 text-sm cursor-pointer">
											Find your ring size
										</span> */}
										</div>
									)}
								</div>
								<div className="flex flex-col items-end space-y-2 text-sm text-yellow-600">
									<span
										className="cursor-pointer"
										onClick={() =>
											handleViewCartFinish(item.JewelryId, item.DiamondId)
										}
									>
										View
									</span>
									<span
										className="cursor-pointer"
										onClick={() => handleRemoveCartFinish(index)}
									>
										Remove
									</span>
								</div>
							</div>
						))}
					</div>
				)}

				{cart?.length > 0 && (
					<div className="bg-white p-6 mx-5 my-5 border rounded-lg shadow-md">
						<h2 className="text-xl font-semibold mb-2 border-b pb-2">Hàng Có Sẵn</h2>
						{cart?.map((item, index) => (
							<div className="flex mt-4 shadow-xl p-5 rounded-lg" key={index}>
								<div className="mr-4 flex-shrink-0">
									<img
										src="path-to-image"
										alt={item?.JewelryName || 'Loose Diamond'}
										className="w-32 h-32 object-cover rounded-lg border"
									/>
								</div>
								<div className="flex-1 mx-5">
									{/* Kiểm tra xem đây là Jewelry hay Diamond và hiển thị thông tin tương ứng */}
									{item?.JewelryId ? (
										<div>
											<p className="mb-1 text-gray-800 font-semibold">
												{item.JewelryName}
											</p>
											<p className="text-gray-700 text-sm">
												Giá:{' '}
												<span className="text-gray-900 font-semibold">
													{formatPrice(item.JewelryPrice)}
												</span>
											</p>
											{item.Model?.Category?.Name === 'Ring' && (
												<div className="flex items-center mt-2">
													<label className="mr-2 text-gray-700">
														Kích thước nhẫn:
													</label>
													<p>{item.SizeId}</p>
												</div>
											)}
										</div>
									) : item?.DiamondId ? (
										<div>
											<p className="mb-1 text-gray-800 font-semibold">
												{item.Carat}ct {item.Color}-{item.Clarity}{' '}
												{item.Cut} {item.DiamondShape}
											</p>
											<p className="text-gray-700 text-sm">
												Giá:{' '}
												<span className="text-gray-900 font-semibold">
													{formatPrice(item.DiamondPrice)}
												</span>
											</p>
										</div>
									) : (
										<p className="text-gray-800">Không có thông tin</p>
									)}
								</div>
								<div className="flex items-center justify-end space-y-2 divide-x text-sm text-yellow-600">
									<span
										className="cursor-pointer w-auto hover:text-black text-primary text-xl px-3"
										onClick={() => {
											if (item.JewelryId) {
												handleViewCart(item.JewelryId, null);
											} else if (item.DiamondId) {
												handleViewCart(null, item.DiamondId);
											}
										}}
									>
										<EyeOutlined classID="" />
									</span>

									<span
										className="cursor-pointer px-3"
										onClick={() => handleRemoveCart(index)}
									>
										<DeleteOutlined color="red" />
									</span>
								</div>
							</div>
						))}
					</div>
				)}

				<div className="bg-white p-6 mx-5 my-5 border rounded-lg shadow-md">
					<label htmlFor="promotions" className="block mb-2 text-gray-700 font-medium">
						Khuyến mãi có sẵn
					</label>
					<Select defaultValue={''} onChange={handlePromoChange} className="w-full" />
				</div>
			</div>

			<div
				className=" lg:mt-0 flex-shrink-0 w-full lg:w-1/3 bg-gray-50 p-6 mx-5 shadow-lg bg-white rounded-lg lg:sticky lg:top-8"
				style={{width: '30%'}}
			>
				<div className="bg-white p-4 mx-5 my-5 rounded-lg shadow-md space-y-6">
					<div className="space-y-4">
						<p className="flex justify-between text-gray-700">
							<span>Giá Gốc</span> <span>{formatPrice(totalPrice)}</span>
						</p>
						<p className="flex justify-between text-gray-700">
							<span>Khuyến Mãi</span> <span>{promo ? `-${promo}` : '$0'}</span>
						</p>
						<hr className="border-t" />
						<p className="flex justify-between text-gray-900 font-semibold">
							<span>Tổng Giá</span> <span>{formatPrice(totalPrice)}</span>
						</p>
					</div>
				</div>
				<button
					className="mr-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
					style={{padding: '13px 0px 11px 0px'}}
					onClick={() => navigate(`/checkout`)}
				>
					Thanh Toán
				</button>
			</div>
		</div>
	);
};

export default CartPage;
