import React, {useEffect, useMemo, useState} from 'react';

import {DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import {Button, Image, message, Select} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getUserId} from '../../components/GetUserId';
import Loading from '../../components/Loading';
import {
	GetCartSelector,
	GetPromotionAbleSelector,
	GetPromotionSelector,
	LoadingCartSelector,
} from '../../redux/selectors';
import {handleCartValidate, removeFromCartFinish} from '../../redux/slices/cartSlice';
import {checkPromoCart, getAllPromo} from '../../redux/slices/promotionSlice';
import {formatPrice} from '../../utils';
import {enums} from '../../utils/constant';
import logo from '../../assets/logo-short-ex.png';

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
		JewelryPrice: data?.Jewelry?.TotalPrice,
		JewelryName: data?.Jewelry?.Model?.Name,
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
		CurrentWarrantyApplied: data?.CurrentWarrantyApplied,
		CurrentWarrantyPrice: data?.CurrentWarrantyPrice,
		DiamondId: data?.Diamond?.Id,
		Depth: data?.Diamond?.Depth,
		Table: data?.Diamond?.Table,
		Measurement: data?.Diamond?.Measurement,
		DiamondShapeId: data?.Diamond?.DiamondShapeId,
		DiamondShape: data?.Diamond?.DiamondShape?.ShapeName,
		DiscountPrice: data?.Diamond?.DiscountPrice,
		DiamondTruePrice: data?.Diamond?.TruePrice,
		Title: data?.Diamond?.Title,
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
	const promoAble = useSelector(GetPromotionAbleSelector);
	const loading = useSelector(LoadingCartSelector);

	const [promo, setPromo] = useState('');
	const [cart, setCart] = useState('');
	const localCart = JSON.parse(localStorage.getItem(`cart_${userId}`));
	const cartValidate = JSON.parse(localStorage.getItem(`cartValidate_${userId}`));
	const [cartValidateProduct, setCartValidateProduct] = useState([]);
	const [promoId, setPromoId] = useState(null);

	useEffect(() => {
		dispatch(getAllPromo());
	}, []);

	useEffect(() => {
		if (promoAble) {
			setPromo(promoAble?.Promotions);
		}
	}, [promoAble]);

	useEffect(() => {
		if (cartValidateProduct) {
			setCart(cartValidateProduct);
		}
	}, [cartValidateProduct]);

	useEffect(() => {
		const local = JSON.parse(localStorage.getItem(`cart_${userId}`));
		const transformedData = local?.map((productId, index) => ({
			id: Math.floor(1000000 + Math.random() * 9000000).toString(),
			jewelryId: productId.JewelryId || null,
			diamondId: productId.DiamondId || null,
			jewelryModelId: productId.ModelId || null,
			sizeId: productId?.SizeId || null,
			metalId: productId?.MetalId,
			sideDiamondChoices: [],
			engravedText: productId?.engravedText || null,
			engravedFont: productId?.engravedFont || null,
			warrantyCode:
				productId?.warrantyJewelry?.warrantyCode ||
				productId?.warrantyDiamond?.warrantyCode,
			warrantyType:
				productId?.warrantyJewelry?.warrantyType ||
				productId?.warrantyDiamond?.warrantyType,
		}));

		dispatch(handleCartValidate({promotionId: null, transformedData}));
		dispatch(checkPromoCart({transformedData}));
	}, []);

	const handleViewCart = (jewelryId, diamondId) => {
		console.log(jewelryId);
		console.log(diamondId);

		if (jewelryId) {
			navigate(`/completed-jewelry/${jewelryId}`, {state: {jewelryId}});
		} else if (diamondId) {
			navigate(`/diamond-detail/${diamondId}`, {state: {diamondId}});
		} else {
			console.error('No jewelry or diamond ID provided.');
		}
	};

	// Lọc các sản phẩm có Jewelry hoặc Diamond
	const jewelryOrDiamondProducts = cartValidate?.Products.filter(
		(product) => product.Jewelry || product.Diamond
	);

	const mappedProducts = useMemo(() => {
		if (cartValidate && enums) {
			return cartValidate?.Products?.map((product) => mapAttributes(product, enums));
		}
		return [];
	}, [jewelryOrDiamondProducts, enums]);

	// Lọc các sản phẩm có JewelryModel và Diamond hoặc chỉ có JewelryModel
	const jewelryModelAndDiamondProducts = cartValidateProduct.filter(
		(product) => (product.JewelryModel && product.Diamond) || product.JewelryModel
	);

	const handleRemoveCart = (index) => {
		localCart.splice(index, 1);

		localStorage.setItem(`cart_${userId}`, JSON.stringify(localCart));

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
		dispatch(handleCartValidate({promotionId: null, transformedData})).then((res) => {
			if (res.payload) {
				message.success('Xóa sản phẩm thành công!');
			}
		});
	};

	const handleCheckoutNavigate = () => {
		if (mappedProducts.length > 0) {
			navigate(`/checkout`, {state: {promoId}});
		} else {
			message.warning('Giỏ hàng chưa có sản phẩm!');
		}
	};

	const handlePromoChange = (value) => {
		console.log('value', value);
		setPromoId(value);
	};

	return (
		<div className="flex justify-between p-8 bg-gray-50 min-h-screen mx-32 my-20">
			{/* Left Segment: Engagement Ring, Loose Diamond, Promotions */}

			<div
				className="flex-1 lg:mr-8 space-y-8 shadow-lg bg-white rounded-lg"
				style={{width: '70%'}}
			>
				{mappedProducts?.length > 0 ? (
					<div className="bg-white p-6 mx-5 my-5 border rounded-lg shadow-md">
						<h2 className="text-xl font-semibold mb-2 border-b pb-2">Giỏ Hàng</h2>
						{loading ? (
							<Loading />
						) : (
							<>
								{mappedProducts.map((item, index) => (
									<div
										className="relative flex mt-4 shadow-xl p-5 rounded-lg"
										key={item.Id}
									>
										<div className="mr-4 flex-shrink-0">
											<img
												src="path-to-image"
												alt={item?.JewelryName || 'Loose Diamond'}
												className="w-32 h-32 object-cover rounded-lg border"
											/>
										</div>
										<div className="flex-1 mx-5">
											{item.JewelryId ? (
												<div>
													<p className="mb-1 text-gray-800 font-semibold">
														{item.SerialCode} {item.MetalName}
													</p>
													<p className="text-gray-700 text-sm py-3 ml-1">
														Giá:
														<span className="text-gray-900 font-semibold">
															{formatPrice(item.JewelryPrice)}
														</span>
													</p>
													<p className="text-gray-700 text-sm">
														Bảo hành:
														<span className="text-gray-900 font-semibold mx-3">
															{(
																item.CurrentWarrantyApplied?.Code ||
																''
															).replace(/_/g, ' ')}
														</span>
														<span>
															{formatPrice(
																item?.CurrentWarrantyApplied?.Price
															)}
														</span>
													</p>
													{/* {item?.Diamonds?.map((diamond) => (
												<>
													<p className="mb-1 text-gray-800 font-semibold">
														{diamond.Title}
													</p>
													<p className="text-gray-700 text-sm py-3">
														Giá:
														<span className="text-gray-900 font-semibold">
															{formatPrice(diamond.TruePrice)}
														</span>
													</p>
												</>
											))} */}

													{/* {item.CategoryName === 'Ring' && (
												<div className="flex items-center mt-2">
													<label className="mr-2 text-gray-700">
														Kích thước nhẫn:
													</label>
													<p>{item.SizeId}</p>
												</div>
											)} */}
												</div>
											) : item.Carat ? (
												<div>
													<p className="mb-1 text-gray-800 font-semibold">
														{item?.Title}
													</p>
													<p className="text-gray-700 text-sm py-3">
														Giá:
														<span className="text-gray-900 font-semibold py-3 ml-1">
															{formatPrice(item.DiamondTruePrice)}
														</span>
													</p>
													<p className="text-gray-700 text-sm">
														Bảo hành:
														<span className="text-gray-900 font-semibold mx-3">
															{(
																item.CurrentWarrantyApplied?.Code ||
																''
															).replace(/_/g, ' ')}
														</span>
														<span>
															{formatPrice(
																item?.CurrentWarrantyApplied?.Price
															)}
														</span>
													</p>
												</div>
											) : (
												<p className="text-gray-800">Không có thông tin</p>
											)}
										</div>
										<div className="flex items-center justify-end space-y-2 text-sm">
											<Button
												className="cursor-pointer w-auto hover:text-black text-primary text-xl px-3 mr-2"
												onClick={() => {
													if (item.JewelryId) {
														handleViewCart(item.JewelryId, null);
													} else if (item.DiamondId !== undefined) {
														handleViewCart(null, item.DiamondId);
													}
												}}
											>
												<EyeOutlined />
											</Button>
											<Button
												loading={loading}
												danger
												className="cursor-pointer px-3"
												onClick={() => handleRemoveCart(index)}
											>
												<DeleteOutlined />
											</Button>
										</div>
										{item.IsValid === false && (
											<div className="absolute right-2 bottom-2 text-red font-semibold">
												<p>Hàng Không Còn</p>
											</div>
										)}
									</div>
								))}
							</>
						)}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center p-10">
						<Image preview={false} src={logo} className="w-32 h-32" />
						<p className="text-xl font-semibold text-gray-600 mb-4">Giỏ Hàng Trống</p>
						<Button
							type="text"
							className="bg-primary"
							// onClick={() => (window.location.href = '/')}
						>
							Về Trang Chủ
						</Button>
					</div>
				)}

				<div className="bg-white p-6 mx-5 my-5 border rounded-lg shadow-md">
					<label htmlFor="promotions" className="block mb-2 text-gray-700 font-medium">
						Khuyến mãi có sẵn
					</label>

					<Select className="w-full" onChange={handlePromoChange} allowClear>
						{promo &&
							promo.map((promotion) => (
								<Select.Option key={promotion.PromoId} value={promotion.PromoId}>
									{promotion.PromotionDto.Description}
								</Select.Option>
							))}
					</Select>
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
					onClick={handleCheckoutNavigate}
				>
					Thanh Toán
				</button>
			</div>
		</div>
	);
};

export default CartPage;
