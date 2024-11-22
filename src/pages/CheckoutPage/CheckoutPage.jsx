import {Form, Input, message, Radio, Select} from 'antd';
import React, {useEffect, useMemo, useState} from 'react';
import {FaPhoneAlt, FaRegAddressBook, FaRegEnvelope} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {
	CalculateLocationSelector,
	GetAllDistrictSelector,
	GetAllPaymentSelector,
	GetAllWardSelector,
	GetCartSelector,
	GetOrderWarrantySelector,
	GetPromotionAbleSelector,
	GetUserDetailSelector,
	selectDistances,
	selectError,
	selectLoading,
} from '../../redux/selectors';
import {handleOrderCustomizeCheckout} from '../../redux/slices/customizeSlice';
import {
	fetchDistances,
	fetchDistrict,
	fetchWard,
	handleCalculateLocation,
} from '../../redux/slices/distanceSlice';
import {handleCheckoutOrder} from '../../redux/slices/orderSlice';
import {getAllPayment} from '../../redux/slices/paymentSlice';
import {checkPromoCart, getAllPromo} from '../../redux/slices/promotionSlice';
import {convertToVietnamDate, formatPrice} from '../../utils';
import {enums} from '../../utils/constant';
import {handleCartValidate} from '../../redux/slices/cartSlice';
import {getAllWarranty} from '../../redux/slices/warrantySlice';

const {Option} = Select;

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
		Title: data?.Diamond?.Title,
		IsLabDiamond: data?.IsLabDiamond,
		DiamondThumbnail: data?.Diamond?.Thumbnail,
		CriteriaId: data?.Diamond?.DiamondPrice?.CriteriaId,
	};
};

