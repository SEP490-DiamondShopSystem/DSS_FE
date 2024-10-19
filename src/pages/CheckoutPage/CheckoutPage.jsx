import React, {useState, useEffect, useMemo} from 'react';
import {FaRegAddressBook, FaRegEnvelope, FaPhoneAlt} from 'react-icons/fa';
import {Form, Input, Button, Radio, message, Select} from 'antd';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDistances} from '../../redux/slices/distanceSlice';
import {
	selectDistances,
	selectLoading,
	selectError,
	GetUserDetailSelector,
	GetCartSelector,
} from '../../redux/selectors';
import {handleCheckoutOrder} from '../../redux/slices/orderSlice';
import {enums} from '../../utils/constant';
import {formatPrice} from '../../utils';

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

const CheckoutPage = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const distances = useSelector(selectDistances);
	const loading = useSelector(selectLoading);
	const error = useSelector(selectError);
	const userDetail = useSelector(GetUserDetailSelector);
	const cartList = useSelector(GetCartSelector);

	const [paymentMethod, setPaymentMethod] = useState(null);
	const [paymentForm, setPaymentForm] = useState(null);
	const [selectedCity, setSelectedCity] = useState('');
	const [shippingFee, setShippingFee] = useState(0);
	const [userInfo, setUserInfo] = useState({
		firstName: userDetail.FirstName,
		lastName: userDetail.LastName,
		email: userDetail.Email,
		phone: '',
		providence: '',
		ward: '',
		address: '',
		note: '',
	});
	const [province, setProvince] = useState('');

	useEffect(() => {
		form.setFieldsValue(userInfo);
	}, [form, userInfo]);

	// Fetch distances on component mount
	useEffect(() => {
		dispatch(fetchDistances());
	}, [dispatch]);

	useEffect(() => {
		if (distances) {
			setProvince(distances);
		}
	}, [distances]);

	// Update shipping fee when the selected city changes
	useEffect(() => {
		const selectedDistance =
			province && province?.find((distance) => distance.Name === selectedCity);
		if (selectedDistance) {
			const fee = Math.ceil(selectedDistance.distance_km) * 500; // 500 VND per km
			setShippingFee(fee);
		}
		console.log('selectedDistance', selectedDistance);
	}, [selectedCity, distances]);

	// Lọc các sản phẩm có Jewelry hoặc Diamond
	const jewelryOrDiamondProducts = cartList?.Products.filter(
		(product) => product.Jewelry || product.Diamond
	);

	const mappedProducts = useMemo(() => {
		if (jewelryOrDiamondProducts && enums) {
			return jewelryOrDiamondProducts.map((product) => mapAttributes(product, enums));
		}
		return [];
	}, [jewelryOrDiamondProducts, enums]);
	// Hàm xử lý gửi form
	const onFinish = () => {
		const orderRequestDto = {
			paymentType: paymentForm,
			paymentName: paymentMethod,
			isTransfer: true,
		};
		const orderItemRequestDtos = cartList?.Products?.map((product) => ({
			id: Math.floor(1000000 + Math.random() * 9000000).toString(),
			jewelryId: product?.Jewelry?.Id || null,
			diamondId: product?.Diamond?.Id || null,
			engravedText: product?.EngravedText || null,
			engravedFont: product?.EngravedFont || null,
			warrantyCode: null,
			warrantyType: 1,
		}));
		const billingDetail = {
			firstName: userInfo?.firstName,
			lastName: userInfo?.lastName,
			phone: userInfo?.phone,
			email: userInfo?.email,
			providence: userInfo?.providence,
			ward: userInfo?.ward,
			address: userInfo?.address,
			note: userInfo?.note,
		};

		dispatch(handleCheckoutOrder({orderRequestDto, orderItemRequestDtos, billingDetail}))
			.then((res) => {
				if (res.payload) {
					message.success('Đặt hàng thành công!');
				} else {
					message.error(
						'Đặt hàng không thành công. Vui lòng kiểm tra thông tin của bạn!'
					);
				}
			})
			.catch((error) => {
				console.error('Order failed:', error);
				message.error('Đặt hàng không thành công. Vui lòng kiểm tra thông tin của bạn!');
			});
		navigate('/invoice');
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Thất bại:', errorInfo);
		message.error('Vui lòng kiểm tra các trường trong form và thử lại.');
	};

	// Handle city selection change
	const handleCityChange = (value) => {
		setUserInfo((prev) => ({
			...prev,
			providence: value,
		}));
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

	console.log('mappedProducts', mappedProducts);

	return (
		<div className="min-h-screen flex justify-center items-center bg-gray-100">
			<div className="container mx-auto p-4 flex flex-col md:flex-row md:space-x-6 gap-4 justify-around">
				{/* Thông tin thanh toán và giao hàng */}
				<div className="flex-col">
					<div className="mb-6">
						<div className="md:w-2/3 bg-white p-6 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl">
							<h2 className="text-2xl font-semibold text-gray-800 mb-6">
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

								<div className="flex flex-col md:flex-row md:space-x-4 gap-4">
									<div className="w-full md:w-1/2 p-1">
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
												showSearch
												placeholder="Chọn tỉnh thành"
												onChange={handleCityChange}
											>
												{province &&
													province?.map((distance) => (
														<Select.Option
															key={distance.Id}
															value={distance.Name}
														>
															{distance.Name}
														</Select.Option>
													))}
											</Select>
										</Form.Item>
									</div>
									<div className="w-full md:w-1/2 p-1">
										<Form.Item
											label="Quận / Huyện"
											name="ward"
											rules={[
												{
													required: true,
													message: 'Vui lòng nhập Quận / Huyện',
												},
											]}
										>
											<Input
												placeholder="Quận / Huyện"
												name="ward"
												onChange={handleChange}
											/>
										</Form.Item>
									</div>
								</div>
								<Form.Item
									label="Địa chỉ"
									className="p-1"
									rules={[
										{
											required: true,
											message: 'Vui lòng nhập địa chỉ',
										},
									]}
								>
									<Input
										placeholder="Địa chỉ"
										name="address"
										onChange={handleChange}
									/>
								</Form.Item>
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
									<div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg space-y-6 mt-6 md:mt-0 transition-shadow duration-300 hover:shadow-2xl">
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
										<div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg space-y-6 mt-6 md:mt-0 transition-shadow duration-300 hover:shadow-2xl">
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
													<Radio
														value="creditCard"
														className="border p-4 rounded-md hover:border-blue-500 transition duration-300 mb-4"
													>
														Chuyển Khoản Ngân Hàng
													</Radio>
													<Radio
														value="zalopay"
														className="border p-4 rounded-md hover:border-blue-500 transition duration-300 mb-4"
													>
														Thanh Toán Qua ZaloPay
													</Radio>
												</Radio.Group>
											</div>
											{/* Hiển thị thông tin thẻ nếu 'Chuyển Khoản Ngân Hàng' được chọn */}
											{paymentMethod === 'creditCard' && (
												<div className="space-y-4">
													<Form.Item
														label="Số thẻ"
														name="cardNumber"
														rules={[
															{
																required: true,
																message: 'Vui lòng nhập số thẻ',
															},
														]}
													>
														<Input placeholder="Số thẻ" />
													</Form.Item>
													<Form.Item
														label="Ngân hàng"
														name="bankName"
														rules={[
															{
																required: true,
																message:
																	'Vui lòng nhập tên ngân hàng',
															},
														]}
													>
														<Input placeholder="Tên ngân hàng" />
													</Form.Item>
													<Form.Item
														label="Ngày hết hạn"
														name="expiryDate"
														rules={[
															{
																required: true,
																message:
																	'Vui lòng nhập ngày hết hạn',
															},
														]}
													>
														<Input placeholder="MM/YY" />
													</Form.Item>
													<Form.Item
														label="Mã bảo mật"
														name="securityCode"
														rules={[
															{
																required: true,
																message: 'Vui lòng nhập mã bảo mật',
															},
														]}
													>
														<Input placeholder="CVV" />
													</Form.Item>
													<Form.Item
														label="Tên chủ thẻ"
														name="cardHolderName"
														rules={[
															{
																required: true,
																message:
																	'Vui lòng nhập tên chủ thẻ',
															},
														]}
													>
														<Input placeholder="Tên chủ thẻ" />
													</Form.Item>
												</div>
											)}
										</div>
									</div>
								)}
							</Form>
						</div>
					</div>
				</div>

				{/* Order Summary */}
				<div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg md:mt-0 transition-shadow duration-300 hover:shadow-2xl">
					<div className="flex justify-between">
						<h2 className="text-2xl font-semibold text-gray-800 mb-6">
							Tóm tắt đơn hàng
						</h2>
						<div className="flex justify-center items-center">
							<a href="/cart" className="text-sm text-yellow-500 hover:underline">
								Sửa giỏ hàng
							</a>
						</div>
					</div>
					<div className="space-y-6">
						{/* <div className="flex flex-col space-y-2 py-2 border-b border-gray-300">
							<div className="flex justify-between items-center">
								<h3 className="text-lg font-semibold text-gray-800">
									Hàng Thiết Kế (Hoàn Thành)
								</h3>
							</div>
							<div className="flex items-center space-x-4">
								<img
									src="/path/to/engagement-ring.jpg"
									alt="Engagement Ring"
									className="w-16 h-16 rounded-lg shadow-md"
								/>
								<div className="flex flex-col">
									<span className="text-sm font-medium text-gray-600">
										French Pavé Diamond Engagement Ring in 14k White Gold
									</span>
									<span className="text-sm text-gray-500">Ring Size: 6</span>
								</div>
							</div>
							<div className="flex justify-between text-sm text-gray-700">
								<span>Giá gốc:</span>
								<span className="line-through">$1,470</span>
							</div>
							<div className="flex justify-between text-sm text-gray-700">
								<span>Giá đã giảm:</span>
								<span>$1,102</span>
							</div>
						</div> */}
						{mappedProducts?.map((item, index) => (
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
													<p>{item?.SizeId}</p>
												</div>
											)}
										</div>
									) : item.Carat ? (
										<div>
											<p className="mb-1 text-gray-800 font-semibold">
												{item?.Carat}ct {item.Color}-{item.Clarity}{' '}
												{item.Cut} {item.ShapeName}
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

						<div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
							{/* Total and Savings Section */}
							<div className="p-4 border rounded-lg bg-gray-50">
								<div className="flex justify-between font-semibold text-lg text-gray-800 mb-2">
									<span>Tổng giá trị đơn hàng:</span>
									<span>{formatPrice(cartList?.OrderPrices?.FinalPrice)}</span>
								</div>
								<div className="flex justify-between text-lg text-gray-800 mb-2">
									<span>Phí vận chuyển:</span>
									<span>{formatPrice(shippingFee.toLocaleString())}</span>
								</div>

								{/* <div className="text-sm text-gray-600 mb-4">
									or interest-free installments from $1,544 / mo.
								</div> */}
								{/* <div className="flex items-center space-x-2 text-sm text-gray-600">
									<span>🚚</span>
									<span>Free Overnight Shipping, Hassle-Free Returns</span>
								</div> */}
								<div className="flex items-center space-x-2 text-sm text-gray-600">
									<span>📅</span>
									<span>
										Giao hàng vào: For an exact shipping date, please select a
										ring size first.
									</span>
								</div>
								<div className="text-green-600 font-semibold text-base mt-4">
									Tiết Kiệm{' '}
									{formatPrice(
										cartList?.OrderPrices?.DiscountAmountSaved +
											cartList?.OrderPrices?.PromotionAmountSaved
									)}
								</div>
							</div>

							{/* Order Button Section */}
							<div className="flex justify-center mt-6 w-full ">
								<button
									className="mx-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
									onClick={onFinish}
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
