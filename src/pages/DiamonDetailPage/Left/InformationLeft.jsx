import React, {useState} from 'react';

import {MinusOutlined, PlusOutlined} from '@ant-design/icons';

export const InformationLeft = ({diamond}) => {
	const [showMore, setShowMore] = useState(false);

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	console.log('diamondLeft', diamond);

	return (
		<>
			<div class="bg-gray-50 rounded-lg shadow-md w-full mt-10 pr-36">
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Giấy chứng nhận</span>
					{/* <span class="text-gray-800">501290w14</span> */}
				</div>
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Mã Định Danh</span>
					<span class="text-gray-800">{diamond.Criteria}</span>
				</div>
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Hình dạng</span>
					<span class="text-gray-800">{diamond.DiamondShape}</span>
				</div>
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Cut</span>
					<span class="text-gray-800 flex items-center">{diamond.Cut}</span>
				</div>
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Color</span>
					<span class="text-gray-800 flex items-center">{diamond.Color}</span>
				</div>
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Clarity</span>
					<span class="text-gray-800 flex items-center">{diamond.Clarity}</span>
				</div>
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Trọng lượng Carat</span>
					<span class="text-gray-800 flex items-center">{diamond.Carat}</span>
				</div>
				<div class="flex justify-between px-4 border-b border-tintWhite py-2">
					<span class="text-gray-600">Fluorescence</span>
					<span class="text-gray-800 flex items-center">{diamond.Fluorescence}</span>
				</div>
				{/* <div
					class={`flex justify-between ${
						showMore ? 'border-b border-tintWhite' : ''
					} px-4  py-2`}
				>
					<span class="text-gray-600">Tỉ lệ chiều dài/chiều rộng</span>
					<span class="text-gray-800 flex items-center">1.01</span>
				</div> */}
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
						<span className="text-gray-800">{diamond.Depth}</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Table %</span>
						<span className="text-gray-800">{diamond.Table}</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Polish</span>
						<span className="text-gray-800">{diamond.Polish}</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Symmetry</span>
						<span className="text-gray-800">{diamond.Symmetry}</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Girdle</span>
						<span className="text-gray-800">{diamond.Girdle}</span>
					</div>
					{/* <div className="flex justify-between border-b border-tintWhite px-4 py-2">
						<span className="text-gray-600">Đỉnh</span>
						<span className="text-gray-800">Không có</span>
					</div> */}
					<div className="flex justify-between px-4 py-2">
						<span className="text-gray-600">Kích thước</span>
						<span className="text-gray-800">{diamond?.Measurement}</span>
					</div>
				</div>
			</div>
			<div
				className="border-y my-4 mr-36 flex justify-between cursor-pointer"
				onClick={toggleShowMore}
			>
				<div className="text-black m-4 px-4 rounded-lg focus:outline-none ">
					{showMore ? 'Hiện Ít Hơn' : 'Hiện Thêm'}
				</div>
				<div className="m-4 px-4 rounded-lg focus:outline-none">
					{showMore ? <MinusOutlined /> : <PlusOutlined />}
				</div>
			</div>
		</>
	);
};
