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
import {useLocation} from 'react-router-dom';

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

const DiamondChoosePage = () => {
	const dispatch = useDispatch();
	const diamondList = useSelector(GetAllDiamondSelector);
	const filterLimits = useSelector(GetDiamondFilterSelector);
	const jewelryList = useSelector(GetAllJewelrySelector);
	const userId = getUserId();
	const location = useLocation();
	const jewelryModel = location.state.jewelryModel;

	const [changeDiamond, setChangeDiamond] = useState(true);
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
				// MaxPrice: maxPrice,shapeId: filters?.shape,
				// cutFrom: filters?.cut?.minCut,
				// cutTo: filters?.cut?.maxCut,
				// colorFrom: filters?.color?.minColor,
				// colorTo: filters?.color?.maxColor,
				// clarityFrom: filters?.clarity?.minClarity,
				// clarityTo: filters?.clarity?.maxClarity,
				// caratFrom: filters?.carat?.minCarat,
				// caratTo: filters?.carat?.maxCarat,
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

	useEffect(() => {
		if (jewelryList) {
			setDiamond(jewelryList?.Values);
		}
	}, [jewelryList]);

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
					filters={filters}
					setFilters={setFilters}
					handleReset={handleReset}
					diamondForFilter={diamondForFilter}
					findShape={findShape}
					jewelryModel={jewelryModel}
					diamondList={diamond}
				/>
			) : (
				<DiamondLabList
					filters={filters}
					setFilters={setFilters}
					handleReset={handleReset}
					diamondForFilter={diamondForFilter}
					findShape={findShape}
					diamondList={diamond}
					jewelryModel={jewelryModel}
				/>
			)}
		</div>
	);
};

export default DiamondChoosePage;
