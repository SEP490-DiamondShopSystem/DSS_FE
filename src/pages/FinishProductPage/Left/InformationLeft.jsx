import React, {useState} from 'react';

import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import GIA_logo from '../../../assets/GIA/GIA_logo.png';

export const InformationLeft = ({jewelryDetail, diamondDetail}) => {
	const [showMore, setShowMore] = useState(false);

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};
	return (
		<>
			<div className="bg-gray-50 rounded-lg shadow-md w-full mt-10 pr-36">
				<h2 className="text-lg font-semibold flex items-center justify-center my-10">
					Thông Số Kim Cương {diamondDetail?.IsLabDiamond ? 'Nhân Tạo' : 'Tự Nhiên'}
				</h2>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Chứng nhận</span>
					<img src={GIA_logo} className="text-gray-800 w-14 h-5" />
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Mã Định Danh</span>
					<span className="text-gray-800">{diamondDetail?.Criteria}</span>
				</div>

				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Cut</span>
					<span className="text-gray-800 flex items-center">{diamondDetail?.Cut}</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Color</span>
					<span className="text-gray-800 flex items-center">{diamondDetail?.Color}</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Clarity</span>
					<span className="text-gray-800 flex items-center">
						{diamondDetail?.Clarity}
					</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Trọng Lượng Carat</span>
					<span className="text-gray-800 flex items-center">{diamondDetail?.Carat}</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Fluorescence</span>
					<span className="text-gray-800 flex items-center">
						{diamondDetail?.Fluorescence}
					</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Depth %</span>
					<span className="text-gray-800">{diamondDetail?.Depth}</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Table %</span>
					<span className="text-gray-800">{diamondDetail?.Table}</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Polish</span>
					<span className="text-gray-800">{diamondDetail?.Polish}</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Symmetry</span>
					<span className="text-gray-800">{diamondDetail?.Symmetry}</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Girdle</span>
					<span className="text-gray-800">{diamondDetail?.Girdle}</span>
				</div>
				<div className="flex justify-between border-b border-tintWhite px-4 py-2">
					<span className="text-gray-600">Culet</span>
					<span className="text-gray-800">{diamondDetail?.Culet}</span>
				</div>
				<div className="flex justify-between px-4 py-2">
					<span className="text-gray-600">Kích Thước</span>
					<span className="text-gray-800">{diamondDetail?.Measurement}</span>
				</div>
			</div>

			<div
				className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
					showMore ? 'max-h-screen' : 'max-h-0'
				}`}
			>
				<div className="bg-gray-50  rounded-lg shadow-md w-full pr-36">
					<div className="flex justify-center items-center text-xl font-semibold my-10">
						<span>Thông Số Vỏ</span>
					</div>
					<div class="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Vật Liệu</span>
						<span className="text-gray-800">{jewelryDetail?.selectedMetal?.Name}</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Width</span>
						<span className="text-gray-800 flex items-center">
							{jewelryDetail?.Width}mm
						</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Kích Cỡ Nhẫn</span>
						<span className="text-gray-800 flex items-center">
							{jewelryDetail?.size}mm
						</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Rhodium Finish</span>
						<span className="text-gray-800 flex items-center">
							{jewelryDetail?.IsRhodiumFinish ? 'Có' : 'Không'}
						</span>
					</div>
				</div>
			</div>
			<div
				className="border-y my-4 mr-36 flex justify-between cursor-pointer"
				onClick={toggleShowMore}
			>
				<div className="text-black m-4 px-4 rounded-lg focus:outline-none ">
					{showMore ? 'Thu Gọn' : 'Xem Thêm'}
				</div>
				<div className="m-4 px-4 rounded-lg focus:outline-none">
					{showMore ? <MinusOutlined /> : <PlusOutlined />}
				</div>
			</div>
		</>
	);
};
