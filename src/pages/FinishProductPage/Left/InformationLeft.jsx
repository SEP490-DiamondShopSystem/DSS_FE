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
					<span class="text-gray-600">Certificate</span>
					{/* <span class="text-gray-800">501290w14</span> */}
				</div>
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Stock Number</span>
					<span class="text-gray-800">22063275</span>
				</div>
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Shape</span>
					<span class="text-gray-800">Round</span>
				</div>
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Cut</span>
					<span class="text-gray-800 flex items-center">Excellent</span>
				</div>
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Color</span>
					<span class="text-gray-800 flex items-center">H</span>
				</div>
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Clarity</span>
					<span class="text-gray-800 flex items-center">VS2</span>
				</div>
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Carat Weight</span>
					<span class="text-gray-800 flex items-center">1.00</span>
				</div>
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Fluorescence</span>
					<span class="text-gray-800 flex items-center">Medium</span>
				</div>
				<div
					class={`flex justify-between ${
						showMore ? 'border-b border-tintWhite' : ''
					} px-4  py-2`}
				>
					<span class="text-gray-600">Length/Width Ratio</span>
					<span class="text-gray-800 flex items-center">1.01</span>
				</div>
			</div>

			<div
				className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
					showMore ? 'max-h-screen' : 'max-h-0'
				}`}
			>
				<div className="bg-gray-50  rounded-lg shadow-md w-full pr-36">
					{/* <h2 className="text-lg font-semibold">Natural Diamond Information</h2> */}
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Depth %</span>
						<span className="text-gray-800">62.9</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Table %</span>
						<span className="text-gray-800">59.0</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Polish</span>
						<span className="text-gray-800">Excellent</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Symmetry</span>
						<span className="text-gray-800">Excellent</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Girdle</span>
						<span className="text-gray-800">Slightly Thick</span>
					</div>
					<div className="flex justify-between border-b border-tintWhite px-4 py-2">
						<span className="text-gray-600">Culet</span>
						<span className="text-gray-800">None</span>
					</div>
					<div className="flex justify-between px-4 py-2">
						<span className="text-gray-600">Measurements</span>
						<span className="text-gray-800">6.33x6.37x3.99 mm</span>
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
