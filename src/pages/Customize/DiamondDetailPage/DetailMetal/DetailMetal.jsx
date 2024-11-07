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
	function convertFields(diamond) {
		const findKeyByValue = (obj, value) => {
			return Object.keys(obj).find((key) => obj[key] === value);
		};

		// Chuyển đổi tên trường có gạch dưới thành không có gạch dưới
		const convertToCamelCase = (str) => {
			if (typeof str !== 'string') {
				return str; // Trả về giá trị nguyên gốc nếu không phải chuỗi
			}
			return str.replace(/_./g, (match) => match.charAt(1).toUpperCase());
		};

		return {
			...diamond,
			clarity: convertToCamelCase(
				findKeyByValue(Clarity, diamond.clarity) || diamond.clarity
			),
			color: convertToCamelCase(findKeyByValue(Color, diamond.color) || diamond.color),
			culet: convertToCamelCase(findKeyByValue(Culet, diamond.culet) || diamond.culet),
			cut: convertToCamelCase(findKeyByValue(Cut, diamond.cut) || diamond.cut),
			girdle: convertToCamelCase(findKeyByValue(Girdle, diamond.girdle) || diamond.girdle),
			polish: convertToCamelCase(findKeyByValue(Polish, diamond.polish) || diamond.polish),
			symmetry: convertToCamelCase(
				findKeyByValue(Symmetry, diamond.symmetry) || diamond.symmetry
			),
			shape: convertToCamelCase(findKeyByValue(ShapeName, diamond.shape) || diamond.shape), // thêm dòng này
		};
	}

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
			<div className="flex items-center justify-between">
				<p className="font-semibold">Vỏ:</p>
				<p>{jewelry?.Name}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Kích thước vỏ:</p>
				<p>{size}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Vật liệu đã chọn:</p>
				<p>{selectedMetal}</p>
			</div>
			<Divider />
			{/* <div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Hình dạng vỏ đã chọn:</p>
				<p>{customizeJewelry.shape}</p>
			</div>
			<Divider /> */}
			<div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Hình:</p>
				<p className="h-16 w-16">
					<Image src={imageData} alt={imageData} />
				</p>
			</div>
			<Divider />
			<div>
				<h1 className="text-center text-2xl font-semibold mb-5">Thông số kim cương</h1>
			</div>
			{convertedDiamonds.length > 0
				? convertedDiamonds.map((diamond, i) => (
						<div key={diamond?.Id} className="flex flex-col items-start my-4">
							<p className="font-semibold text-primary">Kim Cương {i + 1}:</p>
							<div className="flex items-center justify-between my-2">
								<p className="font-semibold">Carat From:</p>
								<p>{diamond?.caratFrom}</p>
							</div>
							<div className="flex items-center justify-between my-2">
								<p className="font-semibold">Carat To:</p>
								<p>{diamond?.caratTo}</p>
							</div>
							<div className="flex items-center justify-between my-2">
								<p className="font-semibold">Clarity:</p>
								<p>{diamond?.clarity}</p>
							</div>
							<div className="flex items-center justify-between my-2">
								<p className="font-semibold">Color:</p>
								<p>{diamond?.color}</p>
							</div>
							<div className="flex items-center justify-between my-2">
								<p className="font-semibold">Culet:</p>
								<p>{diamond?.culet}</p>
							</div>
							<div className="flex items-center justify-between my-2">
								<p className="font-semibold">Cut:</p>
								<p>{diamond?.cut}</p>
							</div>
							<div className="flex items-center justify-between my-2">
								<p className="font-semibold">Girdle:</p>
								<p>{diamond?.girdle}</p>
							</div>
							<div className="flex items-center justify-between my-2">
								<p className="font-semibold">Polish:</p>
								<p>{diamond?.polish}</p>
							</div>
							<div className="flex items-center justify-between my-2">
								<p className="font-semibold">Symmetry:</p>
								<p>{diamond?.symmetry}</p>
							</div>
							<div className="flex items-center justify-between my-2">
								<p className="font-semibold">Shape:</p>
								<p>{diamond?.shape}</p>
							</div>
						</div>
				  ))
				: jewelry?.MainDiamonds?.map((diamond, i) => (
						<div key={diamond?.Id} className="flex flex-col items-start my-4">
							<p className="font-semibold text-primary">Kim Cương {i + 1}:</p>
						</div>
				  ))}

			<Divider />
			{/* <div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Cut:</p>
				<p>{customizeDiamond.cut}</p>
			</div>
			<Divider /> */}
			{/* <div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Color:</p>
				<p>{customizeDiamond.color}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold text-primary">Clarity:</p>
				<p>{customizeDiamond.clarity}</p>
			</div>
			<Divider /> */}
			{/* <div className="flex items-center justify-between">
				<p className="font-semibold">Tổng cộng:</p>
				<p className="font-semibold">$2,040</p>
			</div> */}
			{/* <Divider /> */}
			<div className="flex items-center justify-between">
				<p className="font-semibold">Ngày vận chuyển dự kiến:</p>
				<p style={{color: '#c0c0c0'}}>7 ngày 2 giờ sau khi thanh toán thành công</p>
			</div>
		</div>
	);
};
