import React, {useEffect, useMemo, useState} from 'react';

import {DeleteOutlined, EyeOutlined, InfoCircleFilled} from '@ant-design/icons';
import DiamondIcon from '@mui/icons-material/Diamond';
import {Button, Divider, Image, message, Popover, Select, Space} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import logo from '../../assets/logo-short-ex.png';
import {getUserId} from '../../components/GetUserId';
import Loading from '../../components/Loading';
import {
	GetCartSelector,
	GetPromotionAbleSelector,
	GetUserDetailSelector,
	LoadingCartSelector,
} from '../../redux/selectors';
import {handleCartValidate} from '../../redux/slices/cartSlice';
import {checkPromoCart, getAllPromo} from '../../redux/slices/promotionSlice';
import {formatPrice} from '../../utils';
import {enums} from '../../utils/constant';

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
		DefaultPrice: data?.ReviewPrice?.DefaultPrice,
		FinalPrice: data?.ReviewPrice?.FinalPrice,
		JewelryName: data?.Jewelry?.Model?.Name,
		SerialCode: data?.Jewelry?.SerialCode,
		ShippingDate: data?.Jewelry?.ShippingDate,
		SideDiamonds: data?.Jewelry?.SideDiamonds,
		TitleJewelry: data?.Jewelry?.Title,
		DiamondJewelry: data?.Jewelry?.Diamonds,
		JewelryThumbnail: data?.Jewelry?.Model?.Thumbnail?.MediaPath,
		SizeId: data?.Jewelry?.SizeId,
		Weight: data?.Jewelry?.Weight,
		JewelryModel: data.JewelryModel,
		PromotionId: data.PromotionId,
		SerialCodeDiamond: data?.Diamond?.SerialCode,
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
		DiamondThumbnail: data?.Diamond?.Thumbnail?.MediaPath,
		CriteriaId: data?.Diamond?.DiamondPrice?.CriteriaId,
	};
};

const CartPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userId = getUserId();

	const cartList = useSelector(GetCartSelector);
	const promoAble = useSelector(GetPromotionAbleSelector);
	const loading = useSelector(LoadingCartSelector);
	const userDetail = useSelector(GetUserDetailSelector);

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
				productId?.warrantyJewelry?.warranty?.Code ||
				productId?.warrantyDiamond?.warranty?.Code,
			warrantyType:
				productId?.warrantyJewelry?.warranty?.Type ||
				productId?.warrantyDiamond?.warranty?.Type,
		}));
		const defaultAddress = userDetail?.Addresses?.find((address) => address?.IsDefault);

		const userAddress = {
			province: defaultAddress?.Province,
			district: defaultAddress?.District,
			ward: defaultAddress?.Ward,
			street: defaultAddress?.Street,
		};

		// Kiểm tra nếu userAddress có dữ liệu, nếu không thì không truyền userAddress
		const actionPayload = {
			promotionId: promoId != undefined ? promoId : null,
			items: transformedData,
			accountId: userDetail?.Id,
		};

		// Nếu userAddress có dữ liệu, thêm vào payload
		if (
			userAddress.province ||
			userAddress.district ||
			userAddress.ward ||
			userAddress.street
		) {
			actionPayload.userAddress = userAddress;
		}

		dispatch(handleCartValidate(actionPayload));

		dispatch(checkPromoCart({items: transformedData}));
	}, [promoId]);

	const handleViewCart = (jewelryId, diamondId) => {
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
		dispatch(
			handleCartValidate({
				promotionId: null,
				items: transformedData,
				accountId: userDetail?.Id,
			})
		).then((res) => {
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
		setPromoId(value);
	};

	const text = <span>Kim Cương</span>;
	const content = (
		<div>
			{mappedProducts?.map((item, index) => (
				<div className=" flex flex-col p-5 rounded-lg" key={item.Id}>
					<div className="flex-1 mx-5 sm:mt-0">
						<div className="mr-3">
							<DiamondIcon />
						</div>
						{item?.DiamondJewelry?.map((diamond) => (
							<div>{diamond?.Title}</div>
						))}
					</div>
				</div>
			))}
		</div>
	);

	return (
		<div className="mt-5 p-8 bg-gray-50 mx-5 md:mx-16 lg:mx-32 my-10 flex flex-col md:flex-row">
			{/* Left Segment: Engagement Ring, Loose Diamond, Promotions */}
			<div className="md:w-2/3 flex-1 lg:mr-8 space-y-8 shadow-lg bg-white rounded-lg">
				{mappedProducts?.length > 0 ? (
					<div className="bg-white p-6 mx-5 my-5 border rounded-lg shadow-md">
						<h2 className="text-xl font-semibold mb-2 border-b pb-2">Giỏ Hàng</h2>
						{loading ? (
							<Loading />
						) : (
							<>
								{mappedProducts.map((item, index) => (
									<div
										className="relative flex flex-col md:flex-row mt-4 shadow-xl p-5 rounded-lg"
										key={item.Id}
									>
										<div className="mr-4 flex-shrink-0 w-full sm:w-32 md:w-32 lg:w-32">
											<img
												src={
													item?.DiamondThumbnail || item?.JewelryThumbnail
												}
												alt={
													item?.DiamondThumbnail ||
													item?.Title ||
													item?.Thumbnail?.MediaName
												}
												className="w-full h-32 object-cover rounded-lg border"
											/>
										</div>
										<div className="flex-1 mx-5 mt-4 sm:mt-0">
											{item.JewelryId ? (
												<div>
													<p className="mb-1 text-gray-800 font-semibold">
														{item.TitleJewelry}{' '}
													</p>
													{item?.FinalPrice === item.DefaultPrice ? (
														<p className="text-gray-700 text-sm py-3 ml-1">
															Giá:
															<span className="text-gray-900 font-semibold ml-1">
																{formatPrice(item.DefaultPrice)}
															</span>
														</p>
													) : (
														<p className="text-gray-700 text-sm py-3 ml-1">
															Giá:
															<span className="text-gray-900 font-semibold ml-1 line-through text-gray">
																{formatPrice(item.DefaultPrice)}
															</span>
															<span className="text-gray-900 font-semibold ml-1">
																{formatPrice(item.FinalPrice)}
															</span>
														</p>
													)}

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
											) : item.Carat ? (
												<div>
													<p className="mb-1 text-gray-800 font-semibold">
														{item?.Title}
													</p>
													<p className="text-gray-700 text-sm mt-3">
														SKU:
														<span className="text-gray-900 font-semibold ml-1">
															{item?.SerialCodeDiamond}
														</span>
													</p>
													{item?.FinalPrice === item.DefaultPrice ? (
														<p className="text-gray-700 text-sm py-3 ml-1">
															Giá:
															<span className="text-gray-900 font-semibold ml-1">
																{formatPrice(item.DefaultPrice)}
															</span>
														</p>
													) : (
														<p className="text-gray-700 text-sm py-3 ml-1">
															Giá:
															<span className="text-gray-900 font-semibold ml-1 line-through text-gray">
																{formatPrice(item.DefaultPrice)}
															</span>
															<span className="text-gray-900 font-semibold ml-1">
																{formatPrice(item.FinalPrice)}
															</span>
														</p>
													)}
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
										<div className="flex flex-col justify-between md:flex-row items-center">
											<Space className="text-sm mb-2 md:mb-0">
												<Button
													className="cursor-pointer px-3 mr-2"
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
											</Space>
											{item.IsValid === false && (
												<div className="absolute right-2 bottom-2 text-red font-semibold">
													<p>Hàng Không Còn</p>
												</div>
											)}
										</div>
									</div>
								))}
							</>
						)}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center p-10">
						<Image preview={false} src={logo} className="w-32 h-32" />
						<p className="text-xl font-semibold text-gray-600 mb-4">Giỏ Hàng Trống</p>
						<Button type="text" className="bg-primary" onClick={() => navigate('/')}>
							Về Trang Chủ
						</Button>
					</div>
				)}

				<div className="bg-white p-6 mx-5 my-5 border rounded-lg shadow-md">
					<label htmlFor="promotions" className="block mb-2 font-medium">
						Khuyến mãi có sẵn
					</label>

					<Select
						className="w-full"
						onChange={handlePromoChange}
						allowClear
						notFoundContent="Chưa Có Khuyến Mãi Nào Áp Dụng Được Cho Các Sản Phẩm Này"
					>
						{promo &&
							promo.map((promotion) => (
								<Select.Option
									key={promotion.PromoId}
									value={promotion.PromoId}
									disabled={!promotion?.IsApplicable}
								>
									<div
										className={`${
											promotion?.IsApplicable ? 'text-darkGreen' : 'text-red'
										}`}
									>
										{promotion.PromotionDto.Description}
									</div>
								</Select.Option>
							))}
					</Select>
				</div>
			</div>
			{cartList?.Products?.length > 0 && (
				<div className="md:w-1/3 lg:mt-0 flex-shrink-0 w-full lg:w-1/3 p-6 md:mx-5 shadow-lg bg-white rounded-lg lg:sticky lg:top-8">
					<div className="bg-white p-4 mx-5 my-5 rounded-lg shadow-lg space-y-6">
						<div className="space-y-4">
							{cartList?.OrderPrices?.DefaultPrice !== 0 && (
								<div className="flex justify-between mb-1">
									<span className="font-semibold">Giá Gốc</span>{' '}
									<span>
										{formatPrice(cartList?.OrderPrices?.DefaultPrice || 0)}
									</span>
								</div>
							)}

							<div className="flex justify-between mb-1">
								<div className="mb-1 flex justify-between w-full">
									<span className="font-semibold">Phí Vận Chuyển</span>{' '}
									{cartList?.OrderPrices?.FinalShippingPrice ===
									cartList?.OrderPrices?.ShippingPriceSaved ? (
										<span>
											{formatPrice(
												cartList?.OrderPrices?.FinalShippingPrice || 0
											)}
										</span>
									) : (
										<span>
											{formatPrice(
												cartList?.OrderPrices?.FinalShippingPrice || 0
											)}{' '}
											(-
											{formatPrice(
												cartList?.OrderPrices?.ShippingPriceSaved || 0
											)}
											)
										</span>
									)}
								</div>
							</div>

							{cartList?.OrderPrices?.DiscountAmountSaved !== 0 && (
								<div className="flex justify-between mb-1">
									<div className="mb-1 flex justify-between w-full">
										<span className="font-semibold">Giảm Giá</span>{' '}
										<span>
											-
											{formatPrice(
												cartList?.OrderPrices?.DiscountAmountSaved || 0
											)}
										</span>
									</div>
								</div>
							)}
							{cartList?.OrderPrices?.PromotionAmountSaved !== 0 && (
								<div className="flex justify-between mb-1">
									<div className="mb-1 flex justify-between w-full">
										<span className="font-semibold">Khuyến Mãi</span>{' '}
										<span>
											-
											{formatPrice(
												cartList?.OrderPrices?.PromotionAmountSaved || 0
											)}
										</span>
									</div>
								</div>
							)}
							{cartList?.OrderPrices?.TotalWarrantyPrice !== 0 && (
								<div className="flex justify-between mb-1">
									<div className="mb-1 flex justify-between w-full">
										<span className="font-semibold">Bảo Hành</span>{' '}
										<span>
											{formatPrice(
												cartList?.OrderPrices?.TotalWarrantyPrice || 0
											)}
										</span>
									</div>
								</div>
							)}

							{cartList?.OrderPrices?.UserRankDiscountAmount !== 0 && (
								<div className="flex justify-between mb-1">
									<div className="mb-1 flex justify-between w-full">
										<span className="font-semibold">Khách Hàng Thân Thiết</span>

										<span>
											{cartList?.OrderPrices?.UserRankDiscountAmount !== 0 &&
												'-'}
											{formatPrice(
												cartList?.OrderPrices?.UserRankDiscountAmount || 0
											)}
										</span>
									</div>
								</div>
							)}

							<Divider />
							<p className="flex justify-between text-gray-900 font-semibold">
								<span>Tổng Giá</span>{' '}
								<span>{formatPrice(cartList?.OrderPrices?.FinalPrice || 0)}</span>
							</p>
						</div>
					</div>
					<Button
						className="mr-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold w-full h-12"
						style={{padding: '13px 0px 11px 0px'}}
						onClick={handleCheckoutNavigate}
						disabled={mappedProducts?.length === 0}
					>
						Thanh Toán
					</Button>
				</div>
			)}
		</div>
	);
};

export default CartPage;
