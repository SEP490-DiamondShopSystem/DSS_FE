import React, {useState} from 'react';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {enums} from '../../../utils/constant';

export const InformationLeft = ({diamondJewelry, selectedMetal, selectedSideDiamond}) => {
	const [showMore, setShowMore] = useState(false);

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	return (
		<>
			<div className="bg-gray-50 w-full mt-10 ">
				<div className="flex justify-center items-center text-xl font-semibold my-10">
					<span>Thông Số Mẫu</span>
				</div>
				{/* <div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Mã Định Danh</span>
					<span className="text-gray-800">{diamondJewelry?.SerialCode}</span>
				</div> */}
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Chất Liệu</span>
					<span className="text-gray-800">{selectedMetal?.Name}</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Chiều Rộng</span>
					<span className="text-gray-800">{diamondJewelry?.Width}mm</span>
				</div>
				{/* <div className="flex justify-between px-4 py-2">
					<span className="text-gray-600">Hoàn Thiện Rhodium</span>
					<span className="text-gray-800 flex items-center">
						{diamondJewelry?.IsRhodiumFinish ? 'Có' : 'Không'}
					</span>
				</div> */}
				{/* <div className="flex justify-between px-4 py-2">
					<span className="text-gray-600">Trọng Lượng</span>
					<span className="text-gray-800 flex items-center">
						{diamondJewelry?.Weight}
					</span>
				</div>
				<div className="flex justify-between px-4 py-2">
					<span className="text-gray-600">Kích Thước</span>
					<span className="text-gray-800 flex items-center">
						{diamondJewelry?.SizeId}
					</span>
				</div> */}
				<div className="bg-gray-50 rounded-lg w-full">
					<div className="flex justify-center items-center text-xl font-semibold my-10">
						<span>Thông Số Kim Cương Tấm</span>
					</div>
					<div class="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Ly(Carat)</span>
						<span className="text-gray-800">{selectedSideDiamond?.CaratWeight}</span>
					</div>

					{/* <div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Độ Tinh Khiết (Clarity)</span>
						<span className="text-gray-800 flex items-center">
							{Object.keys(enums.Clarity).find(
								(key) => enums.Clarity[key] === jewelry?.SideDiamond?.ClarityMin
							)}
							-{' '}
							{Object.keys(enums.Clarity).find(
								(key) => enums.Clarity[key] === jewelry?.SideDiamond?.ClarityMax
							)}
						</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Màu Sắc (Color)</span>
						<span className="text-gray-800 flex items-center">
							{Object.keys(enums.Color).find(
								(key) => enums.Color[key] === jewelry?.SideDiamond?.ColorMin
							)}
							-{' '}
							{Object.keys(enums.Color).find(
								(key) => enums.Color[key] === jewelry?.SideDiamond?.ColorMax
							)}
						</span>
					</div> */}
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Số lượng</span>
						<span className="text-gray-800 flex items-center">
							{selectedSideDiamond?.Quantity}
						</span>
					</div>
				</div>
			</div>
			{diamondJewelry?.IsPreset === false && (
				<>
					<div
						className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
							showMore ? 'max-h-screen' : 'max-h-0'
						}`}
					>
						<div className="bg-gray-50 rounded-lg shadow-md w-full pr-36 mt-4">
							<h2 className="text-lg font-semibold">Thông Tin Kim Cương Tự Nhiên</h2>
							<div className="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Hình Dạng</span>
								<span className="text-gray-800">Tròn</span>
							</div>
							<div className="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Số Lượng</span>
								<span className="text-gray-800">2</span>
							</div>
							<div className="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Tổng Carat</span>
								<span className="text-gray-800">0.06</span>
							</div>
							<div className="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Màu</span>
								<span className="text-gray-800">I</span>
							</div>
							<div className="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Độ Sáng</span>
								<span className="text-gray-800">SI2</span>
							</div>
							<div className="flex justify-between px-4 py-2">
								<span className="text-gray-600">Loại Gắn</span>
								<span className="text-gray-800">Pave</span>
							</div>
						</div>
						<div className="bg-gray-50 rounded-lg shadow-md w-full pr-36 mt-4">
							<h2 className="text-lg font-semibold">Có Thể Gắn Với:</h2>
							{diamondJewelry?.Diamonds?.map((diamond, i) => (
								<div className="flex justify-between px-4 border-b border-tintWhite py-2">
									<span className="text-gray-600">Tròn</span>
									<span className="text-gray-800">0.50 - 4.00 Carat</span>
								</div>
							))}
							{/* <div className="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Tròn</span>
								<span className="text-gray-800">0.50 - 4.00 Carat</span>
							</div>
							<div className="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Princess</span>
								<span className="text-gray-800">0.50 - 4.00 Carat</span>
							</div>
							<div className="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Tổng Carat</span>
								<span className="text-gray-800">0.50 - 4.00 Carat</span>
							</div>
							<div className="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Cushion</span>
								<span className="text-gray-800">0.50 - 4.00 Carat</span>
							</div>
							<div className="flex justify-between px-4 py-2">
								<span className="text-gray-600">Oval</span>
								<span className="text-gray-800">0.50 - 4.00 Carat</span>
							</div> */}
						</div>
					</div>

					<div
						className="border-y my-4 mr-36 flex justify-between cursor-pointer"
						onClick={toggleShowMore}
					>
						<div className="text-black m-4 px-4 rounded-lg focus:outline-none">
							{showMore ? 'Hiện Ít Hơn' : 'Hiện Thêm'}
						</div>
						<div className="m-4 px-4 rounded-lg focus:outline-none">
							{showMore ? <MinusOutlined /> : <PlusOutlined />}
						</div>
					</div>
				</>
			)}
		</>
	);
};
