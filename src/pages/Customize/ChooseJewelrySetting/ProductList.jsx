import React, {useEffect, useState} from 'react';

import {Image} from 'antd';
import Loading from 'react-loading';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FilterAllJewelry, FilterDiamondJewelry} from '../../../components/Filter/Filter';
import {GetAllJewelryModelSelector, LoadingJewelrySelector} from '../../../redux/selectors';
import {getAllJewelryModel} from '../../../redux/slices/jewelrySlice';
import jewelryImg from '../../../assets/jewelry.png';
import debounce from 'lodash/debounce';

export const ProductList = () => {
	const navigate = useNavigate();
	const jewelryList = useSelector(GetAllJewelryModelSelector);
	const loading = useSelector(LoadingJewelrySelector);
	const dispatch = useDispatch();

	const [jewelries, setJewelries] = useState();
	const [filters, setFilters] = useState({
		// gender: [],
		type: '',
		metal: '',
		price: {minPrice: 0, maxPrice: 40000000},
	});

	console.log(filters);

	useEffect(() => {
		const saved = localStorage.getItem('jewelry');
		if (saved) {
			setFilters((prevFilters) => ({
				...prevFilters,
				type: saved,
			}));
		}
	}, []);

	console.log('jewelryList', jewelryList);
	console.log('jewelries', jewelries);

	const fetchJewelryData = debounce(() => {
		dispatch(
			getAllJewelryModel({
				Category: filters.type,
				metalId: filters.metal,
				minPrice: filters.price.minPrice,
				maxPrice: filters.price.maxPrice,
			})
		);
	}, 500);

	useEffect(() => {
		fetchJewelryData();

		return () => fetchJewelryData.cancel();
	}, [filters.type, filters.metal, filters.price.minPrice, filters.price.maxPrice]);

	useEffect(() => {
		if (jewelryList) setJewelries(jewelryList.Values);
	}, [jewelryList]);

	const handleReset = () => {
		localStorage.removeItem('jewelry');
		setFilters({gender: [], type: [], metal: [], price: {minPrice: 0, maxPrice: 1000}});
	};

	return (
		<>
			<div className="mt-10">
				<FilterDiamondJewelry
					setFilters={setFilters}
					filters={filters}
					handleReset={handleReset}
				/>
			</div>

			{loading ? (
				<Loading />
			) : (
				<>
					{/* <div className="text-2xl flex justify-end mt-10">
						<p className="p-2">200 Kết quả</p>
					</div> */}
					<div className="transition-all duration-300 grid grid-cols-4 gap-10 mb-20 mt-10">
						{jewelries?.map((jewelry, i) => (
							<div
								key={i}
								className="shadow-lg bg-white rounded-lg border-2 border-white hover:border-2 hover:border-black cursor-pointer"
								onClick={() =>
									navigate(`/customize/diamond-jewelry/${jewelry.JewelryModelId}`)
								}
							>
								<div className="w-80">
									<div
										className=" flex justify-center mb-5"
										style={{background: '#b8b7b5'}}
									>
										<Image
											src={jewelry.ThumbnailPath || jewelryImg}
											alt={jewelry.Name}
											className=""
											preview={false}
										/>
									</div>
									<div className="mx-5 my-5">
										<p>{jewelry.Name}</p>
										<div className="flex mt-2">
											<p className="line-through" style={{color: '#b0b0b0'}}>
												{jewelry.price}
											</p>
											<p className="ml-5 " style={{color: '#707070'}}>
												{jewelry.discountPrice}
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</>
	);
};