const CheckoutPage = () => {
	const [form] = Form.useForm();
	const locations = useLocation();
	const promoId = locations.state?.promoId;
	const order = locations.state?.order;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const distances = useSelector(selectDistances);
	const districts = useSelector(GetAllDistrictSelector);
	const wards = useSelector(GetAllWardSelector);
	const loading = useSelector(selectLoading);
	const error = useSelector(selectError);
	const userDetail = useSelector(GetUserDetailSelector);
	const cartList = useSelector(GetCartSelector);
	const location = useSelector(CalculateLocationSelector);
	const paymentList = useSelector(GetAllPaymentSelector);
	const warrantyList = useSelector(GetOrderWarrantySelector);
	const promoAble = useSelector(GetPromotionAbleSelector);

	const [warrantiesJewelry, setWarrantiesJewelry] = useState('');
	const [paymentMethod, setPaymentMethod] = useState(null);
	const [paymentForm, setPaymentForm] = useState(null);
	const [shippingFee, setShippingFee] = useState(0);
	const [promoCustomizeId, setPromoCustomizeId] = useState(null);
	const [province, setProvince] = useState('');
	const [district, setDistrict] = useState('');
	const [ward, setWard] = useState('');
	const [provinceId, setProvinceId] = useState('');
	const [wardId, setWardId] = useState('');
	const [promo, setPromo] = useState('');
	const [districtId, setDistrictId] = useState('');
	const [warrantiesJewelrySelected, setWarrantiesJewelrySelected] = useState();
	const [payment, setPayment] = useState();
	const [userInfo, setUserInfo] = useState({
		firstName: userDetail.FirstName || '',
		lastName: userDetail.LastName || '',
		email: userDetail.Email || '',
		phone: '',
		province: userDetail?.Addresses?.[0]?.Province || '',
		district: userDetail?.Addresses?.[0]?.District || '',
		ward: userDetail?.Addresses?.[0]?.Ward || '',
		address: userDetail?.Addresses?.[0]?.Street || '',
		note: '',
	});

	const idCustomize = order?.Id;
	console.log('userDetail', userDetail);

	const defaultAddress =
		userDetail.Addresses.length > 0 &&
		userDetail?.Addresses?.find((address) => address?.IsDefault === true);

	console.log('defaultAddress', defaultAddress);

	useEffect(() => {
		form.setFieldsValue(userInfo);
	}, [form, userInfo]);

	useEffect(() => {
		if (userDetail && userDetail.Addresses && userDetail.Addresses.length > 0) {
			const firstAddress = userDetail.Addresses[0];
			console.log('firstAddress', firstAddress);
			setUserInfo((prev) => ({
				...prev,
				district: defaultAddress?.District || firstAddress?.District || '',
				province: defaultAddress?.Province || firstAddress?.Province || '',
				ward: defaultAddress?.Ward || firstAddress?.Ward || '',
				address: defaultAddress?.Street || firstAddress?.Street || '',
			}));
		}
	}, [userDetail]);

	useEffect(() => {
		dispatch(getAllWarranty());
	}, []);

	// Fetch distances on component mount
	useEffect(() => {
		dispatch(fetchDistances());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getAllPayment());
	}, [dispatch]);

	useEffect(() => {
		if (distances) {
			setProvince(distances);
		}
	}, [distances]);

	useEffect(() => {
		if (paymentList) {
			setPayment(paymentList);
		}
	}, [paymentList]);

	useEffect(() => {
		if (provinceId) dispatch(fetchDistrict(provinceId));
		if (districtId) dispatch(fetchWard(districtId));
	}, [dispatch, provinceId, districtId]);

	useEffect(() => {
		if (districts) {
			setDistrict(districts);
		}
	}, [districts]);

	useEffect(() => {
		if (wards) {
			setWard(wards);
		}
	}, [wards]);

	useEffect(() => {
		dispatch(
			handleCalculateLocation({
				Province: userInfo?.province,
				District: userInfo?.district,
				Ward: userInfo?.ward,
				Street: userInfo?.address,
			})
		);
	}, [userInfo]);

	useEffect(() => {
		if (warrantyList) {
			setWarrantiesJewelry(warrantyList?.Values?.filter((warranty) => warranty?.Type === 2));
		}
	}, [warrantyList]);

	useEffect(() => {
		if (promoAble) {
			setPromo(promoAble?.Promotions);
		}
	}, [promoAble]);

	useEffect(() => {
		dispatch(getAllPromo());
	}, []);

	useEffect(() => {
		if (idCustomize) {
			const transformedData = {
				id: Math.floor(1000000 + Math.random() * 9000000).toString(),
				jewelryId: order?.JewelryId || null,
				diamondId: order?.DiamondId || null,
				jewelryModelId: order?.JewelryModelId || null,
				sizeId: order?.SizeId || null,
				metalId: order?.MetalId.Value,
				sideDiamondChoices: [order?.SideDiamondId],
				engravedText: order?.EngravedText || null,
				engravedFont: order?.EngravedFont || null,
				warrantyCode: warrantiesJewelrySelected?.warrantyCode || null,
				warrantyType: 2,
			};
			dispatch(
				handleCartValidate({
					promotionId: promoCustomizeId || null,
					items: [transformedData],
					accountId: userDetail?.Id,
				})
			);
			dispatch(checkPromoCart({items: [transformedData]}));
		}
	}, [dispatch, order, userDetail, warrantiesJewelrySelected, promoCustomizeId]);

	const jewelryOrDiamondProducts = cartList?.Products.filter(
		(product) => product.Jewelry || product.Diamond
	);

	const mappedProducts = useMemo(() => {
		return jewelryOrDiamondProducts?.map((product) => mapAttributes(product, enums));
	}, [jewelryOrDiamondProducts, enums]);

	// Hàm xử lý gửi form
	const onFinish = async () => {
		const orderItemRequestDtos = cartList?.Products?.map((product) => {
			return {
				jewelryId: product?.Jewelry?.Id || null,
				diamondId: product?.Diamond?.Id || null,
				engravedText: product?.EngravedText || null,
				engravedFont: product?.EngravedFont || null,
				warrantyCode: product?.CurrentWarrantyApplied?.Code || null,
				warrantyType: product?.CurrentWarrantyApplied?.Type || null,
			};
		});

		const orderRequestDto = {
			paymentType: paymentForm,
			paymentId: paymentMethod,
			paymentName: 'zalopay',
			promotionId: promoId || promoCustomizeId,
			isTransfer: true,
		};

		const createOrderInfo = {
			orderRequestDto,

			orderItemRequestDtos,
		};
		const billingDetail = {
			firstName: userInfo?.firstName || null,
			lastName: userInfo?.lastName || null,
			phone: userInfo?.phone || null,
			email: userInfo?.email || null,
			providence: userInfo?.province || null,
			district: userInfo?.district || null,
			ward: userInfo?.ward || null,
			address: userInfo?.address || null,
			note: userInfo?.note || null,
		};

		if (idCustomize) {
			if (
				warrantiesJewelrySelected === undefined ||
				warrantiesJewelrySelected === '' ||
				warrantiesJewelrySelected === null
			) {
				message.warning('Bạn cần phải chọn phiếu bảo hành!');
				return;
			}
			const res = await dispatch(
				handleOrderCustomizeCheckout({
					customizeRequestId: idCustomize,
					orderRequestDto: orderRequestDto,
					billingDetail,
					warrantyCode: warrantiesJewelrySelected?.warrantyCode,
					warrantyType: 2,
				})
			);
			console.log(res);

			if (res.payload !== undefined) {
				message.success('Đặt hàng thành công!');
				navigate('/my-orders');
			} else {
				message.error('Đặt hàng không thành công. Vui lòng kiểm tra thông tin của bạn!');
			}
		} else {
			const res = await dispatch(handleCheckoutOrder({createOrderInfo, billingDetail}));
			console.log(res);

			if (res.payload !== undefined) {
				message.success('Đặt hàng thành công!');
				// window.open(res.payload?.PaymentUrl, '_blank');
				localStorage.removeItem(`cart_${userDetail.Id}`);
				navigate('/my-orders');
			} else {
				message.error('Đặt hàng không thành công. Vui lòng kiểm tra thông tin của bạn!');
			}
		}
	};

	const onChangeWarrantyJewelry = (value) => {
		if (value !== undefined) {
			const parseValue = JSON.parse(value);
			console.log('parseValue', parseValue);
			setWarrantiesJewelrySelected(parseValue);
		} else {
			console.warn('Giá trị "value" là undefined, không có hành động nào được thực hiện');
		}
	};

	const handleCityChange = (value) => {
		const selected = province.find((distance) => distance.Id === value);
		setUserInfo((prev) => ({
			...prev,
			province: selected.Name,
			district: '',
			ward: '',
		}));
		setProvinceId(selected.Id);
		console.log(value);
	};

	const handleDistrictChange = (value) => {
		const selected = district.find((district) => district.Id === value);
		setUserInfo((prev) => ({
			...prev,
			district: selected.Name,
			ward: '',
		}));
		setDistrictId(selected.Id);
		console.log(value);
	};

	const handleWardChange = (value) => {
		const selected = ward.find((district) => district.Id === value);
		setUserInfo((prev) => ({
			...prev,
			ward: selected.Name,
		}));
		setWardId(selected.Id);
		console.log(value);
	};

	const handlePaymentMethodChange = (e) => {
		setPaymentMethod(e.target.value);
	};

	const handlePaymentFormChange = (e) => {
		setPaymentForm(e.target.value);
	};

	const handleChange = (e) => {
		const {name, value} = e.target;
		setUserInfo((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const validatePhoneNumber = (rule, value) => {
		const phoneRegex = /^[0-9]{10}$/; // Regex cho số điện thoại 10 chữ số
		if (!value || phoneRegex.test(value)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('Số điện thoại không hợp lệ!'));
	};

	const handlePromoChange = (value) => {
		console.log('value', value);
		setPromoCustomizeId(value);
	};

	return (
		<div className="min-h-screen flex justify-center items-center bg-gray-100 mx-40 my-20">
			<div className="w-full flex">
				<div className="md:w-2/3">
					<div className="mb-6">
						<div className=" bg-white p-6 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl">
							<h2 className="text-2xl font-semibold text-gray-800">
								Thông tin thanh toán và giao hàng
							</h2>
							<Form
								layout="vertical"
								form={form}
								className="space-y-6"
								// onFinish={onFinish}
								// onFinishFailed={onFinishFailed}
							>
								<div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4">
									<div className="w-full md:w-1/2 p-1">
										<Form.Item
											label={
												<>
													<FaRegAddressBook className="inline-block mr-2" />
													Tên
												</>
											}
											name="firstName"
											rules={[
												{
													required: true,
													message: 'Vui lòng nhập tên của bạn',
												},
											]}
										>
											<Input
												placeholder="Tên"
												name="firstName"
												onChange={handleChange}
											/>
										</Form.Item>
									</div>
									<div className="w-full md:w-1/2 p-1">
										<Form.Item
											label={
												<>
													<FaRegAddressBook className="inline-block mr-2" />
													Họ
												</>
											}
											name="lastName"
											rules={[
												{
													required: true,
													message: 'Vui lòng nhập họ của bạn',
												},
											]}
										>
											<Input
												placeholder="Họ"
												name="lastName"
												onChange={handleChange}
											/>
										</Form.Item>
									</div>
								</div>

								<Form.Item
									label="Tỉnh thành"
									name="city"
									rules={[
										{
											required: true,
											message: 'Vui lòng nhập thành phố',
										},
									]}
								>
									<Select
										placeholder="Chọn tỉnh thành"
										onChange={handleCityChange}
										disabled={loading}
										loading={loading}
										defaultValue={
											defaultAddress?.Province ||
											userInfo.province ||
											undefined
										}
										value={userInfo.province || undefined}
									>
										{province &&
											province.map((distance) => (
												<Select.Option
													key={distance.Id}
													value={distance.Id}
												>
													{distance.Name}
												</Select.Option>
											))}
									</Select>
								</Form.Item>

								<div className="flex flex-col mb-4">
									<label className="flex justify-start items-center mb-2">
										<p className="text-red mr-1">*</p>Quận / Huyện
									</label>
									<Select
										placeholder="Chọn quận/huyện"
										onChange={handleDistrictChange}
										disabled={loading}
										loading={loading}
										value={userInfo?.district}
									>
										{district &&
											district?.map((distance) => (
												<Select.Option
													key={distance.Id}
													value={distance.Id}
												>
													{distance.Name}
												</Select.Option>
											))}
									</Select>
								</div>

								<div className="flex flex-col mb-4">
									<label className="flex justify-start items-center mb-2">
										<p className="text-red mr-1">*</p>Phường / Xã
									</label>
									<Select
										placeholder="Chọn phường/xã"
										onChange={handleWardChange}
										disabled={loading}
										loading={loading}
										value={userInfo?.ward}
									>
										{ward &&
											ward.map((distance) => (
												<Select.Option
													key={distance.Id}
													value={distance.Id}
												>
													{distance.Name}
												</Select.Option>
											))}
									</Select>
								</div>

								<div className="flex flex-col mb-4">
									<label className="flex justify-start items-center mb-2">
										<p className="text-red mr-1">*</p>Số Nhà
									</label>
									<Input
										placeholder="Số nhà"
										name="address"
										onChange={handleChange}
										value={userInfo.address}
									/>
									<p className="text-red mt-2">
										* Không nhập lại thông tin Phường/Xã - Quận/Huyện -
										Tỉnh/Thành vào ô này
									</p>
								</div>

								<div className="flex flex-col md:flex-row md:space-x-4 gap-4">
									<div className="w-full md:w-1/2 p-1">
										<Form.Item
											label={
												<>
													<FaPhoneAlt className="inline-block mr-2" />
													Điện thoại
												</>
											}
											name="phone"
											rules={[
												{
													required: true,
													message: 'Vui lòng nhập số điện thoại!',
												},
												{validator: validatePhoneNumber},
											]}
										>
											<Input
												placeholder="Điện thoại"
												type="tel"
												maxLength={10}
												name="phone"
												onChange={handleChange}
											/>
										</Form.Item>
									</div>
									<div className="w-full md:w-1/2 p-1">
										<Form.Item
											label={
												<>
													<FaRegEnvelope className="inline-block mr-2" />
													Email
												</>
											}
											name="email"
											rules={[
												{
													required: true,
													type: 'email',
													message: 'Vui lòng nhập địa chỉ email hợp lệ',
												},
											]}
										>
											<Input placeholder="Email" />
										</Form.Item>
									</div>
								</div>

								<Form.Item label="Ghi chú đơn hàng (tùy chọn)" className="p-1">
									<Input.TextArea
										placeholder="Ghi chú đơn hàng"
										name="note"
										onChange={handleChange}
									/>
								</Form.Item>

								<div className="my-6">
									<div className=" bg-white p-6 rounded-lg shadow-lg space-y-6 mt-6 md:mt-0 transition-shadow duration-300 hover:shadow-2xl">
										<h2 className="text-2xl font-semibold text-gray-800 mb-6">
											Hình thức thanh toán
										</h2>
										<div className="py-3">
											<Radio.Group
												className="flex flex-col"
												onChange={handlePaymentFormChange}
												name="paymentForm"
												value={paymentForm}
											>
												<Radio
													value="1"
													className="border p-4 rounded-md hover:border-blue-500 transition duration-300 mb-4"
												>
													Trả Hết
												</Radio>
												<Radio
													value="2"
													className="border p-4 rounded-md hover:border-blue-500 transition duration-300 mb-4"
												>
													Thanh Toán Khi Nhận Hàng
												</Radio>
											</Radio.Group>
										</div>
									</div>
								</div>
								{paymentForm && (
									<div className="my-6">
										<div className="bg-white p-6 rounded-lg shadow-lg space-y-6 mt-6 md:mt-0 transition-shadow duration-300 hover:shadow-2xl">
											<h2 className="text-2xl font-semibold text-gray-800 mb-6">
												Phương thức thanh toán
											</h2>
											<div className="py-3">
												<Radio.Group
													className="flex flex-col"
													onChange={handlePaymentMethodChange}
													name="paymentMethod"
													value={paymentMethod}
												>
													{payment &&
														payment.map((method) => {
															const isDisabled =
																(order?.Jewelry?.SoldPrice >
																	50000000 ||
																	cartList?.OrderPrices
																		?.FinalPrice > 50000000) &&
																method.MethodName === 'ZALOPAY';

															return (
																<Radio
																	value={method.Id}
																	className="border p-4 rounded-md hover:border-blue-500 transition duration-300 mb-4"
																	disabled={isDisabled}
																>
																	{method?.MappedName}
																</Radio>
															);
														})}
												</Radio.Group>
											</div>
										</div>
									</div>
								)}
							</Form>
						</div>
					</div>
				</div>

				<div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg md:mt-0 transition-shadow duration-300 hover:shadow-2xl">
					<div className="flex justify-between">
						<h2 className="text-2xl font-semibold text-gray-800 mb-6">
							Tóm tắt đơn hàng
						</h2>
						<div className="flex justify-center items-center">
							{idCustomize ? (
								<a
									href="/request-customize"
									className="text-sm text-yellow-500 hover:underline"
								>
									Về danh sách đơn thiết kế
								</a>
							) : (
								<a href="/cart" className="text-sm text-yellow-500 hover:underline">
									Về giỏ hàng
								</a>
							)}
						</div>
					</div>
					<div className="space-y-6">
						{idCustomize ? (
							<>
								<div className="flex mt-4 shadow-xl p-5 rounded-lg" key={order.Id}>
									<div className="mr-4 flex-shrink-0">
										<img
											src="path-to-image"
											alt={order?.Jewelry?.SerialCode || order?.Title}
											className="w-32 h-32 object-cover rounded-lg border"
										/>
									</div>
									<div className="flex-1 mx-5">
										<div>
											<p className="mb-1 text-gray-800 font-semibold">
												{order?.Jewelry?.SerialCode}
											</p>
											<p className="text-gray-700 text-sm py-2">
												Giá:
												<span className="text-gray-900 font-semibold ml-1">
													{formatPrice(
														order?.Jewelry?.SoldPrice ||
															order?.Jewelry?.TotalPrice
													)}
												</span>
											</p>
										</div>
										<label>Chọn bảo hành trang sức</label>
										<Select
											// allowClear
											// value={}
											className="w-64 mt-1 mb-5"
											placeholder="Bảo hành"
											onChange={onChangeWarrantyJewelry}
										>
											{warrantiesJewelry &&
												warrantiesJewelry?.map((warranty, i) => (
													<Select.Option
														key={i}
														value={JSON.stringify({
															warrantyCode: warranty.Code,
															warrantyType: warranty?.Type,
														})}
													>
														{warranty.Name.replace(/_/g, ' ')}
													</Select.Option>
												))}
										</Select>
									</div>
								</div>
							</>
						) : (
							<>
								{mappedProducts?.map((item, index) => (
									<div
										className="flex mt-4 shadow-xl p-5 rounded-lg"
										key={item.Id}
									>
										<div className="mr-4 flex-shrink-0">
											<img
												src="path-to-image"
												alt={item?.SerialCode || item?.Title}
												className="w-32 h-32 object-cover rounded-lg border"
											/>
										</div>
										<div className="flex-1 mx-5">
											{/* Kiểm tra và hiển thị thông tin sản phẩm */}
											{item.JewelryId ? (
												<div>
													<p className="mb-1 text-gray-800 font-semibold">
														{item.SerialCode}
													</p>
													<p className="text-gray-700 text-sm py-3">
														Giá:
														<span className="text-gray-900 font-semibold ml-1">
															{formatPrice(item.JewelryPrice)}
														</span>
													</p>
													{item.CategoryName === 'Ring' && (
														<div className="flex items-center mt-2">
															<label className="mr-2 text-gray-700">
																Kích thước nhẫn:
															</label>
															<p>{item?.SizeId}</p>
														</div>
													)}
												</div>
											) : item.Carat ? (
												<div>
													<p className="mb-1 text-gray-800 font-semibold">
														{item?.Title}
													</p>
													<p className="text-gray-700 text-sm">
														Giá:
														<span className="text-gray-900 font-semibold py-3">
															{formatPrice(item.DiamondTruePrice)}
														</span>
													</p>
												</div>
											) : (
												<p className="text-gray-800">Không có thông tin</p>
											)}
										</div>
									</div>
								))}
							</>
						)}

						<div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
							{/* Total and Savings Section */}
							<div className="p-4 border rounded-lg bg-gray-50">
								<div className="flex justify-between font-semibold text-gray-800 mb-2">
									<span>Giá tạm tính:</span>
									<span>{formatPrice(cartList?.OrderPrices?.DefaultPrice)}</span>
								</div>
								<div className="flex justify-between text-gray-800 mb-2">
									<span>Phí vận chuyển:</span>
									<span>{formatPrice(location?.DeliveryFee?.Cost || 0)}</span>
								</div>
								{idCustomize && (
									<>
										<label
											htmlFor="promotions"
											className="block mb-2 text-gray-700 font-medium"
										>
											Khuyến mãi có sẵn
										</label>

										<Select
											className="w-full"
											onChange={handlePromoChange}
											allowClear
										>
											{promo &&
												promo.map((promotion) => (
													<Select.Option
														key={promotion.PromoId}
														value={promotion.PromoId}
													>
														{promotion.PromotionDto.IsActive && (
															<>
																{promotion.PromotionDto.Description}
															</>
														)}
													</Select.Option>
												))}
										</Select>
									</>
								)}

								<p className="flex justify-between mb-2">
									{cartList?.OrderPrices?.DiscountAmountSaved !== 0 ? (
										<>
											<span>Giảm Giá</span>{' '}
											<span>
												-
												{formatPrice(
													cartList?.OrderPrices?.DiscountAmountSaved
												)}
											</span>
										</>
									) : (
										<></>
									)}
								</p>
								<p className="flex justify-between">
									{cartList?.OrderPrices?.PromotionAmountSaved !== 0 ? (
										<>
											<span>Khuyến Mãi</span>{' '}
											<span>
												-
												{formatPrice(
													cartList?.OrderPrices?.PromotionAmountSaved
												)}
											</span>
										</>
									) : (
										<></>
									)}
								</p>
								<p className="flex justify-between mb-2">
									<span>Bảo Hành</span>{' '}
									<span>
										{formatPrice(cartList?.OrderPrices?.TotalWarrantyPrice)}
									</span>
								</p>
								<p className="flex justify-between mb-2">
									{cartList?.OrderPrices?.UserRankDiscountAmount !== 0 ? (
										<>
											<span>Khách Hàng Thân Thiết</span>

											<span>
												-
												{formatPrice(
													cartList?.OrderPrices?.UserRankDiscountAmount
												)}
											</span>
										</>
									) : (
										<></>
									)}
								</p>

								<div className="flex text-sm text-gray-600 my-2">
									<span className="mr-2">📅 Thời gian giao hàng</span>
									{idCustomize ? (
										<span>Giao hàng sau 7 ngày</span>
									) : (
										<span>Giao hàng sau 3 ngày</span>
									)}
								</div>

								<div className="flex justify-between items-center font-semibold mt-4 text-lg">
									<p>Tổng:</p>
									<p>
										{formatPrice(
											cartList?.OrderPrices?.FinalPrice +
												location?.DeliveryFee?.Cost ||
												cartList?.OrderPrices?.FinalPrice
										)}
									</p>
								</div>
							</div>

							{/* Order Button Section */}
							<div className="flex justify-center mt-6 w-full ">
								<button
									className="mx-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
									onClick={onFinish}
									loading={loading}
								>
									Đặt hàng
								</button>
							</div>

							{/* Customer Service Section */}
							<div className="text-center text-sm text-gray-600 mt-6">
								24/7 Dịch vụ chăm sóc khách hàng
								<div className="mt-2 flex items-center justify-center space-x-4">
									<div className="flex items-center space-x-1">
										<span>📞</span>
										<span>1-800-242-2728</span>
									</div>
									<div className="flex items-center space-x-1">
										<span>💬</span>
										<span className="text-blue-600">
											Trò chuyện cùng chúng tôi{' '}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;
