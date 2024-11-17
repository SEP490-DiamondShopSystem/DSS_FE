import React, {useEffect, useState} from 'react';

import {Image} from 'antd';
import Loading from 'react-loading';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import jewelryImg from '../../assets/ring_classic.png';
import {FilterAllJewelry} from '../../components/Filter/Filter';
import {
	GetAllJewelryModelSelector,
	GetAllJewelrySelector,
	LoadingJewelrySelector,
} from '../../redux/selectors';
import {getAllJewelry, getAllJewelryModelCategory} from '../../redux/slices/jewelrySlice';
import {formatPrice} from '../../utils';

export const ProductList = () => {
	const navigate = useNavigate();
	const jewelryList = useSelector(GetAllJewelryModelSelector);
	const loading = useSelector(LoadingJewelrySelector);
	const dispatch = useDispatch();

	const [jewelries, setJewelries] = useState();
	const [pageSize, setPageSize] = useState(1);
	const [filters, setFilters] = useState({
		gender: [],
		type: [],
		metal: [],
		price: {minPrice: 0, maxPrice: 1000},
	});

	useEffect(() => {
		const saved = localStorage.getItem('jewelry');
		if (saved) {
			setFilters((prevFilters) => ({
				...prevFilters,
				type: saved,
			}));
		}
	}, []);

	useEffect(() => {
		dispatch(getAllJewelryModelCategory({pageSize}));
	}, [dispatch]);

	useEffect(() => {
		if (jewelryList) setJewelries(jewelryList.Values);
	}, [jewelryList]);

	const handleReset = () => {
		localStorage.removeItem('jewelry');
		setFilters({gender: [], type: [], metal: [], price: {minPrice: 0, maxPrice: 1000}});
	};

	const handleNavigate = () => {};

	return (
		<>
			<div className="mt-10">
				<FilterAllJewelry
					setFilters={setFilters}
					filters={filters}
					handleReset={handleReset}
				/>
			</div>
		</>
	);
};
