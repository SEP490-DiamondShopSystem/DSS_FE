import React, {useState, useEffect} from 'react';
import {FaRegAddressBook, FaRegEnvelope, FaPhoneAlt} from 'react-icons/fa';
import {Form, Input, Button, Radio, message, Select} from 'antd';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDistances} from '../../redux/slices/distanceSlice';
import {selectDistances, selectLoading, selectError} from '../../redux/selectors';

const CheckoutPage = () => {
	const [paymentMethod, setPaymentMethod] = useState(null);
	const [selectedCity, setSelectedCity] = useState('');
	const [shippingFee, setShippingFee] = useState(0);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Selectors to access distances and loading state
	const distances = useSelector(selectDistances);
	const loading = useSelector(selectLoading);
	const error = useSelector(selectError);

	// Fetch distances on component mount
	useEffect(() => {
		dispatch(fetchDistances());
	}, [dispatch]);

	// Update shipping fee when the selected city changes
	useEffect(() => {
		const selectedDistance = distances?.find((distance) => distance.name === selectedCity);
		if (selectedDistance) {
			const fee = Math.ceil(selectedDistance.distance_km) * 500; // 500 VND per km
			setShippingFee(fee);
		}
	}, [selectedCity, distances]);

	// Hàm xử lý gửi form
	const onFinish = (values) => {
		console.log('Giá trị Form:', values);
		message.success('Đặt hàng thành công!');
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Thất bại:', errorInfo);
		message.error('Vui lòng kiểm tra các trường trong form và thử lại.');
	};

	// Hàm xử lý thay đổi phương thức thanh toán
	const handlePaymentMethodChange = (e) => {
		setPaymentMethod(e.target.value);
	};
	// Handle city selection change
	const handleCityChange = (value) => {
		setSelectedCity(value);
	};
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
								className="space-y-6"
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
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
											<Input placeholder="Tên" />
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
											<Input placeholder="Họ" />
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
												placeholder="Chọn tỉnh thành"
												onChange={handleCityChange}
											>
												{distances?.map((distance) => (
													<Select.Option
														key={distance.Id}
														value={distance.name}
													>
														{distance.name}
													</Select.Option>
												))}
											</Select>
										</Form.Item>
									</div>
									<div className="w-full md:w-1/2 p-1">
										<Form.Item
											label="Quận / Huyện"
											name="postcode"
											rules={[
												{
													required: true,
													message: 'Vui lòng nhập mã bưu điện',
												},
											]}
										>
											<Input placeholder="Mã bưu điện" />
										</Form.Item>
									</div>
								</div>
								<Form.Item
									label="Địa chỉ"
									name="streetAddress"
									className="p-1"
									rules={[
										{
											required: true,
											message: 'Vui lòng nhập địa chỉ',
										},
									]}
								>
									<Input placeholder="Địa chỉ" />
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
													message: 'Vui lòng nhập số điện thoại của bạn',
												},
											]}
										>
											<Input placeholder="Điện thoại" />
										</Form.Item>
									</div>
									<div className="w-full md:w-1/2 p-1">
										<Form.Item
											label={
												<>
													<FaRegEnvelope className="inline-block mr-2" />
													Địa chỉ Email
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

								<Form.Item
									label="Ghi chú đơn hàng (tùy chọn)"
									name="notes"
									className="p-1"
								>
									<Input.TextArea placeholder="Ghi chú đơn hàng" />
								</Form.Item>
								{/* Phương thức thanh toán */}
								<div className="my-6">
									<div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg space-y-6 mt-6 md:mt-0 transition-shadow duration-300 hover:shadow-2xl">
										<h2 className="text-2xl font-semibold text-gray-800 mb-6">
											Phương thức thanh toán
										</h2>
										<Form.Item
											name="paymentMethod"
											rules={[
												{
													required: true,
													message: 'Vui lòng chọn phương thức thanh toán',
												},
											]}
											className="py-3"
										>
											<Radio.Group
												className="flex flex-col"
												onChange={handlePaymentMethodChange}
											>
												<Radio
													value="creditCard"
													className="border p-4 rounded-md hover:border-blue-500 transition duration-300 mb-4"
												>
													Chuyển Khoản Ngân Hàng
												</Radio>
												<Radio
													value="installments"
													className="border p-4 rounded-md hover:border-blue-500 transition duration-300 mb-4"
												>
													Thanh Toán Qua ZaloPay
												</Radio>
											</Radio.Group>
										</Form.Item>

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
															message: 'Vui lòng nhập tên ngân hàng',
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
															message: 'Vui lòng nhập ngày hết hạn',
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
															message: 'Vui lòng nhập tên chủ thẻ',
														},
													]}
												>
													<Input placeholder="Tên chủ thẻ" />
												</Form.Item>
											</div>
										)}
									</div>
								</div>
							</Form>
						</div>
					</div>
				</div>

				{/* Order Summary */}
				<div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg md:mt-0 transition-shadow duration-300 hover:shadow-2xl">
					<div className="flex justify-between">
						<h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
						<div className="flex justify-center items-center">
							<a href="#" className="text-sm text-yellow-500 hover:underline">
								Sửa giỏ hàng
							</a>
						</div>
					</div>
					<div className="space-y-6">
						{/* Item 1: Engagement Ring */}
						<div className="flex flex-col space-y-2 py-2 border-b border-gray-300">
							<div className="flex justify-between items-center">
								<h3 className="text-lg font-semibold text-gray-800">
									Engagement Ring (Completed)
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
						</div>

						{/* Item 2: Loose Diamond */}
						<div className="flex flex-col space-y-2 py-2 border-b border-gray-300">
							<div className="flex-col items-center space-x-4">
								<div className="flex-col">
									<h3 className="text-lg font-semibold text-gray-800">
										Loose Diamond
									</h3>
								</div>
								<div className="flex items-center space-x-4">
									<img
										src="/path/to/diamond.jpg"
										alt="Loose Diamond"
										className="w-16 h-16 rounded-lg shadow-md"
									/>
									<div className="flex flex-col">
										<span className="text-sm font-medium text-gray-600">
											1.03 Carat H-VS2 Excellent Cut Round Diamond
										</span>
									</div>
								</div>
							</div>
							<div className="flex justify-between text-sm text-gray-700">
								<span>Giá gốc:</span>
								<span className="line-through">$5,000</span>
							</div>
							<div className="flex justify-between text-sm text-gray-700">
								<span>Giá đã giảm:</span>
								<span>$3,530</span>
							</div>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
							{/* Promo Code Section */}
							<Form.Item label="Promo Code" name="promoCode">
								<Input
									placeholder="Enter promo code"
									className="w-full p-3 border rounded-md"
								/>
							</Form.Item>

							{/* Total and Savings Section */}
							<div className="p-4 border rounded-lg bg-gray-50">
								<div className="flex justify-between font-semibold text-lg text-gray-800 mb-2">
									<span>Tổng giá trị đơn hàng:</span>
									<span>$4,632</span>
								</div>
								<div className="flex justify-between text-lg text-gray-800 mb-2">
									<span>Phí vận chuyển:</span>
									<span>{shippingFee.toLocaleString()} VND</span>
								</div>

								<div className="text-sm text-gray-600 mb-4">
									or interest-free installments from $1,544 / mo.
								</div>
								<div className="flex items-center space-x-2 text-sm text-gray-600">
									<span>🚚</span>
									<span>Free Overnight Shipping, Hassle-Free Returns</span>
								</div>
								<div className="flex items-center space-x-2 text-sm text-gray-600">
									<span>📅</span>
									<span>
										Ships by: For an exact shipping date, please select a ring
										size first.
									</span>
								</div>
								<div className="text-green-600 font-semibold text-base mt-4">
									Tiết Kiệm $368
								</div>
							</div>

							{/* Order Button Section */}
							<div className="flex justify-center mt-6 w-full ">
								<button
									className="mx-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
									onClick={() => navigate(`/invoice`)}
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
