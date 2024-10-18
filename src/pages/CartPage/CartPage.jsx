import React, {useEffect, useMemo, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {formatPrice} from '../../utils';
import {Input, Modal, Select} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {GetCartFinishSelector, GetCartSelector, GetPromotionSelector} from '../../redux/selectors';
import {
	handleCartValidate,
	removeFromCart,
	removeFromCartFinish,
} from '../../redux/slices/cartSlice';
import {DeleteOutlined, ExclamationCircleOutlined, EyeOutlined} from '@ant-design/icons';
import {getAllPromo} from '../../redux/slices/promotionSlice';
import {enums} from '../../utils/constant';
import Loading from '../../components/Loading';

const {confirm} = Modal;

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

const getEnumKey = (enumObj, value) => {
	return enumObj
		? Object.keys(enumObj)
				.find((key) => enumObj[key] === value)
				?.replace('_', ' ')
		: '';
};

const mapAttributes = (data, attributes) => {
	return {
		Id: data.CartProductId,
		DiscountId: data.DiscountId,
		DiscountPercent: data.DiscountPercent,
		EngravedFont: data.EngravedFont,
		EngravedText: data.EngravedText,
		ErrorMessage: data.ErrorMessage,
		GiftAssignedId: data.GiftAssignedId,
		IsAvailable: data.IsAvailable,
		IsGift: data.IsGift,
		IsHavingDiscount: data.IsHavingDiscount,
		IsHavingPromotion: data.IsHavingPromotion,
		IsProduct: data.IsProduct,
		IsReqirement: data.IsReqirement,
		IsValid: data.IsValid,
		JewelryId: data?.Jewelry?.Id,
		Diamonds: data?.Jewelry?.Diamonds,
		IsPreset: data?.Jewelry?.IsPreset,
		IsSold: data?.Jewelry?.IsSold,
		IsAwaiting: data?.Jewelry?.IsAwaiting,
		MetalId: data?.Jewelry?.MetalId,
		MetalName: data?.Jewelry?.Metal?.Name,
		MetalPrice: data?.Jewelry?.Metal?.Price,
		Model: data?.Jewelry?.Model,
		ModelId: data?.Jewelry?.ModelId,
		JewelryPrice: data?.Jewelry?.Price,
		JewelryName: data?.Jewelry?.Name,
		SerialCode: data?.Jewelry?.SerialCode,
		ShippingDate: data?.Jewelry?.ShippingDate,
		SideDiamonds: data?.Jewelry?.SideDiamonds,
		SizeId: data?.Jewelry?.SizeId,
		Weight: data?.Jewelry?.Weight,
		JewelryModel: data.JewelryModel,
		PromotionId: data.PromotionId,
		RequirementQualifedId: data.RequirementQualifedId,
		Carat: data?.Diamond?.Carat || null,
		CategoryName: data?.Jewelry?.Model?.Category?.Name || null,

		// Using the helper function to map diamond attributes
		Clarity: getEnumKey(attributes.Clarity, data?.Diamond?.Clarity),
		Color: getEnumKey(attributes.Color, data?.Diamond?.Color),
		Culet: getEnumKey(attributes.Culet, data?.Diamond?.Culet),
		Cut: getEnumKey(attributes.Cut, data?.Diamond?.Cut),
		Fluorescence: getEnumKey(attributes.Fluorescence, data?.Diamond?.Fluorescence),
		Girdle: getEnumKey(attributes.Girdle, data?.Diamond?.Girdle),
		Symmetry: getEnumKey(attributes.Symmetry, data?.Diamond?.Symmetry),
		Polish: getEnumKey(attributes.Polish, data?.Diamond?.Polish),

		Depth: data?.Diamond?.Depth,
		Table: data?.Diamond?.Table,
		Measurement: data?.Diamond?.Measurement,
		DiamondShapeId: data?.Diamond?.DiamondShapeId,
		DiamondShape: data?.Diamond?.DiamondShape?.ShapeName,
		DiscountPrice: data?.Diamond?.DiscountPrice,
		DiamondTruePrice: data?.Diamond?.TruePrice,
		DiamondPriceOffset: data?.Diamond?.PriceOffset,
		IsLabDiamond: data?.IsLabDiamond,
		DiamondThumbnail: data?.Diamond?.Thumbnail,
		CriteriaId: data?.Diamond?.DiamondPrice?.CriteriaId,
	};
};

const CartPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userId = getUserId();

	const promotionList = useSelector(GetPromotionSelector);
	const cartList = useSelector(GetCartSelector);

	// const cart = useSelector((state) => {
	// 	const cartByUserId = state.cartSlice?.cartByUserId || {};
	// 	return cartByUserId[userId] || [];
	// });
	const cartFinish = useSelector((state) => {
		const cartFinishByUserId = state.cartSlice?.cartFinishByUserId || {};
		return cartFinishByUserId[userId] || [];
	});

	const [promo, setPromo] = useState('');
	const [jewelryType, setJewelryType] = useState(localStorage.getItem('jewelryType') || '');
	const [cartPreset, setCartPreset] = useState('');
	const [cartDesign, setCartDesign] = useState('');
	const [cart, setCart] = useState('');
	const localCart = JSON.parse(localStorage.getItem(`cart_${userId}`));
	const cartValidate = JSON.parse(localStorage.getItem(`cartValidate_${userId}`));
	const [cartValidateProduct, setCartValidateProduct] = useState([]);
	const [loading, setLoading] = useState(false);
	const [confirmRemove, setConfirmRemove] = useState(false);

	useEffect(() => {
		dispatch(getAllPromo());
	}, []);

	useEffect(() => {
		if (promotionList) {
			setPromo(promotionList);
		}
	}, [promotionList]);

	useEffect(() => {
		if (cartValidateProduct) {
			setCart(cartValidateProduct);
		}
	}, [cartValidateProduct]);

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

	const handleViewCart = (jewelryId, diamondId) => {
		console.log(jewelryId);
		console.log(diamondId);

		if (jewelryId) {
			navigate(`/jewelry/diamond-jewelry/${jewelryId}`);
		} else if (diamondId) {
			navigate(`/diamond-detail/${diamondId}`);
		} else {
			console.error('No jewelry or diamond ID provided.');
		}
	};

	// Lọc các sản phẩm có Jewelry hoặc Diamond
	const jewelryOrDiamondProducts = cartValidate.Products.filter(
		(product) => product.Jewelry || product.Diamond
	);

	const mappedProducts = useMemo(() => {
		if (jewelryOrDiamondProducts && enums) {
			return jewelryOrDiamondProducts.map((product) => mapAttributes(product, enums));
		}
		return [];
	}, [jewelryOrDiamondProducts, enums]);

	// Lọc các sản phẩm có JewelryModel và Diamond hoặc chỉ có JewelryModel
	const jewelryModelAndDiamondProducts = cartValidateProduct.filter(
		(product) => (product.JewelryModel && product.Diamond) || product.JewelryModel
	);

	const mappedProductsFinish = useMemo(() => {
		if (jewelryModelAndDiamondProducts && enums) {
			return jewelryModelAndDiamondProducts.map((product) => mapAttributes(product, enums));
		}
		return [];
	}, [jewelryModelAndDiamondProducts, enums]);

	const handleChangeWarranty = (value) => {
		console.log(value);
	};

	// const handleRemoveCart = (index) => {
	// 	// Xóa đối tượng tại chỉ số index
	// 	localCart.splice(index, 1);

	// 	// Lưu cart cập nhật lại vào localStorage
	// 	localStorage.setItem(`cart_${userId}`, JSON.stringify(localCart));

	// 	setConfirmRemove(true);
	// };

	const handleRemoveCart = (index) => {
		// Xóa đối tượng tại chỉ số index
		localCart.splice(index, 1);

		// Lưu cart cập nhật lại vào localStorage
		localStorage.setItem(`cart_${userId}`, JSON.stringify(localCart));

		// Chuyển đổi dữ liệu sau khi xóa sản phẩm
		const transformedData = localCart.map((productId) => ({
			id: Math.floor(1000000 + Math.random() * 9000000).toString(),
			jewelryId: productId.Id || null,
			diamondId: productId.DiamondId || null,
			jewelryModelId: null,
			sizeId: null,
			metalId: null,
			sideDiamondChoices: [],
			engravedText: null,
			engravedFont: null,
		}));

		// Gọi dispatch sau khi xóa
		dispatch(handleCartValidate({promotionId: null, transformedData}));
	};

	const handleOk = () => {
		// const transformedData = localCart.map((productId, index) => ({
		// 	id: Math.floor(1000000 + Math.random() * 9000000).toString(),
		// 	jewelryId: productId.Id || null,
		// 	diamondId: productId.DiamondId || null,
		// 	jewelryModelId: null,
		// 	sizeId: null,
		// 	metalId: null,
		// 	sideDiamondChoices: [],
		// 	engravedText: null,
		// 	engravedFont: null,
		// }));
		// dispatch(handleCartValidate({promotionId: null, transformedData}));
		// setConfirmRemove(false);
	};
	const handleCancel = () => {
		setConfirmRemove(false);
	};

	if (loading) {
		return <Loading />;
	}

	console.log(cartList);

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
											<p>{item.SizeId}</p>
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

				{mappedProducts?.length > 0 && (
					<div className="bg-white p-6 mx-5 my-5 border rounded-lg shadow-md">
						<h2 className="text-xl font-semibold mb-2 border-b pb-2">Hàng Có Sẵn</h2>
						{mappedProducts.map((item, index) => (
							<div className="flex mt-4 shadow-xl p-5 rounded-lg" key={item.Id}>
								<div className="mr-4 flex-shrink-0">
									<img
										src="path-to-image"
										alt={item?.JewelryName || 'Loose Diamond'}
										className="w-32 h-32 object-cover rounded-lg border"
									/>
								</div>
								<div className="flex-1 mx-5">
									{/* Kiểm tra và hiển thị thông tin sản phẩm */}
									{item.JewelryId ? (
										<div>
											<p className="mb-1 text-gray-800 font-semibold">
												{item.JewelryName}
											</p>
											<p className="text-gray-700 text-sm py-3">
												Giá:
												<span className="text-gray-900 font-semibold">
													{formatPrice(item.JewelryPrice)}
												</span>
											</p>
											{item.CategoryName === 'Ring' && (
												<div className="flex items-center mt-2">
													<label className="mr-2 text-gray-700">
														Kích thước nhẫn:
													</label>
													<p>{item.SizeId}</p>
												</div>
											)}
											{/* <div className="flex items-center mt-2">
												<p className="mr-3">Bảo Hành:</p>
												<Select
													onChange={handleChangeWarranty}
													className="w-20"
													options={[
														{
															label: '2 Năm',
															value: '2 năm',
														},
														{
															label: '4 Năm',
															value: '4 năm',
														},
														{
															label: '6 Năm',
															value: '6 năm',
														},
														{
															label: '10 Năm',
															value: '10 năm',
														},
													]}
												/>
											</div> */}
										</div>
									) : item.Carat ? (
										<div>
											<p className="mb-1 text-gray-800 font-semibold">
												{item.Carat}ct {item.Color}-{item.Clarity}{' '}
												{item.Cut} {item.ShapeName}
											</p>
											<p className="text-gray-700 text-sm">
												Giá:
												<span className="text-gray-900 font-semibold py-3">
													{formatPrice(item.DiamondTruePrice)}
												</span>
											</p>
											{/* <div className="flex items-center mt-2">
												<p className="mr-3">Bảo Hành:</p>
												<Select
													onChange={handleChangeWarranty}
													className="w-20"
													options={[
														{
															label: '2 Năm',
															value: '2 năm',
														},
														{
															label: '4 Năm',
															value: '4 năm',
														},
														{
															label: '6 Năm',
															value: '6 năm',
														},
														{
															label: '10 Năm',
															value: '10 năm',
														},
													]}
												/>
											</div> */}
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
										<EyeOutlined />
									</span>

									<span
										className="cursor-pointer px-3"
										onClick={() => handleRemoveCart(index)}
									>
										<DeleteOutlined />
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
					{promo &&
						promo?.map((promotion) => (
							<Select
								key={promotion.Id}
								defaultValue={promotion.Description}
								className="w-full"
								options={[
									{
										value: promotion.Description,
										label: promotion.Description,
									},
								]}
							/>
						))}
				</div>
			</div>

			<div
				className=" lg:mt-0 flex-shrink-0 w-full lg:w-1/3 bg-gray-50 p-6 mx-5 shadow-lg bg-white rounded-lg lg:sticky lg:top-8"
				style={{width: '30%'}}
			>
				<div className="bg-white p-4 mx-5 my-5 rounded-lg shadow-md space-y-6">
					<div className="space-y-4">
						<p className="flex justify-between text-gray-700">
							<span>Giá Gốc</span>{' '}
							<span>{formatPrice(cartList?.OrderPrices?.DefaultPrice)}</span>
						</p>
						<p className="flex justify-between text-gray-700">
							<span>Giảm Giá</span>{' '}
							<span>-{formatPrice(cartList?.OrderPrices?.DiscountAmountSaved)}</span>
						</p>
						<p className="flex justify-between text-gray-700">
							<span>Khuyến Mãi</span>{' '}
							<span>-{formatPrice(cartList?.OrderPrices?.PromotionAmountSaved)}</span>
						</p>
						<hr className="border-t" />
						<p className="flex justify-between text-gray-900 font-semibold">
							<span>Tổng Giá</span>{' '}
							<span>{formatPrice(cartList?.OrderPrices?.FinalPrice)}</span>
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
			<Modal title="Thông Báo" open={confirmRemove} onOk={handleOk} onCancel={handleCancel}>
				<p>Bạn muốn xóa sản phẩm này khỏi giỏ hàng?</p>
			</Modal>
		</div>
	);
};

export default CartPage;
