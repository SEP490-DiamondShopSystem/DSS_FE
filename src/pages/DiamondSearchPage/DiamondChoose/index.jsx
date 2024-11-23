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
import {JewelryList} from './JewelryList';
import {useLocation} from 'react-router-dom';

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
	const [filters, setFilters] = useState({
		price: {minPrice: 0, maxPrice: 20000000000},
	});
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [diamond, setDiamond] = useState();

	console.log('diamond', diamond);

	const items = [
		{
			title: 'Chọn Vỏ',
		},
		...(jewelryModel?.MainDiamonds?.length > 0
			? [{title: 'Chọn Kim Cương'}]
			: [{title: 'Chọn Trang Sức'}]),
		{
			title: 'Hoàn Thành',
		},
	];

	// useEffect(() => {
	// 	if (filterLimits) {
	// 		setFilters({
	// 			price: {minPrice: filterLimits?.Price?.Min, maxPrice: filterLimits?.Price?.Max},
	// 		});
	// 	}
	// }, [filterLimits]);

	useEffect(() => {
		if (jewelryList) {
			setDiamond(jewelryList?.Values);
		}
	}, [jewelryList]);

	useEffect(() => {
		dispatch(getDiamondFilter());
	}, []);

	const fetchJewelryData = debounce(() => {
		dispatch(
			getAllJewelry({
				PageSize: pageSize,
				CurrentPage: start,
				ModelId: jewelryModel?.jewelryModelId,
				MetalId: jewelryModel?.selectedMetal?.Id,
				SizeId: jewelryModel?.size,
				SideDiamondOptId: jewelryModel?.selectedSideDiamond?.Id || null,
				MinPrice: filters?.price?.minPrice,
				MaxPrice: filters?.price?.maxPrice,
			})
		);
	}, 500);

	useEffect(() => {
		fetchJewelryData();

		return () => fetchJewelryData.cancel();
	}, [jewelryModel, filters, pageSize, start]);

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

	console.log('jewelryModel', jewelryModel);
	console.log('diamondForFilter', diamondForFilter);

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
			{jewelryModel?.MainDiamonds?.length > 0 && (
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
			)}

			{jewelryModel?.MainDiamonds?.length > 0 ? (
				<>
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
				</>
			) : (
				<JewelryList
					filters={filters}
					setFilters={setFilters}
					handleReset={handleReset}
					diamondForFilter={diamondForFilter}
					findShape={findShape}
					jewelryModel={jewelryModel}
					diamondList={diamond}
				/>
			)}
		</div>
	);
};

export default DiamondChoosePage;
