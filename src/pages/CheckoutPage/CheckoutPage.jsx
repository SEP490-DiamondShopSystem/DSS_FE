import React from 'react';
import {FaRegAddressBook, FaRegEnvelope, FaPhoneAlt} from 'react-icons/fa';
import {Form, Input, Button, Radio, message} from 'antd';

const CheckoutPage = () => {
	// Form submission handler
	const onFinish = (values) => {
		console.log('Form Values:', values);
		message.success('Order placed successfully!');
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
		message.error('Please check the form fields and try again.');
	};

	return (
		<div className="min-h-screen flex justify-center items-center bg-gray-100">
			<div className="container mx-auto p-4 flex flex-col md:flex-row md:space-x-6 gap-4 justify-around">
				{/* Billing and Shipping Information */}
				<div className="flex-col">
					<div className="mb-6">
						<div className="md:w-2/3 bg-white p-6 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl">
							<h2 className="text-2xl font-semibold text-gray-800 mb-6">
								Billing and Shipping
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
													First Name
												</>
											}
											name="firstName"
											rules={[
												{
													required: true,
													message: 'Please enter your first name',
												},
											]}
										>
											<Input placeholder="First Name" />
										</Form.Item>
									</div>
									<div className="w-full md:w-1/2 p-1">
										<Form.Item
											label={
												<>
													<FaRegAddressBook className="inline-block mr-2" />
													Last Name
												</>
											}
											name="lastName"
											rules={[
												{
													required: true,
													message: 'Please enter your last name',
												},
											]}
										>
											<Input placeholder="Last Name" />
										</Form.Item>
									</div>
								</div>

								<Form.Item
									label="Country"
									name="country"
									rules={[{required: true, message: 'Please enter your country'}]}
									className="p-1"
								>
									<Input placeholder="Country" />
								</Form.Item>

								<Form.Item
									label="Street Address"
									name="streetAddress"
									className="p-1"
									rules={[
										{
											required: true,
											message: 'Please enter your street address',
										},
									]}
								>
									<Input placeholder="Street Address" />
								</Form.Item>

								<div className="flex flex-col md:flex-row md:space-x-4 gap-4">
									<div className="w-full md:w-1/2  p-1">
										<Form.Item
											label="City"
											name="city"
											rules={[
												{required: true, message: 'Please enter your city'},
											]}
										>
											<Input placeholder="City" />
										</Form.Item>
									</div>
									<div className="w-full md:w-1/2 p-1">
										<Form.Item
											label="Postcode ZIP"
											name="postcode"
											rules={[
												{
													required: true,
													message: 'Please enter your postcode',
												},
											]}
										>
											<Input placeholder="Postcode ZIP" />
										</Form.Item>
									</div>
								</div>

								<div className="flex flex-col md:flex-row md:space-x-4 gap-4">
									<div className="w-full md:w-1/2 p-1">
										<Form.Item
											label={
												<>
													<FaPhoneAlt className="inline-block mr-2" />
													Phone
												</>
											}
											name="phone"
											rules={[
												{
													required: true,
													message: 'Please enter your phone number',
												},
											]}
										>
											<Input placeholder="Phone" />
										</Form.Item>
									</div>
									<div className="w-full md:w-1/2 p-1">
										<Form.Item
											label={
												<>
													<FaRegEnvelope className="inline-block mr-2" />
													Email Address
												</>
											}
											name="email"
											rules={[
												{
													required: true,
													type: 'email',
													message: 'Please enter a valid email address',
												},
											]}
										>
											<Input placeholder="Email" />
										</Form.Item>
									</div>
								</div>

								<Form.Item
									label="Order Notes (optional)"
									name="notes"
									className="p-1"
								>
									<Input.TextArea placeholder="Order Notes" />
								</Form.Item>
							</Form>
						</div>
					</div>

					<div className="my-6">
						{/* Payment Method */}
						<div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg space-y-6 mt-6 md:mt-0 transition-shadow duration-300 hover:shadow-2xl">
							<h2 className="text-2xl font-semibold text-gray-800 mb-6">
								Payment Method
							</h2>
							<Form.Item
								name="paymentMethod"
								rules={[
									{required: true, message: 'Please select a payment method'},
								]}
								className="py-3"
							>
								<Radio.Group className="flex flex-col">
									<Radio
										value="creditCard"
										className="border p-4 rounded-md hover:border-blue-500 transition duration-300 mb-4"
									>
										Credit Card
									</Radio>
									<Radio
										value="installments"
										className="border p-4 rounded-md hover:border-blue-500 transition duration-300 mb-4"
									>
										Interest-Free Monthly Installments
									</Radio>
									<Radio
										value="delivery"
										className="border p-4 rounded-md hover:border-blue-500 transition duration-300 mb-4"
									>
										Pay on Delivery
									</Radio>
									<Radio
										value="paypal"
										className="border p-4 rounded-md hover:border-blue-500 transition duration-300"
									>
										PayPal
									</Radio>
								</Radio.Group>
							</Form.Item>
						</div>
					</div>
				</div>

				{/* Order Summary */}
				<div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg md:mt-0 transition-shadow duration-300 hover:shadow-2xl">
					<div className="flex justify-between">
						<h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
						<div className="flex justify-center items-center">
							<a href="#" className="text-sm text-yellow-500 hover:underline">
								Edit Cart
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
								<span>Original Price:</span>
								<span className="line-through">$1,470</span>
							</div>
							<div className="flex justify-between text-sm text-gray-700">
								<span>Discounted Price:</span>
								<span>$1,102</span>
							</div>
							<div className="flex justify-between text-sm text-gray-700">
								<span>Shipping:</span>
								<span>Free</span>
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
								<span>Original Price:</span>
								<span className="line-through">$5,000</span>
							</div>
							<div className="flex justify-between text-sm text-gray-700">
								<span>Discounted Price:</span>
								<span>$3,530</span>
							</div>
							<div className="flex justify-between text-sm text-gray-700">
								<span>Shipping:</span>
								<span>Free</span>
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
									<span>Total:</span>
									<span>$4,632</span>
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
									Total Savings $368
								</div>
							</div>

							{/* Order Button Section */}
							<div className="flex justify-center">
								<Form.Item>
									<Button type="primary" htmlType="submit" className="w-full">
										Place Order
									</Button>
								</Form.Item>
							</div>

							{/* Customer Service Section */}
							<div className="text-center text-sm text-gray-600 mt-6">
								24/7 Customer Service
								<div className="mt-2 flex items-center justify-center space-x-4">
									<div className="flex items-center space-x-1">
										<span>📞</span>
										<span>1-800-242-2728</span>
									</div>
									<div className="flex items-center space-x-1">
										<span>💬</span>
										<span className="text-blue-600">Chat With Us</span>
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
