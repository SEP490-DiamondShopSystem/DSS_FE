import {Divider, Image} from 'antd';
import React from 'react';

import {
	Clarity,
	Color,
	Culet,
	Cut,
	Girdle,
	Polish,
	ShapeName,
	Symmetry,
} from '../../../../utils/constant';

export const DetailMetalDiamond = ({
	customizeJewelry,
	imageData,
	customizeDiamond,
	jewelry,
	selectedMetal,
	size,
	selectedDiamonds,
}) => {
	const convertFields = (diamond) => {
		const findKeyByValue = (obj, value) => {
			return Object.keys(obj).find((key) => obj[key] === value);
		};

		// Chuyển đổi dấu gạch dưới thành dấu cách
		const convertToSpace = (str) => {
			if (typeof str !== 'string') {
				return str; // Trả về giá trị nguyên gốc nếu không phải chuỗi
			}
			return str.replace(/_/g, ' '); // Thay thế tất cả dấu gạch dưới bằng dấu cách
		};

		console.log('diamond', diamond);

		return {
			...diamond,
			clarityFrom: convertToSpace(
				findKeyByValue(Clarity, diamond.clarityFrom) || diamond.clarity
			),
			clarityTo: convertToSpace(
				findKeyByValue(Clarity, diamond.clarityTo) || diamond.clarity
			),
			colorFrom: convertToSpace(findKeyByValue(Color, diamond.colorFrom)),
			colorTo: convertToSpace(findKeyByValue(Color, diamond.colorTo)),
			culet: convertToSpace(findKeyByValue(Culet, diamond.culet)),
			cutFrom: convertToSpace(findKeyByValue(Cut, diamond.cutFrom)),
			cutTo: convertToSpace(findKeyByValue(Cut, diamond.cutTo)),
			girdle: convertToSpace(findKeyByValue(Girdle, diamond.girdle) || diamond.girdle),
			polish: convertToSpace(findKeyByValue(Polish, diamond.polish) || diamond.polish),
			symmetry: convertToSpace(
				findKeyByValue(Symmetry, diamond.symmetry) || diamond.symmetry
			),
			shape: convertToSpace(findKeyByValue(ShapeName, diamond.shape) || diamond.shape),
			isLabGrown: diamond.isLabGrown,
		};
	};

	// Sử dụng hàm để chuyển đổi tất cả các phần tử trong mảng selectedDiamonds
	const convertedDiamonds = selectedDiamonds.map(convertFields);

	console.log('convertedDiamonds', convertedDiamonds);

	return (
		<div className="my-10 w-full">
			<div>
				<h1 className="text-center text-2xl font-semibold mb-5">Thông số vỏ của bạn</h1>
			</div>
			{/* <div className="flex items-center justify-between mt-10">
				<p className="font-semibold">Serial Code</p>
				<p>123456</p>
			</div>
			<Divider /> */}
			<div className="flex items-center justify-between pr-5">
				<p className="font-semibold">Vỏ:</p>
				<p>{jewelry?.Name}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between pr-5">
				<p className="font-semibold text-primary">Kích thước vỏ:</p>
				<p>{size}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between pr-5">
				<p className="font-semibold text-primary">Vật liệu đã chọn:</p>
				<p>{selectedMetal && selectedMetal?.Name}</p>
			</div>
			<Divider />
			{/* <div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Hình dạng vỏ đã chọn:</p>
				<p>{customizeJewelry.shape}</p>
			</div>
			<Divider /> */}
			{imageData && (
				<>
					<div className="flex items-center justify-between">
						<p className="font-semibold text-primary">Hình:</p>
						<p className="h-16 w-16">
							<Image src={imageData} alt={imageData} />
						</p>
					</div>
					<Divider />
				</>
			)}

			<div>
				<h1 className="text-center text-2xl font-semibold mb-5">Thông số kim cương</h1>
			</div>
			{convertedDiamonds.length > 0 &&
				convertedDiamonds.map((diamond, i) => (
					<div key={diamond?.Id} className="flex flex-col items-start my-4">
						<p className="font-semibold mt-10 text-lg text-primary">
							Kim Cương {i + 1}:
						</p>
						<Divider />
						<div className="flex items-center justify-between my-2 pr-5">
							<p className="font-semibold ">Ly (Carat):</p>
							<p>
								{diamond?.caratFrom} - {diamond?.caratTo}
							</p>
						</div>
						<Divider />
						<div className="flex items-center justify-between my-2 pr-5">
							<p className="font-semibold">Độ Trong (Clarity):</p>
							<p>
								{diamond?.clarityFrom} - {diamond?.clarityTo}
							</p>
						</div>
						<Divider />
						<div className="flex items-center justify-between my-2 pr-5">
							<p className="font-semibold">Màu Sắc (Color):</p>
							<p>
								{diamond?.colorFrom} - {diamond?.colorTo}
							</p>
						</div>
						<Divider />
						<div className="flex items-center justify-between my-2 pr-5">
							<p className="font-semibold">Chế Tác (Cut):</p>
							<p>
								{diamond?.cutFrom} - {diamond?.cutTo}
							</p>
						</div>
						<Divider />
						<div className="flex items-center justify-between my-2 pr-5">
							<p className="font-semibold">Hình Dạng:</p>
							<p>{diamond?.shape}</p>
						</div>
						<Divider />
						<div className="flex items-center justify-between my-2 pr-5">
							<p className="font-semibold">Độ Bóng (Polish):</p>
							<p>{diamond?.polish || 'Không'}</p>
						</div>
						<Divider />
						<div className="flex items-center justify-between my-2 pr-5">
							<p className="font-semibold">Viền Cạnh (Girdle):</p>
							<p>{diamond?.girdle || 'Không'}</p>
						</div>
						<Divider />
						<div className="flex items-center justify-between my-2 pr-5">
							<p className="font-semibold">Chóp Đáy (Culet):</p>
							<p>{diamond?.culet || 'Không'}</p>
						</div>
						<Divider />
						<div className="flex items-center justify-between my-2 pr-5">
							<p className="font-semibold">Đối Xứng (Symmetry):</p>
							<p>{diamond?.symmetry || 'Không'}</p>
						</div>
						<Divider />
						<div className="flex items-center justify-between my-2 pr-5">
							<p className="font-semibold">Nguồn Gốc:</p>
							<p>{diamond?.isLabGrown === true ? 'Nhân Tạo' : 'Tự Nhiên'}</p>
						</div>
					</div>
				))}
		</div>
	);
};
