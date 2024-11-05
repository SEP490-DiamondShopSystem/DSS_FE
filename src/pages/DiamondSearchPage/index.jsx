import React, {useEffect, useState} from 'react';

import {Steps} from 'antd';
import debounce from 'lodash/debounce';
import {useDispatch, useSelector} from 'react-redux';
import {GetAllDiamondSelector} from '../../redux/selectors';
import {getAllDiamond} from '../../redux/slices/diamondSlice';
import {enums} from '../../utils/constant';
import {DiamondLabList} from './DiamondLabList';
import {DiamondList} from './DiamondList';

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
		Title: data.Title,
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
	const [pageSize, setPageSize] = useState(100);
	const [start, setStart] = useState(0);
	const [filters, setFilters] = useState({
		shape: '',
		price: {minPrice: 0, maxPrice: 1000},
		carat: {minCarat: 0.1, maxCarat: 30.0},
		color: {minColor: 1, maxColor: 8},
		clarity: {minClarity: 1, maxClarity: 8},
		cut: {minCut: 1, maxCut: 3},
	});

	console.log('diamondList', diamondList);
	console.log('mappedDiamonds', mappedDiamonds);
	console.log('filter', filters);

	const fetchDiamondData = debounce(() => {
		dispatch(
			getAllDiamond({
				pageSize,
				start,
				shapeId: filters?.shape,
				cutFrom: filters?.cut?.minCut,
				cutTo: filters?.cut?.maxCut,
				colorFrom: filters?.color?.minColor,
				colorTo: filters?.color?.maxColor,
				clarityFrom: filters?.clarity?.minClarity,
				clarityTo: filters?.clarity?.maxClarity,
				caratFrom: filters?.carat?.minCarat,
				caratTo: filters?.carat?.maxCarat,
			})
		);
	}, 500);

	useEffect(() => {
		fetchDiamondData();

		return () => fetchDiamondData.cancel();
	}, [dispatch, filters]);

	useEffect(() => {
		if (diamondList && enums) {
			// Map diamond attributes to more readable values
			const mappedData = diamondList?.Values.map((diamond) => mapAttributes(diamond, enums));
			setMappedDiamonds(mappedData);
		}
	}, [diamondList, enums]);

	const handleReset = () => {
		localStorage.removeItem('selected');
		setFilters({
			shape: '',
			price: {minPrice: 0, maxPrice: 1000},
			carat: {minCarat: 0.1, maxCarat: 30.0},
			color: {minColor: 1, maxColor: 8},
			clarity: {minClarity: 1, maxClarity: 8},
			cut: {minCut: 1, maxCut: 3},
		});
	};

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
					setDiamond={setMappedDiamonds}
					filters={filters}
					setFilters={setFilters}
					handleReset={handleReset}
				/>
			) : (
				<DiamondLabList
					diamond={mappedDiamonds}
					setDiamond={setMappedDiamonds}
					filters={filters}
					setFilters={setFilters}
					handleReset={handleReset}
				/>
			)}
		</div>
	);
};

export default DiamondSearchPage;
