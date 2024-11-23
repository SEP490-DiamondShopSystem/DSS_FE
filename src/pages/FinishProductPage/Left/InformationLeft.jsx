import React, {useState} from 'react';

import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import GIA_logo from '../../../assets/GIA/GIA_logo.png';
import {enums} from '../../../utils/constant';

const mapAttributes = (diamonds, attributes) => {
	if (!Array.isArray(diamonds)) return [];
	return diamonds.map((data) => ({
		DiamondId: data.Id,
		Carat: data.Carat,
		Title: data.Title,
		Clarity:
			attributes.Clarity && data.Clarity !== undefined
				? Object.keys(attributes.Clarity).find(
						(key) => attributes.Clarity[key] === data.Clarity
				  ) || 'Unknown Clarity'
				: '',
		Color:
			attributes.Color && data.Color !== undefined
				? Object.keys(attributes.Color).find(
						(key) => attributes.Color[key] === data.Color
				  ) || 'Unknown Color'
				: '',
		Culet:
			attributes.Culet && data.Culet !== undefined
				? Object.keys(attributes.Culet)
						.find((key) => attributes.Culet[key] === data.Culet)
						.replace('_', ' ') || 'Unknown Culet'
				: '',
		Cut:
			attributes.Cut && data.Cut !== undefined
				? Object.keys(attributes.Cut)
						.find((key) => attributes.Cut[key] === data.Cut)
						.replace('_', ' ') || 'Unknown Cut'
				: '',
		Fluorescence:
			attributes.Fluorescence && data.Fluorescence !== undefined
				? Object.keys(attributes.Fluorescence).find(
						(key) => attributes.Fluorescence[key] === data.Fluorescence
				  ) || 'Unknown Fluorescence'
				: '',
		Girdle:
			attributes.Girdle && data.Girdle !== undefined
				? Object.keys(attributes.Girdle)
						.find((key) => attributes.Girdle[key] === data.Girdle)
						.replace('_', ' ') || 'Unknown Girdle'
				: '',
		Polish:
			attributes.Polish && data.Polish !== undefined
				? Object.keys(attributes.Polish)
						.find((key) => attributes.Polish[key] === data.Polish)
						.replace('_', ' ') || 'Unknown Polish'
				: '',
		Symmetry:
			attributes.Symmetry && data.Symmetry !== undefined
				? Object.keys(attributes.Symmetry)
						.find((key) => attributes.Symmetry[key] === data.Symmetry)
						.replace('_', ' ') || 'Unknown Symmetry'
				: '',
		Depth: data.Depth,
		Table: data.Table,
		Measurement: data.Measurement,
		DiamondShape: data.DiamondShape?.ShapeName,
		Price: data.TruePrice,
		IsLabDiamond: data.IsLabDiamond,
		Criteria: data.DiamondPrice?.CriteriaId,
	}));
};

export const InformationLeft = ({jewelryDetail, diamondDetail, jewelry}) => {
	const [showMore, setShowMore] = useState(false);

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	const mappedDiamond = mapAttributes(jewelry?.Diamonds, enums);

	console.log('jewelry', jewelry);
	console.log('mappedDiamond', mappedDiamond);

	return (
		<>
			<div className="bg-gray-50 rounded-lg shadow-md w-full mt-10 ">
				{mappedDiamond?.map((diamond) => (
					<>
						<h2 className="text-lg font-semibold flex items-center justify-center my-10">
							Thông Số Kim Cương {diamond?.IsLabDiamond ? 'Nhân Tạo' : 'Tự Nhiên'}
						</h2>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Chứng nhận</span>
							<img src={GIA_logo} className="text-gray-800 w-14 h-5" />
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Mã Định Danh</span>
							<span className="text-gray-800">{diamond?.Criteria}</span>
						</div>

						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Cut</span>
							<span className="text-gray-800 flex items-center">{diamond?.Cut}</span>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Color</span>
							<span className="text-gray-800 flex items-center">
								{diamond?.Color}
							</span>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Clarity</span>
							<span className="text-gray-800 flex items-center">
								{diamond?.Clarity}
							</span>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Trọng Lượng Carat</span>
							<span className="text-gray-800 flex items-center">
								{diamond?.Carat}
							</span>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Fluorescence</span>
							<span className="text-gray-800 flex items-center">
								{diamond?.Fluorescence}
							</span>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Depth %</span>
							<span className="text-gray-800">{diamond?.Depth}</span>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Table %</span>
							<span className="text-gray-800">{diamond?.Table}</span>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Polish</span>
							<span className="text-gray-800">{diamond?.Polish}</span>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Symmetry</span>
							<span className="text-gray-800">{diamond?.Symmetry}</span>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Girdle</span>
							<span className="text-gray-800">{diamond?.Girdle}</span>
						</div>
						<div className="flex justify-between border-b border-tintWhite px-4 py-2">
							<span className="text-gray-600">Culet</span>
							<span className="text-gray-800">{diamond?.Culet}</span>
						</div>
						<div className="flex justify-between px-4 py-2">
							<span className="text-gray-600">Kích Thước</span>
							<span className="text-gray-800">{diamond?.Measurement}</span>
						</div>
					</>
				))}
			</div>
			{jewelry?.Diamonds?.length > 0 ? (
				<>
					<div
						className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
							showMore ? 'max-h-screen' : 'max-h-0'
						}`}
					>
						<div className="bg-gray-50  rounded-lg shadow-md w-full">
							<div className="flex justify-center items-center text-xl font-semibold my-10">
								<span>Thông Số Vỏ</span>
							</div>
							<div class="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Vật Liệu</span>
								<span className="text-gray-800">{jewelry?.Metal?.Name}</span>
							</div>

							<div className="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Kích Cỡ Nhẫn (mm)</span>
								<span className="text-gray-800 flex items-center">
									{jewelry?.Size?.Value}
								</span>
							</div>
							<div className="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Rhodium Finish</span>
								<span className="text-gray-800 flex items-center">
									{jewelry?.IsRhodiumFinish ? 'Có' : 'Không'}
								</span>
							</div>
						</div>
					</div>
					<div
						className="border-y my-4 flex justify-between cursor-pointer"
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
			) : (
				<>
					<div className="bg-gray-50  rounded-lg shadow-md w-full">
						<div className="flex justify-center items-center text-xl font-semibold my-10">
							<span>Thông Số Vỏ</span>
						</div>
						<div class="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Vật Liệu</span>
							<span className="text-gray-800">{jewelry?.Metal?.Name}</span>
						</div>

						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Kích Cỡ Nhẫn (mm)</span>
							<span className="text-gray-800 flex items-center">
								{jewelry?.Size?.Value}
							</span>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Rhodium Finish</span>
							<span className="text-gray-800 flex items-center">
								{jewelry?.IsRhodiumFinish ? 'Có' : 'Không'}
							</span>
						</div>
					</div>
				</>
			)}
		</>
	);
};
