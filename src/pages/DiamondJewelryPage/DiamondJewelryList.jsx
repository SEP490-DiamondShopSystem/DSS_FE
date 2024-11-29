import React, {useEffect, useState} from 'react';

import {Image} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import jewelryImg from '../../assets/ring_classic.png';
import {FilterDiamondJewelry} from '../../components/Filter/Filter';
import Loading from '../../components/Loading';
import {GetAllJewelryModelSelector, LoadingJewelrySelector} from '../../redux/selectors';
import {getAllJewelryModel} from '../../redux/slices/jewelrySlice';
import {formatPrice, Rating} from '../../utils';
import debounce from 'lodash/debounce';

export const DiamondJewelryList = () => {
	const navigate = useNavigate();
	const jewelryList = useSelector(GetAllJewelryModelSelector);
	const loading = useSelector(LoadingJewelrySelector);
	const dispatch = useDispatch();

	const [jewelries, setJewelries] = useState();
	const [page, setPage] = useState(0);
	const [filters, setFilters] = useState({
		// gender: [],
		Type: undefined,
		IsRhodiumFinished: undefined,
		IsEngravable: undefined,
		Metal: undefined,
		price: {minPrice: 0, maxPrice: 40000000},
	});

	const fetchJewelryData = debounce(() => {
		dispatch(
			getAllJewelryModel({
				Category: filters.Type,
				metalId: filters.Metal,
				minPrice: filters.price.minPrice,
				maxPrice: filters.price.maxPrice,
				IsRhodiumFinished: filters?.IsRhodiumFinished,
				IsEngravable: filters?.IsEngravable,
			})
		)
			.unwrap()
			.then((res) => {
				setJewelries(res?.Values);
			});
	}, 500);

	useEffect(() => {
		fetchJewelryData();

		return () => fetchJewelryData.cancel();
	}, [filters]);

	useEffect(() => {
		const saved = localStorage.getItem('jewelry');
		if (saved) {
			setFilters((prevFilters) => ({
				...prevFilters,
				Type: saved,
			}));
		}
	}, []);

	// useEffect(() => {
	// 	if (jewelryList) setJewelries(jewelryList.Values);
	// }, [jewelryList]);

	const handleReset = () => {
		localStorage.removeItem('jewelry');
		setFilters({
			IsRhodiumFinished: '',
			IsEngravable: '',
			Type: [],
			Metal: '',
			price: {minPrice: 0, maxPrice: 40000000},
		});
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
					{!Array.isArray(jewelries) || jewelries.length === 0 ? (
						<div className="flex items-center justify-center my-10">
							<p className="text-2xl">Chưa có sản phẩm nào</p>
						</div>
					) : (
						<>
							<div className="text-2xl flex justify-end mt-10">
								<p className="p-2">{jewelries.length} Kết quả</p>
							</div>
							<div className="transition-all duration-300 grid grid-cols-4 gap-10 mb-20 mt-10">
								{jewelries?.map((jewelry, i) => (
									<div
										key={i}
										className="shadow-lg bg-white rounded-lg hover:border-2 border-2 border-white cursor-pointer hover:border-black"
										onClick={() =>
											navigate(
												`/jewelry-model/search/${jewelry.JewelryModelId}`
											)
										}
									>
										<div className="">
											<div
												className="flex justify-center mb-5"
												style={{background: '#b8b7b5'}}
											>
												<Image
													src={
														jewelry?.Thumbnail?.MediaPath || jewelryImg
													}
													alt={jewelry?.Thumbnail?.MediaName}
													className=""
													preview={false}
												/>
											</div>
											<div className="mx-5 my-5">
												<div className="flex items-center">
													{/* <p>Model: </p>{' '} */}
													<p className="">{jewelry.Name}</p>
												</div>
												<div className="flex items-center mt-2">
													<p
													// className="line-through"
													// style={{color: '#b0b0b0'}}
													>
														Giá Vỏ: {formatPrice(jewelry.MinPrice)} -{' '}
														{formatPrice(jewelry.MaxPrice)}
													</p>
													{/* <p className="ml-5 " style={{color: '#707070'}}>
														{jewelry.discountPrice}
													</p> */}
												</div>
												<div className="flex items-center mt-2">
													<p className="mr-3">
														<Rating rating={jewelry?.StarRating} />
													</p>
													<p>{jewelry.ReviewCount}</p>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</>
					)}
				</>
			)}
		</>
	);
};
