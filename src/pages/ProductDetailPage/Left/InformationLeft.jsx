import React, {useState} from 'react';

import {MinusOutlined, PlusOutlined} from '@ant-design/icons';

export const InformationLeft = () => {
	const [showMore, setShowMore] = useState(false);

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};
	return (
		<>
			<div class="bg-gray-50 rounded-lg shadow-md w-full mt-10 pr-36">
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Stock Number</span>
					<span class="text-gray-800">501290w14</span>
				</div>
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Metal</span>
					<span class="text-gray-800">14K White Gold</span>
				</div>
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Width</span>
					<span class="text-gray-800">2.00mm</span>
				</div>
				<div class="flex justify-between px-4 py-2">
					<span class="text-gray-600">Rhodium Finish</span>
					<span class="text-gray-800 flex items-center">Yes</span>
				</div>
			</div>

			<div
				className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
					showMore ? 'max-h-screen' : 'max-h-0'
				}`}
			>
				<div className="bg-gray-50  rounded-lg shadow-md w-full pr-36 mt-4">
					<h2 className="text-lg font-semibold">Natural Diamond Information</h2>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Shape</span>
						<span className="text-gray-800">Round</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Quantity</span>
						<span className="text-gray-800">2</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Total Carat</span>
						<span className="text-gray-800">0.06</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Color</span>
						<span className="text-gray-800">I</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Clarity</span>
						<span className="text-gray-800">SI2</span>
					</div>
					<div className="flex justify-between px-4 py-2">
						<span className="text-gray-600">Setting Type</span>
						<span className="text-gray-800">Pave</span>
					</div>
				</div>
				<div className="bg-gray-50  rounded-lg shadow-md w-full pr-36 mt-4">
					<h2 className="text-lg font-semibold">Can Be Set With:</h2>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Round</span>
						<span className="text-gray-800">0.50 - 4.00 Carat</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Princess</span>
						<span className="text-gray-800">0.50 - 4.00 Carat</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Total Carat</span>
						<span className="text-gray-800">0.50 - 4.00 Carat</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Cushion</span>
						<span className="text-gray-800">0.50 - 4.00 Carat</span>
					</div>
					<div className="flex justify-between px-4 py-2">
						<span className="text-gray-600">Oval</span>
						<span className="text-gray-800">0.50 - 4.00 Carat</span>
					</div>
				</div>
			</div>
			<div
				className="border-y my-4 mr-36 flex justify-between cursor-pointer"
				onClick={toggleShowMore}
			>
				<div className="text-black m-4 px-4 rounded-lg focus:outline-none ">
					{showMore ? 'Show Less' : 'Show More'}
				</div>
				<div className="m-4 px-4 rounded-lg focus:outline-none">
					{showMore ? <MinusOutlined /> : <PlusOutlined />}
				</div>
			</div>
		</>
	);
};
