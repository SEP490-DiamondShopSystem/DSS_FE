import React, {useEffect, useState} from 'react';

import {Steps} from 'antd';
import {DiamondLabList} from './DiamondLabList';
import {DiamondList} from './DiamondList';
import {useDispatch, useSelector} from 'react-redux';
import {GetAllDiamondSelector} from '../../redux/selectors';
import {getAllDiamond} from '../../redux/slices/diamondSlice';
import {enums} from '../../utils/constant';

const mapAttributes = (data, attributes) => {
	return {
		Id: data.Id,
		Carat: data.Carat,
		Clarity: attributes.Clarity
			? Object.keys(attributes.Clarity).find(
					(key) => attributes.Clarity[key] === data.Clarity
			  )
			: '',
		Color: attributes.Color
			? Object.keys(attributes.Color).find((key) => attributes.Color[key] === data.Color)
			: '',
		Culet: attributes.Culet
			? Object.keys(attributes.Culet)
					.find((key) => attributes.Culet[key] === data.Culet)
					.replace('_', ' ')
			: '',
		Cut: attributes.Cut
			? Object.keys(attributes.Cut)
					.find((key) => attributes.Cut[key] === data.Cut)
					.replace('_', ' ')
			: '',
		Fluorescence: attributes.Fluorescence
			? Object.keys(attributes.Fluorescence).find(
					(key) => attributes.Fluorescence[key] === data.Fluorescence
			  )
			: '',
		Girdle: attributes.Girdle
			? Object.keys(attributes.Girdle)
					.find((key) => attributes.Girdle[key] === data.Girdle)
					.replace('_', ' ')
			: '',
		Polish: attributes.Polish
			? Object.keys(attributes.Polish)
					.find((key) => attributes.Polish[key] === data.Polish)
					.replace('_', ' ')
			: '',
		Symmetry: attributes.Symmetry
			? Object.keys(attributes.Symmetry)
					.find((key) => attributes.Symmetry[key] === data.Symmetry)
					.replace('_', ' ')
			: '',
		Depth: data.Depth,
		Table: data.Table,
		Measurement: data.Measurement,
		DiamondShape: data?.DiamondShape?.ShapeName,
		DiscountPrice: data?.DiscountPrice,
		TruePrice: data?.TruePrice,
		IsLabDiamond: data.IsLabDiamond,
	};
};

const DiamondSearchPage = () => {
	const dispatch = useDispatch();
	const diamondList = useSelector(GetAllDiamondSelector);

	const [changeDiamond, setChangeDiamond] = useState(true);
	const [mappedDiamonds, setMappedDiamonds] = useState([]);
	const [diamondChoice, setDiamondChoice] = useState(
		localStorage.getItem('diamondChoice') || localStorage.getItem('selected') || ''
	);
	const [jewelryType, setJewelryType] = useState(localStorage.getItem('jewelryType') || '');

	console.log(diamondList);

	useEffect(() => {
		dispatch(getAllDiamond());
	}, [dispatch]);

	console.log('diamondList', diamondList);

	useEffect(() => {
		if (diamondList && enums) {
			// Map diamond attributes to more readable values
			const mappedData = diamondList.map((diamond) => mapAttributes(diamond, enums));
			setMappedDiamonds(mappedData);
		}
	}, [diamondList, enums]);

	const items = [
		{
			title: `Chọn ${jewelryType}`,
		},
		{
			title: 'Chọn Kim Cương',
		},
		{
			title: 'Hoàn Thành',
		},
	];

	return (
		<div className="mx-32">
			{diamondChoice.length === 0 && (
				<Steps
					current={1}
					percent={50}
					labelPlacement="horizontal"
					items={items}
					className="bg-white p-4 rounded-full my-10"
				/>
			)}

			<div className="flex justify-center mt-20 mb-10">
				<div className="flex flex-col items-center justify-center" style={{width: 600}}>
					<h1 className="mb-5 font-semibold text-2xl">Tìm Kiếm Kim Cương</h1>
					<p className="text-center">
						Sử dụng tính năng tìm kiếm kim cương của chúng tôi để tìm những viên kim
						cương rời được chứng nhận bởi GIA, không có xung đột và có chất lượng cao
						nhất. Duyệt qua hàng ngàn tùy chọn và sử dụng bộ lọc để thu hẹp lựa chọn
						theo carat, kiểu cắt, màu sắc, độ tinh khiết, hình dạng và giá cả. Vẫn chưa
						chắc chắn về viên kim cương nào nên đầu tư? Hướng dẫn mua kim cương của
						chúng tôi sẽ giúp bạn chọn lựa phù hợp nhất.
					</p>
				</div>
			</div>

			<div className="divide-x flex items-center justify-center my-5">
				<button
					className={`px-4 py-2 w-32 ${
						changeDiamond ? 'bg-primary' : 'bg-tintWhite'
					} rounded-s-lg`}
					onClick={() => setChangeDiamond(true)}
				>
					Tự nhiên
				</button>
				<button
					className={`px-4 py-2 w-32 ${
						!changeDiamond ? 'bg-primary' : 'bg-tintWhite'
					} rounded-e-lg`}
					onClick={() => setChangeDiamond(false)}
				>
					Nhân tạo
				</button>
			</div>

			{/* Use the mapped diamond data */}
			{changeDiamond ? (
				<DiamondList
					diamond={mappedDiamonds}
					diamondList={diamondList}
					setDiamond={setMappedDiamonds}
				/>
			) : (
				<DiamondLabList
					diamond={mappedDiamonds}
					setDiamond={setMappedDiamonds}
					diamondList={diamondList}
				/>
			)}
		</div>
	);
};

export default DiamondSearchPage;
