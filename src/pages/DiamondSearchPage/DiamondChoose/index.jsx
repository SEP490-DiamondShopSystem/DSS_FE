import React, {useEffect, useState} from 'react';

import {Steps} from 'antd';
import debounce from 'lodash/debounce';
import {useDispatch, useSelector} from 'react-redux';
import {getUserId} from '../../../components/GetUserId';
import {
	GetAllDiamondSelector,
	GetAllJewelrySelector,
	GetDiamondFilterSelector,
} from '../../../redux/selectors';
import {getAllDiamond, getDiamondFilter} from '../../../redux/slices/diamondSlice';
import {getAllJewelry} from '../../../redux/slices/jewelrySlice';
import {enums} from '../../../utils/constant';
import {DiamondLabList} from './DiamondLabList';
import {DiamondList} from './DiamondList';

const items = [
	{
		title: 'Chọn Vỏ',
	},
	{
		title: 'Chọn Kim Cương',
	},
	{
		title: 'Hoàn Thành',
	},
];

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
		DiscountPrice: data?.DiscountReducedAmount,
		TruePrice: data?.TruePrice,
		IsLabDiamond: data.IsLabDiamond,
	};
};

const DiamondChoosePage = () => {
	const dispatch = useDispatch();
	const diamondList = useSelector(GetAllDiamondSelector);
	const filterLimits = useSelector(GetDiamondFilterSelector);
	const jewelryList = useSelector(GetAllJewelrySelector);
	const userId = getUserId();

	const [changeDiamond, setChangeDiamond] = useState(true);
	const [mappedDiamonds, setMappedDiamonds] = useState([]);
	const [jewelryModel, setJewelryModel] = useState(() => {
		return JSON.parse(localStorage.getItem(`jewelryModel_${userId}`)) || '';
	});
	const [diamondChoice, setDiamondChoice] = useState(() => {
		return localStorage.getItem(`diamondChoice`) || '';
	});
	const [pageSize, setPageSize] = useState(100);
	const [start, setStart] = useState(0);
	const [filters, setFilters] = useState({});
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [diamond, setDiamond] = useState();

	useEffect(() => {
		dispatch(getDiamondFilter());
	}, []);

	const fetchJewelryData = debounce(() => {
		dispatch(
			getAllJewelry({
				// ModelId: 'c0530ffb-f954-41c9-8793-650478e43546',
				// MetalId: '3',
				// SizeId: '8',
				// SideDiamondOptId: selectedSideDiamond?.Id,
				ModelId: jewelryModel?.jewelryModelId,
				MetalId: jewelryModel?.selectedMetal?.Id,
				SizeId: jewelryModel?.size,
				// SideDiamondOptId: selectedSideDiamond?.Id,
				// MinPrice: minPrice,
				// MaxPrice: maxPrice,
			})
		);
	}, 500);

	useEffect(() => {
		fetchJewelryData();

		return () => fetchJewelryData.cancel();
	}, []);

	const getDiamondForFilter = (index) => {
		if (index >= 0 && index < jewelryModel?.MainDiamonds?.length) {
			return jewelryModel?.MainDiamonds[index];
		}
		return null; // Nếu chỉ số không hợp lệ, trả về null
	};

	const diamondForFilter = getDiamondForFilter(selectedIndex);

	const findShape = diamondForFilter?.Shapes?.find((shape) => shape?.ShapeId === filters?.shape);

	const getShapeFromLocalStorage = () => {
		try {
			return JSON.parse(localStorage.getItem('selected')) || '';
		} catch (error) {
			return ''; // Giá trị mặc định nếu không phải là JSON hợp lệ
		}
	};

	useEffect(() => {
		if (filterLimits) {
			setFilters({
				shape: getShapeFromLocalStorage(),
				price: {minPrice: filterLimits?.Price?.Min, maxPrice: filterLimits?.Price?.Max},
				carat: {
					minCarat: findShape?.CaratFrom || filterLimits?.Carat?.Min,
					maxCarat: findShape?.CaratTo || filterLimits?.Carat?.Max,
				},
				color: {minColor: filterLimits?.Color?.Min, maxColor: filterLimits?.Color?.Max},
				clarity: {
					minClarity: filterLimits?.Clarity?.Min,
					maxClarity: filterLimits?.Clarity?.Max,
				},
				cut: {minCut: filterLimits?.Cut?.Min, maxCut: filterLimits?.Cut?.Max},
			});
		}
	}, [filterLimits]);

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
		if (jewelryList) {
			setDiamond(jewelryList?.Values);
		}
	}, [jewelryList]);

	useEffect(() => {
		if (diamondList && enums) {
			// Map diamond attributes to more readable values
			const mappedData = diamondList?.Values?.map((diamond) => mapAttributes(diamond, enums));
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

	console.log('jewelryList', jewelryList);
	console.log('jewelryModel', jewelryModel);
	console.log('diamond', diamond);

	return (
		<div className="mx-32">
			{jewelryModel && Object.keys(jewelryModel).length > 0 && (
				<Steps
					current={1}
					percent={50}
					labelPlacement="horizontal"
					items={items}
					className="bg-white p-4 rounded-full my-10"
				/>
			)}

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
					diamondForFilter={diamondForFilter}
					findShape={findShape}
					jewelryMode={jewelryModel}
					diamondList={diamond}
				/>
			) : (
				<DiamondLabList
					diamond={mappedDiamonds}
					setDiamond={setMappedDiamonds}
					filters={filters}
					setFilters={setFilters}
					handleReset={handleReset}
					diamondForFilter={diamondForFilter}
					findShape={findShape}
					diamondList={diamond}
				/>
			)}
		</div>
	);
};

export default DiamondChoosePage;
