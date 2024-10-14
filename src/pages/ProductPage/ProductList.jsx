import React, {useEffect, useState} from 'react';

import {Image} from 'antd';
import ReactLoading from 'react-loading';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import jewelryImg from '../../assets/ring_classic.png';
import {FilterAllJewelry} from '../../components/Filter/Filter';
import {GetAllJewelrySelector, LoadingJewelrySelector} from '../../redux/selectors';
import {getAllJewelry} from '../../redux/slices/jewelrySlice';

export const ProductList = () => {
	const navigate = useNavigate();
	const jewelryList = useSelector(GetAllJewelrySelector);
	const loading = useSelector(LoadingJewelrySelector);
	const dispatch = useDispatch();

	const [jewelries, setJewelries] = useState();
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
		dispatch(getAllJewelry());
	}, [dispatch]);

	useEffect(() => {
		if (jewelryList) setJewelries(jewelryList);
	}, [jewelryList]);

	const handleReset = () => {
		localStorage.removeItem('jewelry');
		setFilters({gender: [], type: [], metal: [], price: {minPrice: 0, maxPrice: 1000}});
	};

	return (
		<>
			<div className="mt-10">
				<FilterAllJewelry
					setFilters={setFilters}
					filters={filters}
					handleReset={handleReset}
				/>
			</div>

			{loading ? (
				<div className="flex items-center justify-center my-10">
					<ReactLoading height={'10%'} width={'10%'} type="spin" color="#dec986" />
				</div>
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
										className="shadow-lg bg-white rounded-lg hover:border-2 cursor-pointer"
										onClick={() =>
											navigate(`/jewelry/diamond-jewelry/${jewelry.id}`)
										}
									>
										<div className="w-80">
											<div
												className="flex justify-center mb-5"
												style={{background: '#b8b7b5'}}
											>
												<Image
													src={jewelry.Thumbnail || jewelryImg}
													alt={jewelry.Name}
													className=""
													preview={false}
												/>
											</div>
											<div className="mx-5 my-5">
												<p>{jewelry.Name}</p>
												<div className="flex mt-2">
													<p
													// className="line-through"
													// style={{color: '#b0b0b0'}}
													>
														{jewelry.Price}
													</p>
													{/* <p className="ml-5 " style={{color: '#707070'}}>
														{jewelry.discountPrice}
													</p> */}
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
