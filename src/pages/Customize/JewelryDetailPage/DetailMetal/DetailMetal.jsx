import {Divider, Image} from 'antd';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GetDiamondShapeSelector} from '../../../../redux/selectors';
import {getDiamondShape} from '../../../../redux/slices/diamondSlice';
import {formatPrice} from '../../../../utils';

export const DetailMetal = ({
	customizeJewelry,
	imageData,
	selectedMetal,
	jewelry,
	size,
	selectedSideDiamond,
	fontFamily,
	textValue,
}) => {
	const dispatch = useDispatch();
	const shape = useSelector(GetDiamondShapeSelector);

	useEffect(() => {
		dispatch(getDiamondShape());
	}, []);

	// Get unique shape names across all MainDiamonds
	const uniqueShapeNames = new Set();
	jewelry?.MainDiamonds?.forEach((diamond) => {
		diamond?.Shapes?.forEach((shapeItem) => {
			const matchedShape = shape?.find((s) => s?.Id === shapeItem?.ShapeId);
			if (matchedShape) uniqueShapeNames.add(matchedShape.ShapeName);
		});
	});

	const mainDiamondShapes = Array.from(uniqueShapeNames).join(', ');

	return (
		<div className="my-10 mx-20">
			<div>
				<h1 className="text-center text-2xl font-semibold">Thông tin chi tiết</h1>
			</div>
			<div className="flex items-center justify-between mt-5">
				<p className="font-semibold">Vỏ:</p>
				<p>{jewelry?.Name}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold">Các hình dáng phù hợp:</p>
				<p className="text-end">{mainDiamondShapes}</p>
			</div>
			<Divider />
			<div className="flex items-center justify-between">
				<p className="font-semibold">Vật liệu có sẵn:</p>
				<p>{jewelry?.MetalSupported.join(', ')}</p>
			</div>
			<Divider />
			<div>
				<h1 className="text-center text-2xl font-semibold my-10">Lựa chọn của bạn</h1>
			</div>
			{selectedMetal && (
				<>
					<div className="flex items-center justify-between mt-5">
						<p className="font-semibold text-primary">Vật liệu đã chọn:</p>
						<p>
							{selectedMetal && selectedMetal.Name} -{' '}
							{formatPrice(selectedMetal?.Price)} / gram
						</p>
					</div>
					<Divider />
				</>
			)}

			{selectedSideDiamond && (
				<>
					<div className="flex items-center justify-between">
						<p className="font-semibold text-primary">Kim Cương Tấm:</p>
						<p className="">
							{selectedSideDiamond?.CaratWeight} ct / {selectedSideDiamond?.Quantity}{' '}
							viên
						</p>
					</div>{' '}
					<Divider />
				</>
			)}

			{size && (
				<>
					<div className="flex items-center justify-between ">
						<p className="font-semibold text-primary">Kích thước vỏ:</p>
						<p>{size}</p>
					</div>
					<Divider />
				</>
			)}

			{textValue && (
				<>
					<div className="flex items-center justify-between ">
						<p className="font-semibold text-primary">Chữ Khắc:</p>
						<p>{textValue}</p>
					</div>
					{/* <Divider /> */}
				</>
			)}

			{/* {imageData && (
				<div className="flex items-center justify-between">
					<p className="font-semibold text-primary">Hình:</p>
					<p className="h-16 w-16">
						<Image src={imageData} alt={imageData} />
					</p>
				</div>
			)} */}
		</div>
	);
};
