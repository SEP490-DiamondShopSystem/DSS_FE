import React from 'react';
import {FaRegAddressBook, FaRegEnvelope, FaPhoneAlt} from 'react-icons/fa';

const CheckoutPage = () => {
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
							<form className="space-y-6">
								<div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4">
									<div className="w-full md:w-1/2">
										<label className="block text-sm font-medium text-gray-600 mb-2">
											<FaRegAddressBook className="inline-block mr-2" />
											First Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out"
											placeholder="First Name"
										/>
									</div>
									<div className="w-full md:w-1/2">
										<label className="block text-sm font-medium text-gray-600 mb-2">
											<FaRegAddressBook className="inline-block mr-2" />
											Last Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out"
											placeholder="Last Name"
										/>
									</div>
								</div>

								<div className="mb-4">
									<label className="block text-sm font-medium text-gray-600 mb-2">
										Country <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out"
										placeholder="Country"
									/>
								</div>
								<div className="mb-4">
									<label className="block text-sm font-medium text-gray-600 mb-2">
										Street Address <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out"
										placeholder="Street Address"
									/>
								</div>
								<div className="flex flex-col md:flex-row md:space-x-4 gap-4">
									<div className="md:w-1/2 mb-4">
										<label className="block text-sm font-medium text-gray-600 mb-2">
											City <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out"
											placeholder="City"
										/>
									</div>
									<div className="md:w-1/2 mb-4">
										<label className="block text-sm font-medium text-gray-600 mb-2">
											Postcode ZIP <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out"
											placeholder="Postcode ZIP"
										/>
									</div>
								</div>
								<div className="flex flex-col md:flex-row md:space-x-4 gap-4">
									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-600 mb-2">
											<FaPhoneAlt className="inline-block mr-2" />
											Phone <span className="text-red-500">*</span>
										</label>
										<input
											type="tel"
											className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out"
											placeholder="Phone"
										/>
									</div>
									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-600 mb-2">
											<FaRegEnvelope className="inline-block mr-2" />
											Email Address <span className="text-red-500">*</span>
										</label>
										<input
											type="email"
											className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out"
											placeholder="Email"
										/>
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-600 mb-2">
										Order Notes (optional)
									</label>
									<textarea
										className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out"
										placeholder="Order Notes"
									></textarea>
								</div>
							</form>
						</div>
					</div>
					<div className="my-6">
						{/* Payment Method */}
						<div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg space-y-6 mt-6 md:mt-0 transition-shadow duration-300 hover:shadow-2xl">
							<h2 className="text-2xl font-semibold text-gray-800 mb-6">
								Payment Method
							</h2>
							<div className="space-y-4">
								{[
									'Credit Card',
									'Interest-Free Monthly Installments',
									'Pay on Delivery',
									'PayPal',
								].map((method, index) => (
									<div
										key={index}
										className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200"
									>
										<input
											type="radio"
											id={method.replace(/\s+/g, '-').toLowerCase()}
											name="payment"
											className="mr-2 focus:ring-yellow-400"
										/>
										<label htmlFor={method.replace(/\s+/g, '-').toLowerCase()}>
											{method}
										</label>
									</div>
								))}
							</div>
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

						{/* Promo Code */}
						<div className="flex flex-col space-y-2 py-5 border-b border-gray-300">
							<label
								htmlFor="promo-code"
								className="text-sm font-medium text-gray-600"
							>
								Promo Code
							</label>
							<input
								type="text"
								id="promo-code"
								className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
								placeholder="Enter promo code"
							/>
						</div>

						{/* Total */}
						<div className="flex justify-between font-semibold text-gray-800 my-5">
							<span>Total</span>
							<span>$4,632</span>
						</div>
						<button
							className="mr-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
							style={{padding: '13px 0px 11px 0px'}}
							onClick={() => navigate(`/checkout`)}
						>
							Place Order
						</button>

						{/* Additional Information */}
						<div className="text-sm text-gray-500 space-y-2">
							<p>Free Overnight Shipping, Hassle-Free Returns</p>
							<p>
								24/7 Customer Service:{' '}
								<a href="tel:1-800-242-2728" className="text-yellow-500">
									1-800-242-2728
								</a>
							</p>
							<p>
								<a href="#" className="text-yellow-500 hover:underline">
									Chat With Us
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;
