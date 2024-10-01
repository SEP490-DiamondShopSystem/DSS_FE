import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const CartPage = () => {
	const [ringSize, setRingSize] = useState('');
	const [promo, setPromo] = useState('');
	const navigate = useNavigate();


	const handleRingSizeChange = (event) => {
		setRingSize(event.target.value);
	};

	const handlePromoChange = (event) => {
		setPromo(event.target.value);
	};

	return (
		<div className="flex justify-between p-8 bg-gray-50 min-h-screen">
			{/* Left Segment: Engagement Ring, Loose Diamond, Promotions */}
			<div className="flex-1 lg:mr-8 space-y-8">
				{/* Engagement Ring Section */}
				<div className="bg-white p-6 mx-5 my-5 border rounded-lg shadow-md">
					<h2 className="text-xl font-semibold mb-2 border-b pb-2">
						Engagement Ring (Completed)
					</h2>
					<div className="flex mt-4">
						<div className="mr-4 flex-shrink-0">
							<img
								src="path-to-image"
								alt="Engagement Ring"
								className="w-32 h-32 object-cover rounded-lg border"
							/>
						</div>
						<div className="flex-1 mx-5">
							<p className="mb-1  text-gray-800 font-semibold">
								French Pavé Diamond Engagement Ring in 14k White Gold (1/4 ct. tw.)
							</p>
							<p className="mb-1 text-gray-700 text-sm">
								SKU: 501410w14{' '}
								<span className="line-through text-gray-400 mr-2">$1,470</span>{' '}
								<span className="text-gray-900 font-semibold">$1,102</span>
							</p>
							<p className="mb-1 text-gray-800 font-semibold">
								1.03 Carat H-VS2 Excellent Cut Round Diamond
							</p>
							<p className="mb-4 text-gray-700 text-sm">
								SKU: 22226368{' '}
								<span className="text-gray-900 font-semibold">$3,530</span>
							</p>
							<div className="flex items-center mt-2">
								<label className="mr-2 text-gray-700">Ring size:</label>
								<select
									value={ringSize}
									onChange={handleRingSizeChange}
									className="border rounded p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<option value="">Select Size</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									{/* Add more sizes as needed */}
								</select>
								<span className="ml-2 text-blue-500 text-sm cursor-pointer">
									Find your ring size
								</span>
							</div>
						</div>
						<div className="flex flex-col items-end space-y-2 text-sm text-yellow-600">
							<span className="cursor-pointer">View</span>
							<span className="cursor-pointer">Remove</span>
						</div>
					</div>
				</div>

				{/* Loose Diamond Section */}
				<div className="bg-white p-6 mx-5 my-5 border rounded-lg shadow-md">
					<h2 className="text-xl font-semibold mb-2 border-b pb-2">Loose Diamond</h2>
					<div className="flex mt-4">
						<div className="mr-4 flex-shrink-0">
							<img
								src="path-to-image"
								alt="Loose Diamond"
								className="w-32 h-32 object-cover rounded-lg border"
							/>
						</div>				
						<div className="flex-1  mx-5">
							<p className="mb-1 text-gray-800 font-semibold">
								Lab-Grown 1.55 Carat Round Diamond
							</p>
							<p className="text-gray-700 text-sm">
								SKU: 800780y1401I{' '}
								<span className="line-through text-gray-400 mr-2">$520</span>{' '}
								<span className="text-gray-900 font-semibold">$362</span>
							</p>
						</div>
						<div className="flex flex-col items-end space-y-2 text-sm text-yellow-600">
							<span className="cursor-pointer">View</span>
							<span className="cursor-pointer">Remove</span>
						</div>
					</div>
				</div>

				{/* Available Promotions Section */}
				<div className="bg-white p-6 mx-5 my-5 border rounded-lg shadow-md">
					<label htmlFor="promotions" className="block mb-2 text-gray-700 font-medium">
						Available Promotions
					</label>
					<select
						id="promotions"
						value={promo}
						onChange={handlePromoChange}
						className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">Select a Promotion</option>
						{/* Add more promotions as needed */}
					</select>
				</div>
			</div>

			{/* Right Segment: Checkout Summary */}
			<div className=" lg:mt-0 flex-shrink-0 w-full lg:w-1/3 bg-gray-50 p-6 mx-5 my-5 border rounded-lg shadow-md lg:sticky lg:top-8">
				<div className="bg-white p-4 mx-5 my-5 rounded-lg shadow-md space-y-6">
					<div className="space-y-4">
						<p className="flex justify-between text-gray-700">
							<span>Subtotal</span> <span>$525</span>
						</p>
						<p className="flex justify-between text-gray-700">
							<span>Promo</span> <span>{promo ? `-${promo}` : '$0'}</span>
						</p>
						<hr className="border-t" />
						<p className="flex justify-between text-gray-900 font-semibold">
							<span>Total</span> <span>$525</span>
						</p>
					</div>
				</div>
				<button
					className="mr-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
					style={{padding: '13px 0px 11px 0px'}}
					onClick={() => navigate(`/checkout`)}
				>
					Check Out
					
				</button>
			</div>
		</div>
	);
};

export default CartPage;
