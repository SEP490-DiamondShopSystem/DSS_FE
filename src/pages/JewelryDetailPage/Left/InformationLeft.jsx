import React, {useState} from 'react';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';

export const InformationLeft = ({diamondJewelry, selectedMetal}) => {
	const [showMore, setShowMore] = useState(false);

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	console.log('diamondJewelry', diamondJewelry);

	return (
		<>
			<div className="bg-gray-50 rounded-lg shadow-md w-full mt-10 pr-36">
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
				<div className="flex justify-between px-4 py-2">
					<span className="text-gray-600">Hoàn Thiện Rhodium</span>
					<span className="text-gray-800 flex items-center">
						{diamondJewelry?.IsRhodiumFinish ? 'Có' : 'Không'}
					</span>
				</div>
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
