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
import {fetchFrontendDisplayRule} from '../../../redux/slices/configSlice';

const DiamondChoosePage = () => {
	const dispatch = useDispatch();
	const jewelryList = useSelector(GetAllJewelrySelector);
	const location = useLocation();
	const jewelryModel = location.state.jewelryModel;

	const [pageSize, setPageSize] = useState(2);
	const [start, setStart] = useState(1);
	const [filters, setFilters] = useState({
		price: {minPrice: 0, maxPrice: 200000000},
	});
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [diamond, setDiamond] = useState();
	const [totalPage, setTotal] = useState();

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

	useEffect(() => {
		dispatch(getDiamondFilter());
	}, []);

	const fetchJewelryData = debounce(() => {
		dispatch(
			getAllJewelry({
				// PageSize: pageSize,
				CurrentPage: start,
				ModelId: jewelryModel?.jewelryModelId,
				MetalId: jewelryModel?.selectedMetal?.Id,
				SizeId: jewelryModel?.size,
				SideDiamondOptId: jewelryModel?.selectedSideDiamond?.Id || null,
				MinPrice: filters?.price?.minPrice,
				MaxPrice: filters?.price?.maxPrice,
			})
		)
			.unwrap()
			.then((res) => {
				setDiamond(res?.Values);
				setTotal(res?.TotalPage);
			});
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
		<div className="mx-4 md:mx-8 lg:mx-32">
			{jewelryModel && Object.keys(jewelryModel).length > 0 && (
				<Steps
					current={1}
					percent={50}
					labelPlacement="horizontal"
					items={items}
					className="bg-white p-4 rounded-full my-10"
				/>
			)}

			{jewelryModel?.MainDiamonds?.length > 0 ? (
				<DiamondList
					filters={filters}
					setFilters={setFilters}
					handleReset={handleReset}
					diamondForFilter={diamondForFilter}
					findShape={findShape}
					jewelryModel={jewelryModel}
					diamondList={diamond}
					setStart={setStart}
					pageSize={pageSize}
					setPageSize={setPageSize}
					start={start}
					totalPage={totalPage}
				/>
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
